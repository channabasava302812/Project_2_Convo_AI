import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import App from "./App";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (location.pathname === "/login" || location.pathname === "/signup") {
        return;
      }

      if (!cookies.token) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await axios.post(
          "https://project-2-convo-ai.onrender.com",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
        if (status) {
          setUsername(user);
        } else {
          removeCookie("token");
          navigate("/login");
        }
      } catch (err) {
        console.error(err);
        removeCookie("token");
        navigate("/login");
      }
    };

    verifyCookie();
  }, [cookies, navigate, removeCookie, location.pathname]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default Home;