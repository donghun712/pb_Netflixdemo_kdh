import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useToast } from "../../components/common/ToastContext";
import "../../styles/auth.css";

export const SignInPage: React.FC = () => {
  const [mode, setMode] = useState<"login" | "register">("login");

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    keepLogin: true,
  });

  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    confirm: "",
    agree: false,
  });

  const { login, register } = useAuthContext();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleModeChange = (next: "login" | "register") => {
    setMode(next);
  };

  const onLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(
      loginForm.email,
      loginForm.password,
      loginForm.keepLogin
    );
    if (!ok) {
      showToast("이메일 또는 비밀번호가 올바르지 않습니다.", "error");
      return;
    }
    showToast("로그인 성공!", "success");
    navigate("/");
  };

  const onRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirm) {
      showToast("비밀번호가 일치하지 않습니다.", "error");
      return;
    }
    if (!registerForm.agree) {
      showToast("이용약관에 동의해주세요.", "error");
      return;
    }

    const res = register(
      registerForm.email,
      registerForm.password,
      registerForm.confirm,
      registerForm.agree
    );
    
    if (!res.success) {
      showToast(res.message, "error");
      return;
    }
    
    showToast(res.message, "success");
    // 회원가입 성공 시 로그인 화면으로 회전
    handleModeChange("login");
    setLoginForm((prev) => ({
      ...prev,
      email: registerForm.email,
    }));
  };

  return (
    <div className="auth-page">
      <div className="auth-card-wrapper">
        {/* 이 카드가 180도 회전합니다 */}
        <div className={`auth-card ${mode === "login" ? "login-mode" : "register-mode"}`}>
          
          {/* 앞면: 로그인 (0도) */}
          <div className="auth-face auth-face-login">
            <h2>Access Your Cinema</h2>
            <form onSubmit={onLoginSubmit}>
              <div className="field">
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  placeholder=" "
                  required
                />
                <label>이메일</label>
              </div>
              <div className="field">
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder=" "
                  required
                />
                <label>비밀번호 (TMDB API Key)</label>
              </div>
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={loginForm.keepLogin}
                  onChange={(e) => setLoginForm({ ...loginForm, keepLogin: e.target.checked })}
                />
                <span>자동 로그인</span>
              </label>
              <button className="btn-primary" type="submit">
                로그인
              </button>
            </form>
            <p className="switch-text">
              아직 회원이 아니신가요?
              <button
                type="button"
                className="link-btn"
                onClick={() => handleModeChange("register")}
              >
                회원가입
              </button>
            </p>
          </div>

          {/* 뒷면: 회원가입 (180도 미리 돌아가 있음) */}
          <div className="auth-face auth-face-register">
            <h2>Create Account</h2>
            <form onSubmit={onRegisterSubmit}>
              <div className="field">
                <input
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  placeholder=" "
                  required
                />
                <label>이메일</label>
              </div>
              <div className="field">
                <input
                  type="password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  placeholder=" "
                  required
                />
                <label>비밀번호</label>
              </div>
              <div className="field">
                <input
                  type="password"
                  value={registerForm.confirm}
                  onChange={(e) => setRegisterForm({ ...registerForm, confirm: e.target.value })}
                  placeholder=" "
                  required
                />
                <label>비밀번호 확인</label>
              </div>
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={registerForm.agree}
                  onChange={(e) => setRegisterForm({ ...registerForm, agree: e.target.checked })}
                />
                <span>이용약관에 동의합니다.</span>
              </label>
              <button className="btn-primary" type="submit">
                회원가입
              </button>
            </form>
            <p className="switch-text">
              이미 계정이 있으신가요?
              <button
                type="button"
                className="link-btn"
                onClick={() => handleModeChange("login")}
              >
                로그인
              </button>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};