import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartContainer, CartItem, RemoveButton, BackButton } from "./styles.ts";
import { AppDispatch } from "../../store/store.ts";
import { fetchCartItems, removeFromCart } from "../../features/cartSlice.ts";
import Header from "../../components/Header.tsx";

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); 
  const { cartItems, status, error } = useSelector(
    (state: any) => state?.cart ?? []
  );

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleRemove = (cartItemId: string) => {
    dispatch(removeFromCart(cartItemId));
  };

  if (status === "loading") return <p>Loading cart...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <CartContainer>
      <Header />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <BackButton onClick={() => navigate(-1)}>⬅ Back</BackButton>
        <div>Cart Items - {cartItems?.cartItems?.length ?? 0}</div>
      </div>

      {cartItems?.cartItems?.length > 0 ? (
        cartItems?.cartItems?.map((item) => (
          <CartItem key={item.id}>
            <div>
              <h3>{item?.product?.name}</h3>
              <p>{item?.product?.description}</p>
              <p>
                Price: ${item?.product?.price} (-{item?.product?.discount}%)
              </p>
              <p>Quantity: {item?.quantity}</p>
            </div>
            <RemoveButton onClick={() => handleRemove(item?.id)}>
              Remove
            </RemoveButton>
          </CartItem>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </CartContainer>
  );
};

export default Cart;
