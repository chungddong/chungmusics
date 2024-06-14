import React, { useState } from "react";
import "../css/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // 여기에서 로그인 요청을 서버로 보낼 수 있습니다.
  };

  return (
    <div className="Login">
      <div className="LogoBox">
        <h1>MyApp</h1>
      </div>
      <div className="InputBox">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>

      <div className="SignUpBox">
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>

    </div>
  );
}

export default Login;
