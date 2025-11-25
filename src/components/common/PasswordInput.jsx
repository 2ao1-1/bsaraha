import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import PropTypes from "prop-types";

export default function PasswordInput({
  value,
  onChange,
  name = "password",
  placeholder = "كلمة المرور",
  required = true,
  minLength = 6,
  className = "",
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {placeholder}
      </label>

      <div className="relative">
        <input
          type={isFocused || showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          className={`
            w-full px-4 py-3 pr-12 rounded-lg
            border-2 border-gray-200
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200
            transition-all duration-200
            outline-none
            ${className}
          `}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute left-3 top-1/2 -translate-y-1/2
                     text-gray-500 hover:text-gray-700
                     transition-colors duration-200
                     focus:outline-none"
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff size={20} className="text-blue-500" />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>

      {value && (
        <div className="mt-2">
          <PasswordStrength password={value} />
        </div>
      )}
    </div>
  );
}

function PasswordStrength({ password }) {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.length >= 8) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^a-zA-Z0-9]/.test(pass)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  const colors = {
    1: "bg-red-500",
    2: "bg-orange-500",
    3: "bg-yellow-500",
    4: "bg-green-500",
    5: "bg-green-600",
  };

  const labels = {
    1: "ضعيفة جداً",
    2: "ضعيفة",
    3: "متوسطة",
    4: "قوية",
    5: "قوية جداً",
  };

  return (
    <div className="space-y-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              level <= strength ? colors[strength] : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <p
        className={`text-xs ${
          strength >= 4 ? "text-green-600" : "text-gray-600"
        }`}
      >
        قوة كلمة المرور: {labels[strength] || ""}
      </p>
    </div>
  );
}

PasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  minLength: PropTypes.number,
  className: PropTypes.string,
};

PasswordStrength.propTypes = {
  password: PropTypes.string.isRequired,
};
