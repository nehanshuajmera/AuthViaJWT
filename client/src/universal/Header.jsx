import { Link } from "react-router-dom";
import "./Header.css";

export const Header = ({ isLoggedIn, username, onLogout }) => {
  // Function to handle logout
  const handleLogout = () => {
    // Perform logout logic here (e.g., clear localStorage, reset state)
    onLogout();
  };

  return (
    <header>
      <div className="navbar">
        <div className="appLogo">
          <Link to="/">
            {" "}
            <img
              src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg"
              alt=""
            />
          </Link>
        </div>
        <div className="appAuth">
          {isLoggedIn ? (
            <>
              <div className="username">Welcome, {username}</div>
              <div className="authBtn" onClick={handleLogout}>
                <Link to='/login'> Logout </Link>
              </div>
            </>
          ) : (
            <>
              <div className="authBtn">
                <Link to="/login"> Login </Link>
              </div>
              <div className="authBtn">
                <Link to="/signup"> Sign Up </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
