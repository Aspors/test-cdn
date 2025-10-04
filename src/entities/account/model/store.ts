import { defineStore } from "pinia";
import type { IAccount, AccountFormData } from "@/shared/types/account";
import { generateId } from "@/shared/lib/id";
import { parseLabels } from "@/shared/lib/labels";

const STORAGE_KEY = "accounts";

export const useAccountStore = defineStore("account", {
  state: () => ({
    accounts: [] as IAccount[],
  }),

  getters: {
    accountsList: (state) => state.accounts,
  },

  actions: {
    loadAccounts() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) throw new Error("No stored data");
        this.accounts = JSON.parse(stored);
        console.log("Loaded accounts:", this.accounts);
      } catch (error) {
        console.error("Ошибка загрузки учетных записей:", error);
        this.accounts = [];
      }
    },

    saveAccounts() {
      try {
        const data = JSON.stringify(this.accounts);
        console.log("Saving accounts:", this.accounts);
        localStorage.setItem(STORAGE_KEY, data);
      } catch (error) {
        console.error("Ошибка сохранения учетных записей:", error);
      }
    },

    addAccount(formData: AccountFormData): IAccount {
      const newAccount: IAccount = {
        id: generateId(),
        labels: parseLabels(formData.labels),
        type: formData.type,
        login: formData.login,
        password: formData.type === "Локальная" ? formData.password : null,
      };

      this.accounts.push(newAccount);
      this.saveAccounts();
      return newAccount;
    },

    updateAccount(id: string, formData: AccountFormData) {
      const index = this.accounts.findIndex((account) => account.id === id);
      if (index !== -1) {
        this.accounts[index] = {
          ...this.accounts[index],
          labels: parseLabels(formData.labels),
          type: formData.type,
          login: formData.login,
          password: formData.type === "Локальная" ? formData.password : null,
        };
        this.saveAccounts();
      }
    },

    removeAccount(id: string) {
      const index = this.accounts.findIndex((account) => account.id === id);
      if (index !== -1) {
        this.accounts.splice(index, 1);
        this.saveAccounts();
      }
    },

    getAccountById(id: string): IAccount | undefined {
      return this.accounts.find((account) => account.id === id);
    },
  },
});
