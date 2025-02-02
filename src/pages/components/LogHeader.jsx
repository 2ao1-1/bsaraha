import { useNavigate } from "react-router-dom";

export default function LogHeader({ name }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-between">
      <div className="mb-20">
        <button
          className="float-end bg-accent-main hover:bg-accent-lighter px-5 content-center text-primary-main rounded-full"
          onClick={() => navigate("/")}
        >
          X
        </button>
      </div>
      <div>
        <h2 className="font-headers text-secondary-main text-xl md:text-5xl md:px-8">
          {name}
        </h2>
      </div>
    </div>
  );
}
