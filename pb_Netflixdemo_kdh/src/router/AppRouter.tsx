import React from "react";
import { Routes, Route } from "react-router-dom";
import { SignInPage } from "../pages/SignIn/SignInPage";
import { Header } from "../components/layout/Header";
import { ProtectedRoute } from "./ProtectedRoute";
import { HomePage } from "../pages/Home/HomePage";
import { PopularPage } from "../pages/Popular/PopularPage";

const TempSearch: React.FC = () => (
  <div className="page">
    <h1>Search (temp)</h1>
  </div>
);

const TempWishlist: React.FC = () => (
  <div className="page">
    <h1>Wishlist (temp)</h1>
  </div>
);

const TempNotFound: React.FC = () => (
  <div className="page">
    <h1>404</h1>
  </div>
);

export const AppRouter: React.FC = () => {
  return (
    <>
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/signin" element={<SignInPage />} />

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
                <TempSearch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <TempWishlist />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<TempNotFound />} />
        </Routes>
      </main>
    </>
  );
};
