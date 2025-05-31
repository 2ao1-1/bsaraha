import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export default function CloseBtn() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="float-end bg-gray-600 text-primary-main   hover:bg-gray-700 p-2 content-center rounded-full"
      onClick={() => navigate("/")}
    >
      <X />
    </button>
  );
}
