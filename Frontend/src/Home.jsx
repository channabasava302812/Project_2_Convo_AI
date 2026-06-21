import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import App from "./App";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      if (location.pathname === "/login" || location.pathname === "/signup") {
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await axios.post(
          "https://project-2-convo-ai.onrender.com",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { status, user } = data;
        if (status) {
          setUsername(user);
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    verifyToken();
  }, [navigate, location.pathname]);

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