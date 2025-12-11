import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { SignInPage } from "../pages/SignIn/SignInPage";
import { HomePage } from "../pages/Home/HomePage";
import { PopularPage } from "../pages/Popular/PopularPage";
import { SearchPage } from "../pages/Search/SearchPage";
import { WishlistPage } from "../pages/Wishlist/WishlistPage";
import { MovieDetailPage } from "../pages/Movie/MovieDetailPage";

import { Header } from "../components/layout/Header";
import { ProtectedRoute } from "./ProtectedRoute";

const NotFoundPage: React.FC = () => (
  <div className="page">
    <h1>404</h1>
    <p>페이지를 찾을 수 없습니다.</p>
  </div>
);

export const AppRouter: React.FC = () => {
  const location = useLocation();

  // 로그인 페이지('/signin')에서는 헤더를 숨깁니다.
  const hideHeader = location.pathname === "/signin";

  return (
    <>
      {/* 헤더 조건부 렌더링 */}
      {!hideHeader && <Header />}

      <main className="app-main">
        <Routes>
          {/* 로그인 페이지 (보호 X) */}
          <Route path="/signin" element={<SignInPage />} />

          {/* 👇 아래부터는 로그인해야 접근 가능 (ProtectedRoute) */}
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

          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <MovieDetailPage />
              </ProtectedRoute>
            }
          />

          {/* 404 페이지 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
};