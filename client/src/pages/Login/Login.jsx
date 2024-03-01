import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { useState } from "react";

export const Login = ({onLogin}) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.statusText) {
        setUsername("");
        setPassword("");
        setError(null);
        onLogin(username);
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      setError("Invalid login credentials"); // Set error state
      setShowModal(true); // Show modal
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setError(null); // Clear error state when modal is closed
  };

  return (
    <div className="loginMain">
      <div className="login-container">
        <div className="form-container">
          <img
            src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
            alt="illustration"
            className="illustration"
          />
          <h1 className="opacity">LOGIN</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="USERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="opacity" type="submit" disabled={loading}>
              {loading ? "Loading..." : "SUBMIT"}
            </button>
          </form>
          <div className="register-forget opacity">
            <Link to="/signup">SIGN UP</Link>
            <Link to="">FORGOT PASSWORD</Link>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <p>{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};
