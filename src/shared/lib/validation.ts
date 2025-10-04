import type { AccountFormData, ValidationErrors } from "../types/account";

type TInputs = "password" | "label" | "login";

const ValidationMethods = new Map<
  TInputs,
  (data: AccountFormData, errors: ValidationErrors) => void
>([
  ["label", validateLabels],
  ["login", validateLogin],
  ["password", validatePassword],
]);

function validateLabels(data: AccountFormData, errors: ValidationErrors) {
  if (+data?.labels > 50) {
    errors.labels = "Максимум 50 символов";
  }
}

function validateLogin(data: AccountFormData, errors: ValidationErrors) {
  if (data.login !== undefined) {
    if (!data.login) {
      errors.login = "Логин обязателен для заполнения";
    } else if (data.login.length > 100) {
      errors.login = "Максимум 100 символов";
    } else {
      errors.login = undefined;
    }
  }
}

function validatePassword(data: AccountFormData, errors: ValidationErrors) {
  if (data.password !== undefined) {
    if (data.type !== "LDAP" && !data.password) {
      errors.password = "Пароль обязателен для локальных записей";
    } else if (data.password && data.password.length > 100) {
      errors.password = "Максимум 100 символов";
    } else {
      errors.password = undefined;
    }
  }
}

export const validateAccount = (
  data: AccountFormData,
  fieldType?: string
): ValidationErrors => {
  const errors: ValidationErrors = {};
  if (fieldType) {
    ValidationMethods.get(fieldType as TInputs)?.(data, errors);
  } else {
    ValidationMethods.forEach((validate) => validate(data, errors));
  }

  return errors;
};

export const hasValidationErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};
