import styled from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

export const SearchInput = styled.input`
  padding: 10px;
  width: 300px;
  border: 2px solid #007bff;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #0056b3;
  }
`;

export const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  padding: 20px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`;

export const ProductCard = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 250px;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

export const ProductName = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;

export const ProductDescription = styled.p`
  font-size: 14px;
  color: #666;
`;

export const ProductPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

export const ProductDiscount = styled.span`
  color: red;
  font-size: 14px;
  font-weight: bold;
`;
