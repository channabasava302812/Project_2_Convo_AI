import { Route, Routes } from "react-router-dom";
import  Login from "./Login";
import  Signup from "./Signup";
import App from "./App";
import { useNavigate } from "react-router-dom";
import { useEffect ,useState} from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";



function Home() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:8080",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? true
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

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