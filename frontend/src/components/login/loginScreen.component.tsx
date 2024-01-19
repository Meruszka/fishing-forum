import { FormEvent, useState } from "react";
import ButtonCustom from "../../common/buttonCustom/buttonCustom.component";
import { useNavigate } from "react-router-dom";
import { handleLoginRest, handleRegisterRest } from "./loginScreen.service";
import { useApiClient } from "../../providers/api/apiContext.hook";
import {
  ValidationResult,
  validateRegister,
} from "../../common/utils/validator.utils";

const LoginScreen = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isButtonsDisabled, setIsButtonsDisabled] = useState<boolean>(true);
  const [errorInForm, setErrorInForm] = useState<string[]>([]);

  const apiClient = useApiClient();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const result = await handleLoginRest(apiClient, username, password);
    if (result.status === 200) {
      navigate("/");
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const result = await handleRegisterRest(apiClient, username, password);
    if (result.status === 200) {
      navigate("/");
    }
  };

  const handleFormChange = () => {
    const result: ValidationResult = validateRegister(username, password);
    if (result.isValid) {
      setIsButtonsDisabled(false);
      setErrorInForm([]);
    } else {
      setIsButtonsDisabled(true);
      setErrorInForm(
        result.errors && result.errors.length > 0
          ? result.errors
          : ["Unknown error"]
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onChange={handleFormChange}>
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
          {errorInForm && (
            <>
              {errorInForm.map((error: string) => (
                <div className="mb-4 text-red-500">{error}</div>
              ))}
            </>
          )}
          <ButtonCustom
            label="Login"
            onClick={handleLogin}
            type="login"
            disabled={isButtonsDisabled}
          />
          <ButtonCustom
            label="Register"
            onClick={handleRegister}
            type="register"
            disabled={isButtonsDisabled}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
