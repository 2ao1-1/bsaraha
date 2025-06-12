import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import SendMessage from "./pages/SendMassage";
import NotFound from "./pages/NotFound";
import ReactGA from "react-ga4";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    ReactGA.initialize("G-MYJXMVQRXD");
    // ReactGA.initialize("G-HJR56R7YCY");
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
      title: "Bsaraha",
    });
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/:userName/:userId" element={<SendMessage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
