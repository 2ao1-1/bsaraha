import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/Register";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
}
