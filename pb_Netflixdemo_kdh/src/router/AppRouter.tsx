import React from "react";
import { Routes, Route } from "react-router-dom";

import { SignInPage } from "../pages/SignIn/SignInPage";
import { HomePage } from "../pages/Home/HomePage";
import { PopularPage } from "../pages/Popular/PopularPage";
import { SearchPage } from "../pages/Search/SearchPage";
import { WishlistPage } from "../pages/Wishlist/WishlistPage";

import { Header } from "../components/layout/Header";
import { ProtectedRoute } from "./ProtectedRoute";

const NotFoundPage: React.FC = () => (
  <div className="page">
    <h1>404</h1>
    <p>페이지를 찾을 수 없습니다.</p>
  </div>
);

export const AppRouter: React.FC = () => {
  return (
    <>
      <Header />
      <main className="app-main">
        <Routes>
          {/* 로그인 페이지는 보호 X */}
          <Route path="/signin" element={<SignInPage />} />

          {/* 아래부터는 로그인 필요 */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/popular"
            element={
              <ProtectedRoute>
                <PopularPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <WishlistPage />
              </ProtectedRoute>
            }
          />

          {/* 그 외 모든 경로 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
};
