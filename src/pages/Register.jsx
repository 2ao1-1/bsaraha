import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CryptoJS from "crypto-js";

const SECRET_KEY = "MySuperSecretKey";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // const userName = `${formData.firstName}_${formData.lastName}`.toLowerCase();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setError("يرجى ملء جميع الحقول!");
      setLoading(false);
      return;
    }
    try {
      // console.log("📤 Sending Data:", { ...formData });

      const res = await axios.post(
        `http://64.23.184.122:2001/api/auth/register`,
        { ...formData },
        {
          headers: { "Content-Type": "application/json", accept: " */*" },
        }
      );

      setSuccess("تم التسجيل بنجاح!");
      setError(null);

      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(res.data),
        SECRET_KEY
      ).toString();

      localStorage.setItem("userData", encryptedData);
      navigate("/Login");

      // console.log("✅ Response Data:", res.data);
    } catch (err) {
      if (err.response) {
        console.error("❌ Server Error:", err.response.data); // عرض الخطأ الحقيقي
        setError(err.response.data.message || "حدث خطأ أثناء التسجيل!");
      } else {
        console.error("❌ Network Error:", err.message);
        setError("تعذر الاتصال بالسيرفر!");
      }
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-secondary-main/75 font-body">
      <div className="text-center py-8">
        <h2 className="font-headers text-primary-main text-3xl md:text-5xl md:px-8 drop-shadow-md">
          إنشاء حساب
        </h2>
      </div>

      <form
        className="bg-primary-main rounded-md p-4 m-4 grid gap-4 w-full max-w-xl"
        onSubmit={handleSubmit}
      >
        <div className="relative w-full ">
          <button
            type="button"
            className="float-end hover:bg-accent-main bg-accent-lighter px-5 content-center text-primary-main rounded-full"
            onClick={() => navigate("/")}
          >
            X
          </button>
        </div>

        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <label htmlFor={key} className="text-text-primary">
              {key === "firstName"
                ? "الاسم الأول"
                : key === "lastName"
                ? "الاسم الأخير"
                : key === "email"
                ? "البريد الإلكتروني"
                : "كلمة المرور"}
            </label>
            <input
              type={key === "password" ? "password" : "text"}
              name={key}
              id={key}
              value={value}
              onChange={handleChange}
              className="w-full p-2 bg-primary-darker text-text-primary rounded outline-none focus:bg-secondary-lighter/25"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 bg-secondary-lighter text-primary-main p-2 w-full rounded hover:bg-secondary-darker"
          disabled={loading}
        >
          {loading ? "جاري التسجيل..." : "تسجيل"}
        </button>

        <div className="text-center text-text-primary">
          <span>لديك حساب؟ </span>
          <Link
            to="/Login"
            className="text-secondary-lighter font-bold hover:text-secondary-darker"
          >
            سجل هنا
          </Link>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
      </form>
    </div>
  );
}
