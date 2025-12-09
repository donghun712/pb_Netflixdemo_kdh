import React from "react";
import { Routes, Route, Link } from "react-router-dom";

const TempHome: React.FC = () => (
  <div className="page">
    <h1>Home (temp)</h1>
    <p>나중에 실제 홈 페이지만들 예정</p>
    <Link to="/signin">Sign In</Link>
  </div>
);

const TempSignIn: React.FC = () => (
  <div className="page">
    <h1>Sign In (temp)</h1>
    <p>여긴 곧 진짜 로그인 페이지로 교체</p>
  </div>
);

const TempNotFound: React.FC = () => (
  <div className="page">
    <h1>404</h1>
    <p>페이지를 찾을 수 없습니다.</p>
  </div>
);

export const AppRouter: React.FC = () => {
  return (
    <main className="app-main">
      <Routes>
        <Route path="/" element={<TempHome />} />
        <Route path="/signin" element={<TempSignIn />} />
        <Route path="*" element={<TempNotFound />} />
      </Routes>
    </main>
  );
};
