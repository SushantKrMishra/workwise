import styled from "styled-components";

export const ProductDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
`;

export const ProductName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
`;

export const ProductDescription = styled.p`
  font-size: 16px;
  color: #666;
  margin: 10px 0;
`;

export const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
`;

export const ProductDiscount = styled.span`
  color: red;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
`;

export const BackButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 16px;
  &:hover {
    background-color: #0056b3;
  }
`;

export const AddToCartButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #218838;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;
