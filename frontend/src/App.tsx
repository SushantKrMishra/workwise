import React, { JSX } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login/Login.tsx";
import Signup from "./pages/Signup/Signup.tsx";
import Home from "./pages/Home/Home.tsx";
import Cart from "./pages/Cart/Cart.tsx";
import Cookies from "js-cookie";
import ProductDetails from "./pages/Product-Details/ProductDetails.tsx";
import SellerMenu from "./pages/SellerMenu/SellerMenu.tsx";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  const token = Cookies.get("token");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={token ? "/home" : "/login"} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product-details"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller-menu"
          element={
            <ProtectedRoute>
              <SellerMenu />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
