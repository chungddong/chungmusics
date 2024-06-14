import React, { useState } from "react";
import "../css/Login.css";
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  //singup 상태인지 확인해서 로그인창 회원가입창 전환하기 위한 함수
  const [isSignUp, setIsSignUp] = useState(false); 
  //비밀번호 확인 틀릴 시 오류 메시지 표시 위한 함수
  const [passwordError, setPasswordError] = useState("");

  //로그인 요청
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    //서버로 로그인 POST 요청
    axios.post('/api/login', { 
      email: email,
      passwd: password
    })
      .then((response) => {
        if (response.data === "Confirm") {
          console.log('Login Success:', response.data);

          //세션 토큰 저장
          localStorage.setItem("token", response.data.token);
        }
      })
      .catch((error) => {
        console.error('Login Error:', error);
        // 로그인 실패 처리
      });
  };

  //회원가입 요청
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");

    // 회원가입 POST 요청
    axios.post('/api/signup', {
      userName: username,
      passwd: password,
      email: email
    })
      .then((response) => {
        console.log('Success:', response.data);
        // 회원가입 성공 후 로그인 페이지로 이동하거나 다른 작업을 수행할 수 있습니다.
      })
      .catch((error) => {
        console.error('Error:', error);
        // 에러 처리
      });
  };

  return (
    <div className="Login">
      {isSignUp ? (
        <div className="SignUp">
          <div className="LogoBox">
            <h1>Sign Up</h1>
          </div>

          <div className="InputBox">
            <form onSubmit={handleSignUpSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  id="signup-username"
                  value={username}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="email"
                  id="signup-email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  id="signup-password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {passwordError && <p className="error-message">{passwordError}</p>}

              <button type="submit" className="signup-btn">Sign Up</button>
            </form>
          </div>

          <div className="SignUpBox">
            <p>Already have an account? <span onClick={() => setIsSignUp(false)} className="switch-link">Login</span></p>
          </div>
        </div>
      ) : (
        <div className="Login">
          <div className="LogoBox">
            <h1>CHUNGMUSIC</h1>
          </div>

          <div className="InputBox">
            <form onSubmit={handleLoginSubmit}>
              <div className="input-group">
                <input
                  type="email"
                  id="login-email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  id="login-password"
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
            <p>Don't have an account? <span onClick={() => setIsSignUp(true)} className="switch-link">Sign Up</span></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
