import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Router>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;