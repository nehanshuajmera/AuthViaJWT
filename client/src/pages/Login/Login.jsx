import "./Login.css";

export const Login = () => {
  return (
    <div className="loginMain">
      <div className="login-container">
        <div className="circle circle-one" />
        <div className="form-container">
          <img
            src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
            alt="illustration"
            className="illustration"
          />
          <h1 className="opacity">LOGIN</h1>
          <form>
            <input type="text" placeholder="USERNAME" />
            <input type="password" placeholder="PASSWORD" />
            <button className="opacity">SUBMIT</button>
          </form>
          <div className="register-forget opacity">
            <a href="">REGISTER</a>
            <a href="">FORGOT PASSWORD</a>
          </div>
        </div>
        <div className="circle circle-two" />
      </div>
      <div className="theme-btn-container" />
    </div>
  );
};
