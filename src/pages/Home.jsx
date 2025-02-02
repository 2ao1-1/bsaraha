import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import Menu from "./components/Menu";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <header className="bg-secondary-lighter ">
        <div className="flex space-x-4 p-4 shadow-md text-primary-main justify-between items-center">
          <Logo />
          <Menu />
        </div>
      </header>

      <div className="w-full h-svh text-center flex flex-col justify-center items-center">
        <h1 className="text-8xl font-bold  font-headers space-x-2 text-secondary-lighter drop-shadow-xl mb-10">
          بصراحه
        </h1>
        <p className="font-body mb-5">
          هل أنت مستعد لمعرفة ملاحظات الناس عنك بدون أن تعرف المرسل ؟ 🤩
        </p>

        <div className="flex gap-4">
          <button
            className="mt-5 px-4 py-2 bg-secondary-lighter hover:bg-secondary-darker text-white rounded-lg"
            onClick={() => navigate("/Login")}
          >
            دخول
          </button>
          <button
            className="mt-5 px-4 py-2 bg-secondary-lighter hover:bg-secondary-darker  text-white rounded-lg"
            onClick={() => navigate("/Register")}
          >
            سجل الآن
          </button>
        </div>
      </div>
    </>
  );
}

function Logo() {
  return (
    <div className="flex gap-4 items-center">
      <Mail size={40} /> <h2 className="text-2xl font-headers">بصراحه</h2>
    </div>
  );
}
