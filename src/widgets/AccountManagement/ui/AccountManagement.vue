<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import AccountItem from "@/entities/account/ui/AccountItem/index.vue";
import AddAccountButton from "@/features/add-account/ui/AddAccountButton.vue";
import HintBox from "@/shared/ui/HintBox.vue";
import { useAccountStore } from "@/entities/account/model/store";
import type { AccountFormData } from "@/shared/types/account";

const accountStore = useAccountStore();
const { accounts } = storeToRefs(accountStore);

const handleAddAccount = () => {
  const defaultFormData: AccountFormData = {
    labels: "",
    type: "Локальная",
    login: "",
    password: "",
  };
  accountStore.addAccount(defaultFormData);
};

const handleUpdateAccount = (id: string, formData: AccountFormData) => {
  accountStore.updateAccount(id, formData);
};

const handleDeleteAccount = (id: string) => {
  accountStore.removeAccount(id);
};

onMounted(() => {
  accountStore.loadAccounts();
});
</script>

<template>
  <v-container class="py-4 py-md-8">
    <v-card elevation="8" class="mx-auto modern-card" max-width="768">
      <v-card-text class="pa-4 pa-md-8">
        <div
          class="d-flex flex-column flex-sm-row justify-space-between align-start align-sm-center mb-6 gap-4"
        >
          <div>
            <h1 class="text-h3 text-h4-sm text-h5-xs font-weight-bold mb-2">
              Учетные записи
            </h1>
            <p class="text-body-1 text-medium-emphasis mb-0">
              Управление пользовательскими аккаунтами
            </p>
          </div>
          <AddAccountButton @add="handleAddAccount" />
        </div>

        <HintBox />

        <div class="table-container" style="overflow: hidden">
          <v-table class="account-table" hover style="overflow: hidden">
            <thead>
              <tr>
                <th class="text-left pa-4 font-weight-bold">Метки</th>
                <th class="text-left pa-4 font-weight-bold">Тип записи</th>
                <th class="text-left pa-4 font-weight-bold">Логин</th>
                <th class="text-left pa-4 font-weight-bold">Пароль</th>
                <th class="text-center pa-4 font-weight-bold">Действия</th>
              </tr>
            </thead>
            <TransitionGroup
              tag="tbody"
              name="slide-fade"
              style="overflow: hidden"
              :appear="false"
            >
              <AccountItem
                v-for="account in accounts"
                :key="account.id"
                :account="account"
                @update="handleUpdateAccount"
                @delete="handleDeleteAccount"
              />
            </TransitionGroup>
          </v-table>
        </div>

        <v-card
          v-if="accounts.length === 0"
          variant="tonal"
          class="text-center pa-8 ma-4"
          color="surface-variant"
        >
          <v-icon
            icon="mdi-account-plus-outline"
            size="64"
            class="mb-4"
            color="medium-emphasis"
          />
          <h3 class="text-h6 mb-2">Нет учетных записей</h3>
          <p class="text-body-1 text-medium-emphasis mb-4">
            Нажмите кнопку "Добавить" чтобы создать первую запись
          </p>
          <v-btn
            @click="handleAddAccount"
            color="primary"
            variant="outlined"
            size="large"
          >
            <v-icon icon="mdi-plus" class="mr-2" />
            Добавить запись
          </v-btn>
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style lang="css">
.modern-card {
  border-radius: 16px !important;
  background: linear-gradient(
    135deg,
    rgba(30, 30, 30, 0.8),
    rgba(44, 44, 44, 0.6)
  ) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.table-container {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(30, 30, 30, 0.5);
}

.v-table__wrapper {
  overflow: hidden !important;
}

.account-table {
  background: transparent !important;
  overflow: hidden;
}

.account-table th {
  background: rgba(44, 44, 44, 0.8) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: rgba(255, 255, 255, 0.9) !important;
  font-size: 0.875rem !important;
  letter-spacing: 0.5px !important;
  overflow: hidden;
}

.account-table td {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
  background: transparent !important;
}

.account-table tr:hover {
  background: rgba(100, 181, 246, 0.05) !important;
}

.account-table tr:hover td {
  background: transparent !important;
}

/* Адаптивность */
@media (max-width: 960px) {
  .modern-card {
    margin: 8px !important;
    border-radius: 12px !important;
  }
}

@media (max-width: 600px) {
  .table-container {
    overflow-x: auto;
  }

  .account-table {
    min-width: 600px;
  }

  .account-table th,
  .account-table td {
    padding: 8px !important;
  }
}
</style>
