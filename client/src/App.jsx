import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./universal/Header";
import { Signup } from "./pages/Signup/Signup";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Header />
        <div className="pages">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;