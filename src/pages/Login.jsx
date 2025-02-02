import { useNavigate } from "react-router-dom";
import LogHeader from "./components/LogHeader";
// import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col text-center p-8">
      <LogHeader name="تسجيل الدخول" />

      <div className="w-full pt-10 flex items-center">
        <form className="w-full flex flex-col gap-4 justify-center items-center">
          <input
            type="email"
            name="Email"
            id=""
            placeholder="ادخل البريد الإلكتروني ..."
            className="bg-primary-darker rounded-md p-4 w-1/2 text-center"
          />
          <input
            type="password"
            name="Password"
            id=""
            placeholder="ادخل كلمة السر ..."
            className="bg-primary-darker rounded-md p-4 w-1/2 text-center"
          />
          <button
            className="bg-secondary-lighter hover:bg-secondary-darker text-primary-main p-4 rounded-md  font-bold"
            type="submit"
          >
            دخول
          </button>
          <div className="border-t border-text-secondary/30 p-4">
            <p className="mb-5 text-sm text-text-secondary">ليس لديك حساب ؟</p>
            <button
              className="bg-secondary-lighter hover:bg-secondary-darker text-primary-main p-2 rounded-md  font-bold"
              type="submit"
              onClick={() => navigate("/Register")}
            >
              سجل حسابك الآن
            </button>
          </div>
        </form>
        <hr />
      </div>
    </div>
  );
}
