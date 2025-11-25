import { useState, useEffect, useRef, useCallback } from "react";
import { Check, X, Loader2, RefreshCw } from "lucide-react";
import PropTypes from "prop-types";
import { authAPI } from "../../services/AuthAPIs";

export default function UsernameSelector({
  value,
  onChange,
  firstName,
  lastName,
}) {
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const checkTimeoutRef = useRef(null);

  const loadSuggestions = useCallback(async (baseName) => {
    const result = await authAPI.getUsernameSuggestions(baseName);

    if (result.success && result.data.suggestions) {
      setSuggestions(result.data.suggestions);
      setShowSuggestions(true);
    }
  }, []);

  const checkUsername = useCallback(
    async (username) => {
      if (!username || username.length < 3) {
        setIsAvailable(null);
        return;
      }

      const cleanUsername = username.toLowerCase().replace(/[^a-z0-9_]/g, "");
      if (cleanUsername !== username) {
        onChange({ target: { name: "username", value: cleanUsername } });
        return;
      }

      setIsChecking(true);

      const result = await authAPI.checkUsername(username);

      if (result.success) {
        setIsAvailable(result.data.available);

        if (!result.data.available) {
          loadSuggestions(username);
        }
      }

      setIsChecking(false);
    },
    [onChange, loadSuggestions]
  );

  useEffect(() => {
    if (checkTimeoutRef.current) {
      clearTimeout(checkTimeoutRef.current);
    }

    const timeout = setTimeout(() => {
      checkUsername(value);
    }, 500);

    checkTimeoutRef.current = timeout;

    return () => {
      if (checkTimeoutRef.current) {
        clearTimeout(checkTimeoutRef.current);
        checkTimeoutRef.current = null;
      }
    };
  }, [value, checkUsername]);

  const generateLocalSuggestions = () => {
    const base =
      firstName && lastName ? `${firstName}_${lastName}`.toLowerCase() : "user";

    const random = Math.floor(Math.random() * 9999);

    return [
      `${base}${random}`,
      `${base}_${random}`,
      `${firstName?.toLowerCase() || "user"}${random}`,
      `cool_${base}`,
      `${base}_official`,
    ];
  };

  const handleSelectSuggestion = (suggestion) => {
    onChange({ target: { name: "username", value: suggestion } });
    setShowSuggestions(false);
  };

  const handleGenerateNew = () => {
    const localSuggestions = generateLocalSuggestions();
    setSuggestions(localSuggestions);
    setShowSuggestions(true);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        اسم المستخدم (Username)
      </label>

      <div className="relative">
        <input
          type="text"
          name="username"
          value={value}
          onChange={onChange}
          placeholder="مثال: ahmed_123"
          required
          minLength={3}
          maxLength={20}
          pattern="[a-z0-9_]+"
          className={`
            w-full px-4 py-3 pr-12 rounded-lg
            border-2 transition-all duration-200 outline-none
            ${
              isAvailable === true
                ? "border-green-500 focus:ring-2 focus:ring-green-200"
                : isAvailable === false
                ? "border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            }
          `}
        />

        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {isChecking ? (
            <Loader2 size={20} className="animate-spin text-blue-500" />
          ) : isAvailable === true ? (
            <Check size={20} className="text-green-500" />
          ) : isAvailable === false ? (
            <X size={20} className="text-red-500" />
          ) : null}
        </div>
      </div>

      {value.length >= 3 && (
        <div className="text-sm">
          {isAvailable === true && (
            <p className="text-green-600 flex items-center gap-1">
              <Check size={16} />
              اسم المستخدم متاح!
            </p>
          )}
          {isAvailable === false && (
            <div className="space-y-2">
              <p className="text-red-600 flex items-center gap-1">
                <X size={16} />
                اسم المستخدم مستخدم بالفعل
              </p>
              <button
                type="button"
                onClick={handleGenerateNew}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700
                         text-sm font-medium transition-colors"
              >
                <RefreshCw size={14} />
                اقترح أسماء بديلة
              </button>
            </div>
          )}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
        <p className="font-medium mb-1">📝 قواعد اسم المستخدم:</p>
        <ul className="list-disc list-inside space-y-0.5">
          <li>من 3 إلى 20 حرف</li>
          <li>حروف إنجليزية صغيرة وأرقام فقط</li>
          <li>يمكن استخدام _ (الشرطة السفلية)</li>
          <li>لا يمكن تغييره لاحقاً</li>
        </ul>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-2">
          <p className="text-sm font-medium text-gray-700">اقتراحات متاحة:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.slice(0, 5).map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelectSuggestion(suggestion)}
                className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200
                         text-blue-700 rounded-lg text-sm font-medium
                         transition-colors duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

UsernameSelector.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};
