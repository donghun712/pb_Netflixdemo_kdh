import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

interface Props {
  children: React.ReactElement;
}

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user, isLoading } = useAuthContext();

  if (isLoading) return <div className="page-loading">로딩 중...</div>;
  if (!user) return <Navigate to="/signin" replace />;

  return children;
};
