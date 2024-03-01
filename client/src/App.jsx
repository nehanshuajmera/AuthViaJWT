import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./universal/Header";
import { Signup } from "./pages/Signup/Signup";
import { Login } from "./pages/Login/Login";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Header />
        <div className="pages">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;