import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store.ts";
import { loginUser } from "../../features/authSlice.ts";
import { Button, Container, Form, Input, SignupLink, Title } from "./styles.ts";
import ErrorModal from "../../components/ErrorModal.tsx";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const showErrorModal = useMemo(() => errors.length > 0, [errors]);

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!email.trim()) newErrors.push("Email is required");
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      newErrors.push("Invalid email format");

    if (!password.trim()) newErrors.push("Password is required");
    else if (password.length < 6)
      newErrors.push("Password must be at least 6 characters");

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await dispatch(loginUser({ email, password })).unwrap();
      Cookies.set("token", response.token, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });
      navigate("/home");
    } catch (error: any) {
      setErrors(["Invalid Credentials"]);
    }
  };

  return (
    <Container>
      {showErrorModal && (
        <ErrorModal errors={errors} onClose={() => setErrors([])} />
      )}
      <Form onSubmit={handleSubmit}>
        <Title>Login</Title>
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
        <Button type="submit">Login</Button>
        <SignupLink>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </SignupLink>
      </Form>
    </Container>
  );
};

export default Login;
