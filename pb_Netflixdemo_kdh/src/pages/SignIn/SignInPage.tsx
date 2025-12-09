import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useToast } from "../../components/common/ToastContext";
import "../../styles/auth.css";

export const SignInPage: React.FC = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [swap, setSwap] = useState(false);

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
    if (mode === next) return;
    setMode(next);
    setSwap(true);
    setTimeout(() => setSwap(false), 200);
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
    handleModeChange("login");
    setLoginForm((prev) => ({
      ...prev,
      email: registerForm.email,
      password: registerForm.password,
    }));
  };

  return (
    <div className="auth-page">
      <div className="auth-card-wrapper">
        <div
          className={`auth-card ${mode === "login" ? "auth-login" : "auth-register"} ${
            swap ? "auth-swap" : ""
          }`}
        >
          {/* 로그인 패널 */}
          <div
            className={`auth-panel auth-panel-login ${
              mode === "login" ? "is-active" : "is-hidden"
            }`}
          >
            <h2>Sign In</h2>
            <form onSubmit={onLoginSubmit}>
              <div className="field">
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm((p) => ({ ...p, email: e.target.value }))
                  }
                  required
                />
                <label className={loginForm.email ? "floated" : ""}>
                  이메일
                </label>
              </div>
              <div className="field">
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm((p) => ({ ...p, password: e.target.value }))
                  }
                  required
                />
                <label className={loginForm.password ? "floated" : ""}>
                  비밀번호 (TMDB API 키)
                </label>
              </div>
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={loginForm.keepLogin}
                  onChange={(e) =>
                    setLoginForm((p) => ({
                      ...p,
                      keepLogin: e.target.checked,
                    }))
                  }
                />
                <span>자동 로그인</span>
              </label>
              <button className="btn btn-primary full" type="submit">
                로그인
              </button>
            </form>
            <p className="switch-text">
              아직 회원이 아니신가요?{" "}
              <button
                type="button"
                className="link-btn"
                onClick={() => handleModeChange("register")}
              >
                회원가입
              </button>
            </p>
          </div>

          {/* 회원가입 패널 */}
          <div
            className={`auth-panel auth-panel-register ${
              mode === "register" ? "is-active" : "is-hidden"
            }`}
          >
            <h2>Create Account</h2>
            <form onSubmit={onRegisterSubmit}>
              <div className="field">
                <input
                  type="email"
                  value={registerForm.email}
                  onChange={(e) =>
                    setRegisterForm((p) => ({ ...p, email: e.target.value }))
                  }
                  required
                />
                <label className={registerForm.email ? "floated" : ""}>
                  이메일
                </label>
              </div>
              <div className="field">
                <input
                  type="password"
                  value={registerForm.password}
                  onChange={(e) =>
                    setRegisterForm((p) => ({
                      ...p,
                      password: e.target.value,
                    }))
                  }
                  required
                />
                <label className={registerForm.password ? "floated" : ""}>
                  비밀번호 (TMDB API 키)
                </label>
              </div>
              <div className="field">
                <input
                  type="password"
                  value={registerForm.confirm}
                  onChange={(e) =>
                    setRegisterForm((p) => ({
                      ...p,
                      confirm: e.target.value,
                    }))
                  }
                  required
                />
                <label className={registerForm.confirm ? "floated" : ""}>
                  비밀번호 확인
                </label>
              </div>
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={registerForm.agree}
                  onChange={(e) =>
                    setRegisterForm((p) => ({ ...p, agree: e.target.checked }))
                  }
                />
                <span>이용약관에 동의합니다.</span>
              </label>
              <button className="btn btn-primary full" type="submit">
                회원가입
              </button>
            </form>
            <p className="switch-text">
              이미 계정이 있으신가요?{" "}
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
