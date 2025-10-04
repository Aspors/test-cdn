export interface ValidationState {
  labels?: string;
  login?: string;
  password?: string;
  type?: string;
}

export const ACCOUNT_TYPES = ["Локальная", "LDAP"] as const;
