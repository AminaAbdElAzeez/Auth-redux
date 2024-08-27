import "./App.css";
import Login from "./Components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { removeToken, setToken } from "./Store/Actions/AuthActions";
import Logout from "./Components/Logout/Logout";
import { useState } from "react";
import Toast from "./Components/Toast/Toast";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const token = useSelector((state) => state.token);
  const loggedInEmail = useSelector((state) => state.email);
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setToastMessage("Please fill all fields 👀");
      return;
    }

    const loginData = { email, password };

    axios
      .post("https://backend.profferdeals.com/api/admin/login", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.token) {
          dispatch(setToken(data.token, email));
          setEmail("");
          setPassword("");
          setToastMessage("Login successfully 🌹 ");
        } else {
          setToastMessage("Login Failed 🤷‍♂️ ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setToastMessage("An error occurred. Please try again 🚫 ");
      });
  };

  const handleLogout = () => {
    dispatch(removeToken());
  };

  const handleCloseToast = () => {
    setToastMessage("");
  };

  return (
    <div className="app">
      {token ? (
        <Logout email={loggedInEmail} handleLogout={handleLogout} />
      ) : (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
      <Toast message={toastMessage} onClose={handleCloseToast} />
    </div>
  );
}

export default App;
