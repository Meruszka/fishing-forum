// Login.jsx
import React, { FormEvent, useState } from "react";
import ButtonCustom from "../buttonCustom/buttonCustom";
import apiClient, { LoginResponse } from "../../common/apiClient";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    console.log("handleLogin");

    try {
      const res: LoginResponse = await apiClient.login({ username, password });
      if (res.status === 200) {
        navigate("/");
      } else {
        console.error("Login failed:", res.status);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <ButtonCustom
            label="Login"
            onClick={handleLogin}
            color="blue"
            size="large"
          />
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
