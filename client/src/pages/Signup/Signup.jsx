import { useState } from "react";
import "./Signup.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const Signup = ({ onSignup }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/signup",
        { username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      if (res.statusText) {
        setUsername("");
        setEmail("");
        setPassword("");
        setError(null);
        onSignup(res.data.username);
        navigate('/');
      }
    } catch (err) {
      console.error("Error logging in:", err.message);
      setError("All fields are required"); // Set error state
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setError(null); // Clear error state when modal is closed
  };

  return (
    <div className="signupMain">
      <div className="background">
        <div className="shape" />
        <div className="shape" />
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value) }
        />
        <input
          type="text"
          placeholder="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <input type="password" placeholder="Password" id="password" /> */}
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
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
