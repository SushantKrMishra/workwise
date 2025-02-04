import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice.ts";
import {
  ProductDetailsContainer,
  ProductName,
  ProductDescription,
  ProductPrice,
  ProductDiscount,
  BackButton,
  AddToCartButton,
  ButtonContainer,
} from "./styles.ts";
import { AppDispatch } from "../../store/store.ts";
import Header from "../../components/Header.tsx";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { product } = location.state || {};

  if (!product) {
    return <div>No product data available</div>;
  }

  const handleAddToCart = () => {
    const cartItem = {
      productId: product.id,
      quantity: 1,
    };
    dispatch(addToCart(cartItem));
    alert("Product added Successfully!");
  };

  const handleBackClick = () => {
    navigate("/home");
  };

  return (
    <>
      <Header />
      <ProductDetailsContainer>
        <BackButton onClick={handleBackClick}>Back to Products</BackButton>

        <ProductName>{product.name}</ProductName>
        <ProductDescription>{product.description}</ProductDescription>
        <ProductPrice>${product.price}</ProductPrice>
        {product.discount > 0 && (
          <ProductDiscount>{product.discount}% off</ProductDiscount>
        )}

        <ButtonContainer>
          <AddToCartButton onClick={handleAddToCart}>
            Add to Cart
          </AddToCartButton>
        </ButtonContainer>
      </ProductDetailsContainer>
    </>
  );
};

export default ProductDetails;
