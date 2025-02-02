import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="text-3xl font-bold text-center mt-20">
      login Page
      <button onClick={() => navigate("/")}>x</button>
    </div>
  );
}
