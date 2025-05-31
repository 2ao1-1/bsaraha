import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function RedirectBtn({ text, to, forwardText }) {
  return (
    <div className="text-center text-text-primary text-lg">
      <span>{text} </span>
      <Link
        to={to}
        className="text-gray-500 font-bold transition-colors duration-300 hover:text-gray-700"
      >
        {forwardText}
      </Link>
    </div>
  );
}
