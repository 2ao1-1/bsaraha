import { useNavigate } from "react-router-dom";

import LogHeader from "./components/LogHeader";
export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col text-center p-8">
      <LogHeader name="تسجيل الدخول" />

      <div className="w-full pt-10 flex items-center">
        <form className="w-full flex flex-col gap-4 justify-center items-center">
          <div className="flex gap-4 w-1/2">
            <input
              type="text"
              name="FirstName"
              id=""
              placeholder="الاسم الاول"
              className="bg-primary-darker rounded-md p-4 w-1/2 text-center"
            />
            <input
              type="text"
              name="FirstName"
              id=""
              placeholder="الاسم الاخير"
              className="bg-primary-darker rounded-md p-4 w-1/2 text-center"
            />
          </div>
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
            className="bg-secondary-lighter hover:bg-secondary-darker
text-primary-main p-4 rounded-md  font-bold"
            type="submit"
          >
            سجل الآن
          </button>
          <div className="border-t border-text-secondary/30 p-4">
            <p className="mb-5 text-sm text-text-secondary">هل لديك حساب ؟</p>
            <button
              className="bg-secondary-lighter hover:bg-secondary-darker text-primary-main p-2 rounded-md  font-bold"
              type="submit"
              onClick={() => navigate("/Login")}
            >
              تسجيل الدخول
            </button>
          </div>
        </form>
        <hr />
      </div>
    </div>
  );
}
