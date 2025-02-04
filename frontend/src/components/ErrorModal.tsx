import React, { useMemo } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 300px;
  text-align: center;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ErrorList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 1rem;

  li {
    color: red;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
`;

const CloseButton = styled.button`
  background-color: #ef4444;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #dc2626;
  }
`;

interface ErrorModalProps {
  errors: string[];
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ errors, onClose }) => {
  const showModal = useMemo(() => errors.length > 0, [errors]);

  if (!showModal) return null;

  return (
    <Overlay>
      <ModalContainer>
        <Title>Error</Title>
        <ErrorList>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ErrorList>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContainer>
    </Overlay>
  );
};

export default ErrorModal;
