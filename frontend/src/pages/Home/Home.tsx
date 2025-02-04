import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  SearchContainer,
  SearchInput,
  ProductList,
  ProductCard,
  ProductName,
  ProductDescription,
  ProductPrice,
  ProductDiscount,
} from "./styles.ts";
import { fetchProducts } from "../../features/productSlice.ts";
import { AppDispatch } from "../../store/store.ts";
import Header from "../../components/Header.tsx";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const products = useSelector((state: any) => state.products.products);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleProductClick = (product: any) => {
    navigate("/product-details", { state: { product } });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return (
    <div>
      <Header />
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search for products"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </SearchContainer>

      <ProductList>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            onClick={() => handleProductClick(product)}
          >
            <ProductName>{product.name}</ProductName>
            <ProductDescription>{product.description}</ProductDescription>
            <ProductPrice>Rs. {product.price}</ProductPrice>
            {product.discount > 0 && (
              <ProductDiscount>{product.discount} % off</ProductDiscount>
            )}
          </ProductCard>
        ))}
      </ProductList>
    </div>
  );
};

export default Home;
