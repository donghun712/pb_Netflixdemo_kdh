import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

interface Props {
  children: React.ReactElement;
}

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user, isLoading } = useAuthContext();

  // 아직 자동 로그인 체크 중이면 로딩 표시
  if (isLoading) {
    return <div className="page-loading">로딩 중...</div>;
  }

  // 로그인 안 했으면 무조건 /signin 으로
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // 로그인 되어 있으면 원래 페이지 보여주기
  return children;
};
