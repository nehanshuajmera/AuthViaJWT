import { Link, NavLink } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  return (
    <header>
      <div className="navbar">
        <div className="appLogo">
          <Link to="/"> <img src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg" alt="" /></Link>
        </div>
        <div className="appAuth">
          <div className="authBtn">
            <NavLink to="/login"> Login </NavLink>
          </div>
          <div className="authBtn">
            <NavLink to="/signup"> Sign Up </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};
