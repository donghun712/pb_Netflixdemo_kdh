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

  // ✨ [추가] 에러 메시지를 표시하기 위한 상태
  const [errorMessage, setErrorMessage] = useState("");

  const { login, register } = useAuthContext();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // ✨ [추가] 이메일 형식 정규식 검사 함수
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleModeChange = (next: "login" | "register") => {
    setErrorMessage(""); // 모드 변경 시 에러 초기화
    setMode(next);
  };

  // 🔥 [수정] 로그인 제출 핸들러 (유효성 검사 추가)
  const onLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // 에러 초기화

    // 1. 이메일 형식 검사
    if (!isValidEmail(loginForm.email)) {
      setErrorMessage("유효한 이메일 형식이 아닙니다.");
      return;
    }

    // 2. 비밀번호 길이 검사 (10자리 이상)
    if (loginForm.password.length < 10) {
      setErrorMessage("비밀번호는 최소 10자 이상이어야 합니다.");
      return;
    }

    const ok = login(
      loginForm.email,
      loginForm.password,
      loginForm.keepLogin
    );

    if (!ok) {
      setErrorMessage("이메일 또는 비밀번호가 올바르지 않습니다.");
      return;
    }
    showToast("로그인 성공!", "success");
    navigate("/");
  };

  // 🔥 [수정] 회원가입 제출 핸들러 (유효성 검사 추가)
  const onRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // 에러 초기화

    // 1. 이메일 형식 검사
    if (!isValidEmail(registerForm.email)) {
      setErrorMessage("유효한 이메일 형식이 아닙니다.");
      return;
    }

    // 2. 비밀번호 길이 검사 (10자리 이상)
    if (registerForm.password.length < 10) {
      setErrorMessage("비밀번호는 최소 10자 이상이어야 합니다.");
      return;
    }

    // 3. 비밀번호 일치 확인
    if (registerForm.password !== registerForm.confirm) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 4. 약관 동의 확인
    if (!registerForm.agree) {
      setErrorMessage("이용약관에 동의해주세요.");
      return;
    }

    const res = register(
      registerForm.email,
      registerForm.password,
      registerForm.confirm,
      registerForm.agree
    );
    
    if (!res.success) {
      setErrorMessage(res.message);
      return;
    }
    
    showToast(res.message, "success");
    // 회원가입 성공 시 로그인 화면으로 회전 및 이메일 자동 입력
    handleModeChange("login");
    setLoginForm((prev) => ({
      ...prev,
      email: registerForm.email,
      password: "", 
    }));
  };

  return (
    <div className="auth-page">
      <div className="auth-card-wrapper">
        <div className={`auth-card ${mode === "login" ? "login-mode" : "register-mode"}`}>
          
          {/* 앞면: 로그인 */}
          <div className="auth-face auth-face-login">
            <h2>Access Your Cinema</h2>
            <form onSubmit={onLoginSubmit}>
              <div className="field">
                <input
                  type="text" // 이메일 형식이 틀렸을 때 브라우저 기본 말풍선 대신 우리가 만든 에러를 띄우기 위해 text로 변경
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

              {/* ✨ [UI] 로그인 에러 메시지 표시 영역 */}
              {mode === "login" && errorMessage && (
                <div className="input-error-msg" style={{ color: '#e50914', fontSize: '13px', marginTop: '5px' }}>
                  ⚠️ {errorMessage}
                </div>
              )}

              <label className="checkbox-row" style={{ marginTop: '10px' }}>
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

          {/* 뒷면: 회원가입 */}
          <div className="auth-face auth-face-register">
            <h2>Create Account</h2>
            <form onSubmit={onRegisterSubmit}>
              <div className="field">
                <input
                  type="text"
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
                <label>비밀번호 (10자 이상)</label>
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

              {/* ✨ [UI] 회원가입 에러 메시지 표시 영역 */}
              {mode === "register" && errorMessage && (
                <div className="input-error-msg" style={{ color: '#e50914', fontSize: '13px', marginTop: '5px' }}>
                  ⚠️ {errorMessage}
                </div>
              )}

              <label className="checkbox-row" style={{ marginTop: '10px' }}>
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