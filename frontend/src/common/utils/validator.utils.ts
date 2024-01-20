export interface ValidationResult {
  isValid: boolean;
  errors?: string[];
}

export const validateRegister = (username: string, password: string): ValidationResult => {
  const lengthValidationForUsername = validateLength(username, "Username must have a length greater than 0.");
  const lengthValidationForPassword = validateLength(password, "Password must have a length greater than 0.");
  const charactersValidation = validateCharacters();
  const combinedValidations = [lengthValidationForUsername, lengthValidationForPassword, charactersValidation];

  if (combinedValidations.every((validation) => validation.isValid)) {
    return { isValid: true };
  } else {
    const errors: (string)[] = combinedValidations
      .filter((validation) => !validation.isValid)
      .flatMap((validation) => validation.errors)
      .filter((error) => error !== undefined)
      .map((error) => error as string);

    return { isValid: false, errors: errors };
  }
};

export const validateAddingSpot = (id: string, value: string): ValidationResult => {
  switch (id) {
    case "name":
      return validateLength(value, `${id} must have a length greater than 0.`);
    case "description":
      return validateLength(value, `${id} must have a length greater than 0.`);
    case "rating":
      return validateNumber(value, 1, 5, `${id} must be between 1 and 5.`);
    case "image":
      return validateURL(value, `${id} must be a valid URL.`);
    case 'type':
      return validateType(value, `${id} must be a valid type.`);
    default:
      return { isValid: false, errors: ["Invalid id"] };
  }
}

export const validateContactMessage = (name: string, message: string): ValidationResult => {
  const lengthValidationForName = validateLength(name, "Name must have a length greater than 0.");
  const lengthValidationForMessage = validateLength(message, "Message must have a length greater than 0.");
  const combinedValidations = [lengthValidationForName, lengthValidationForMessage];

  if (combinedValidations.every((validation) => validation.isValid)) {
    return { isValid: true };
  } else {
    const errors: (string)[] = combinedValidations
      .filter((validation) => !validation.isValid)
      .flatMap((validation) => validation.errors)
      .filter((error) => error !== undefined)
      .map((error) => error as string);

    return { isValid: false, errors: errors };
  }
};

const validateLength = (str: string, error: string): ValidationResult => {
  if (str.length > 0) {
    return { isValid: true };
  } else {
    return { isValid: false, errors: [error] };
  }
};

const validateNumber = (number: string, min: number, max: number, error: string): ValidationResult => {
  const num = Number(number);
  if (num >= min && num <= max) {
    return { isValid: true };
  } else {
    return { isValid: false, errors: [error] };
  }
}

const validateURL = (url: string, error: string): ValidationResult => {
  try {
    new URL(url);
    return { isValid: true };
  } catch (_) {
    return { isValid: false, errors: [error] };
  }
}

const validateType = (type: string, error: string): ValidationResult => {
  const types = ['Lake', 'River', 'Stream', 'Pond', 'Ocean', 'Sea', 'Other'];
  if (types.includes(type)) {
    return { isValid: true };
  } else {
    return { isValid: false, errors: [error] };
  }
}

const validateCharacters = (): ValidationResult => {
  // Implement your character validation logic here
  // Return a ValidationResult object with the appropriate isValid and errors properties
  return { isValid: true };
};