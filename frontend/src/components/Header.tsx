import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";

const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: #007bff;
  cursor: pointer;
`;

const Logout = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };
  let role = "";
  if (token) {
    try {
      const decoded: { role: string } = jwtDecode(token);
      role = decoded.role;
    } catch (error) {
      console.error("Invalid token", error);
      handleLogout();
    }
  }

  return (
    <HeaderStyle>
      <Logo onClick={() => navigate("/")}>Ecommerce</Logo>
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {role === "SELLER" && (
          <div
            onClick={() => navigate("/seller-menu")}
            style={{ cursor: "pointer" }}
          >
            Seller Menu
          </div>
        )}
        <div
          onClick={() => navigate("/cart")}
          style={{ width: "fit-content", cursor: "pointer" }}
        >
          Cart
        </div>
        <Logout onClick={handleLogout}>Logout</Logout>
      </div>
    </HeaderStyle>
  );
};

export default Header;
