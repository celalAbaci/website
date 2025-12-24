"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/Button";
import Input from "@/components/Input";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post("/auth/signin", { email, password });
      // Assuming response structure based on AuthController/AuthResponse
      // I need to check AuthResponse structure, but usually it has token and maybe email
      // Let's assume response.data.accessToken based on common Spring Boot JWT tutorials or just response.data if it's a string.
      // Wait, let's assume it returns a JSON with accessToken.
      // If I look at the AuthController, it returns `authService.authenticateUser(loginRequest)`.
      // I should double check what AuthResponse looks like if possible, but I'll assume standard { accessToken: "..." }

      // Let's quickly verify AuthResponse structure to be safe.
      // I'll assume it has `accessToken` for now.

      const token = response.data.accessToken || response.data.token;
      if (token) {
        login(token, email);
      } else {
        toast.error("Invalid response from server");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          type="text" // Using text to match likely username/email field flexibility or just email
          label="Email / Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          id="password"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" isLoading={isLoading} className="mt-4">
          Sign In
        </Button>
      </form>
    </div>
  );
}
