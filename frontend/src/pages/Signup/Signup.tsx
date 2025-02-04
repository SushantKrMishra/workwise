import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store.ts";
import { Button, Container, Form, Input, Title } from "./styles.ts";
import ErrorModal from "../../components/ErrorModal.tsx";
import { SignupLink } from "../Login/styles.ts";
import { signupUser } from "../../features/authSlice.ts";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"BUYER" | "SELLER">("BUYER");
  const [errors, setErrors] = useState<string[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const showErrorModal = useMemo(() => errors.length > 0, [errors]);

  const validateForm = () => {
    const newErrors: string[] = [];
    if (!name.trim()) newErrors.push("Name is required");
    if (!email.trim()) newErrors.push("Email is required");
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.push("Invalid email format");
    if (password.length < 6)
      newErrors.push("Password must be at least 6 characters");
    if (!["BUYER", "SELLER"].includes(role)) newErrors.push("Invalid role");

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await dispatch(signupUser({ name, email, password, role })).unwrap();
      navigate("/login");
    } catch (error: any) {
      setErrors([error]);
    }
  };

  return (
    <Container>
      {showErrorModal && (
        <ErrorModal errors={errors} onClose={() => setErrors([])} />
      )}
      <Form onSubmit={handleSubmit}>
        <Title>Sign Up</Title>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "BUYER" | "SELLER")}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "1rem",
          }}
        >
          <option value="BUYER">Buyer</option>
          <option value="SELLER">Seller</option>
        </select>
        <Button type="submit">Sign Up</Button>
        <SignupLink>
          Already have an account? <Link to="/login">Login</Link>
        </SignupLink>
      </Form>
    </Container>
  );
};

export default Signup;
