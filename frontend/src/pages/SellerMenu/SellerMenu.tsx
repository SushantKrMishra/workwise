import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  addProduct,
  deleteProduct,
  editProduct,
} from "../../features/productSlice.ts";
import { AppDispatch } from "../../store/store.ts";
import Header from "../../components/Header.tsx";
import ErrorModal from "../../components/ErrorModal.tsx";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ManageProductsContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
`;

const ManageProductsTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ProductItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
  gap: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  align-items: center;

  span {
    display: block;
    font-size: 14px;
    color: #333;
  }

  .product-detail {
    font-size: 16px;
    color: #666;
  }

  div {
    display: flex;
    gap: 10px;
    justify-content: flex-start;
  }
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #45a049;
  }
`;

const ManageButton = styled(Button)`
  background-color: #f44336;
  &:hover {
    background-color: #e41f1f;
  }
`;

const SellerMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: any) => state.products);
  const [isAddMode, setIsAddMode] = useState<boolean>(true);
  const [currentProduct, setCurrentProduct] = useState<any>(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: 0,
    discount: 0,
  });

  const [errors, setErrors] = useState<string[]>([]);
  const token = Cookies.get("token");
  const decoded: { userId: string } = jwtDecode(token);
  const filteredProducts = useMemo(() => {
    return products.filter((item) => item.sellerId === decoded.userId);
  }, [decoded.userId, products]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "discount" ? parseFloat(value) : value,
    }));
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!form.name) newErrors.push("Name is required");
    if (!form.category) newErrors.push("Category is required");
    if (!form.description) newErrors.push("Description is required");
    if (form.price <= 0) newErrors.push("Price must be greater than zero");
    if (form.discount < 0 || form.discount > 100)
      newErrors.push("Discount must be between 0 and 100");

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleAddProduct = () => {
    if (validateForm()) {
      dispatch(addProduct(form))
        .then(() => {
          alert("Product added successfully!");
          setForm({
            name: "",
            category: "",
            description: "",
            price: 0,
            discount: 0,
          });
        })
        .catch(() => {
          alert("Error adding product!");
        });
    }
  };

  const handleEditProduct = () => {
    if (validateForm()) {
      if (currentProduct) {
        dispatch(editProduct({ ...currentProduct, ...form }))
          .then(() => {
            alert("Product updated successfully!");
            setForm({
              name: "",
              category: "",
              description: "",
              price: 0,
              discount: 0,
            });
            setIsAddMode(true);
          })
          .catch(() => {
            alert("Error updating product!");
          });
      }
    }
  };

  const handleDeleteProduct = (productId: string) => {
    dispatch(deleteProduct(productId))
      .then(() => {
        alert("Product deleted successfully!");
      })
      .catch(() => {
        alert("Error deleting product!");
      });
  };

  const handleSelectProduct = (product: any) => {
    setCurrentProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      discount: product.discount,
    });
    setIsAddMode(false);
  };

  const handleCloseModal = () => {
    setErrors([]);
  };

  return (
    <>
      <Header />
      <Container>
        <Title>Seller Menu</Title>
        <div>
          <Button onClick={() => setIsAddMode(true)}>Add Product</Button>
        </div>
        <div>
          {isAddMode ? <h3>Add Product</h3> : <h3>Edit Product</h3>}
          <Form>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />
            <Input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
            />
            <Input
              type="number"
              name="discount"
              placeholder="Discount"
              value={form.discount}
              onChange={handleChange}
            />
            {isAddMode ? (
              <Button type="button" onClick={handleAddProduct}>
                Add Product
              </Button>
            ) : (
              <Button type="button" onClick={handleEditProduct}>
                Edit Product
              </Button>
            )}
          </Form>
        </div>
        <ManageProductsContainer>
          <ManageProductsTitle>Manage Products</ManageProductsTitle>
          <ProductList>
            {filteredProducts.map((product) => (
              <ProductItem key={product.id}>
                <span className="product-detail">{product.name}</span>
                <span className="product-detail">{product.category}</span>
                <span className="product-detail">{product.description}</span>
                <span className="product-detail">${product.price}</span>
                <span className="product-detail">{product.discount}%</span>
                <div>
                  <Button onClick={() => handleSelectProduct(product)}>
                    Edit
                  </Button>
                  <ManageButton onClick={() => handleDeleteProduct(product.id)}>
                    Delete
                  </ManageButton>
                </div>
              </ProductItem>
            ))}
          </ProductList>
        </ManageProductsContainer>
      </Container>

      <ErrorModal errors={errors} onClose={handleCloseModal} />
    </>
  );
};

export default SellerMenu;
