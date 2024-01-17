import { ApiClient, LoginResponse } from "../../common/apiClient";

export interface ValidationResult {
  isValid: boolean;
  errors?: string[];
}

export const validateRegister = (username: string, password: string): ValidationResult => {
  const lengthValidation = validateLength(username, password);
  const charactersValidation = validateCharacters();

  if (lengthValidation.isValid && charactersValidation.isValid) {
    return { isValid: true };
  } else {
    const errors: string[] = [];

    if (!lengthValidation.isValid) {
      errors.push("Username and password must have a length greater than 0.");
    }

    return { isValid: false, errors };
  }
};

const validateLength = (username: string, password: string): ValidationResult => {
  if (username.length > 0 && password.length > 0) {
    return { isValid: true };
  } else {
    return { isValid: false, errors: ["Username and password must have a length greater than 0."] };
  }
};

const validateCharacters = (): ValidationResult => {
  // Implement your character validation logic here
  // Return a ValidationResult object with the appropriate isValid and errors properties
  return { isValid: true };
};

export const handleLoginRest = async (apiClient: ApiClient, username: string, password: string): Promise<LoginResponse> => {
  return await apiClient.login({
      username,
      password,
  });
}

export const handleRegisterRest = async (apiClient: ApiClient, username: string, password: string): Promise<LoginResponse> => {
  return await apiClient.register({
    username,
    password,
  });
}