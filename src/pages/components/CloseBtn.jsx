import { useNavigate } from "react-router-dom";

export default function CloseBtn() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="float-end bg-secondary-lighter text-primary-main   hover:bg-secondary-darker px-5 content-center rounded-full"
      onClick={() => navigate("/")}
    >
      X
    </button>
  );
}
