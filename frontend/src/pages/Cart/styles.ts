import styled from "styled-components";

export const CartContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }

  h3 {
    margin: 0;
    font-size: 1.2rem;
  }

  p {
    margin: 5px 0;
    color: #555;
  }
`;

export const RemoveButton = styled.button`
  background: #ff4d4f;
  color: #fff;
  border: none;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background: #d9363e;
  }
`;

export const BackButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  &:hover {
    background: #0056b3;
  }
`;
