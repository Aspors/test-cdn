export interface IAccountLabel {
  text: string;
}

export type TAccountType = "LDAP" | "Локальная";

export interface IAccount {
  id: string;
  labels: IAccountLabel[];
  type: TAccountType;
  login: string;
  password: string | null;
}

export interface AccountFormData {
  labels: string;
  type: TAccountType;
  login: string;
  password: string;
}

export interface ValidationErrors {
  labels?: string;
  login?: string;
  password?: string;
  type?: string;
}
