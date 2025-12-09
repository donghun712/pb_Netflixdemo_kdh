import React from "react";
import { Routes, Route } from "react-router-dom";
import { SignInPage } from "../pages/SignIn/SignInPage";
import { ProtectedRoute } from "./ProtectedRoute";

const TempHome: React.FC = () => (
  <div className="page">
    <h1>Home (temp)</h1>
  </div>
);

const TempNotFound: React.FC = () => (
  <div className="page">
    <h1>404</h1>
  </div>
);

export const AppRouter: React.FC = () => {
  return (
    <main className="app-main">
      <Routes>
        <Route path="/signin" element={<SignInPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <TempHome />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<TempNotFound />} />
      </Routes>
    </main>
  );
};
