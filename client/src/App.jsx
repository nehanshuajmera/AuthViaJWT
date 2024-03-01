import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./universal/Header";
import { Signup } from "./pages/Signup/Signup";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import {useState} from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };
  return (
    <div className="app">
      <Router>
        <Header
          isLoggedIn={isLoggedIn}
          username={username}
          onLogout={handleLogout}
        />
        <div className="pages">
          <Routes>
            <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
