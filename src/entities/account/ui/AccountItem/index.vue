<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import type {
  IAccount,
  AccountFormData,
  ValidationErrors,
  TAccountType,
} from "@/shared/types/account";
import { validateAccount, hasValidationErrors } from "@/shared/lib/validation";
import { formatLabels } from "@/shared/lib/labels";

interface Props {
  account: IAccount;
}

interface Emits {
  (e: "update", id: string, formData: AccountFormData): void;
  (e: "delete", id: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const showPassword = ref(false);
const validationErrors = reactive<ValidationErrors>({});

const accountTypes = ["Локальная", "LDAP"] as const;

const formData = reactive<AccountFormData>({
  labels: formatLabels(props.account.labels),
  type: props.account.type,
  login: props.account.login,
  password: props.account.password || "",
});

const updateField = (field: keyof AccountFormData, value: string) => {
  if (field === "type") {
    formData[field] = value as TAccountType;
    if (value === "LDAP") {
      formData.password = "";
    }
  } else {
    formData[field] = value;
  }
  validateAndSave(field);
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const validateAndSave = (field: keyof AccountFormData) => {
  const errors = validateAccount(formData, field);
  Object.assign(validationErrors, errors);

  if (!hasValidationErrors(errors)) {
    emit("update", props.account.id, formData);
  }
};

const handleBlur = (field: keyof AccountFormData) => {
  validateAndSave(field);
};

const handleDelete = () => {
  emit("delete", props.account.id);
};

watch(
  () => props.account,
  (newAccount) => {
    formData.labels = formatLabels(newAccount.labels);
    formData.type = newAccount.type;
    formData.login = newAccount.login;
    formData.password = newAccount.password || "";
  },
  { deep: true }
);
</script>

<template>
  <tr>
    <td class="pa-2">
      <VTextField
        :model-value="formData.labels"
        @update:model-value="(value) => updateField('labels', value)"
        :error-messages="validationErrors.labels"
        placeholder="Значение"
        variant="outlined"
        density="compact"
        hide-details="auto"
        @blur="handleBlur('labels')"
        data-testid="labels-field"
      />
    </td>

    <td class="pa-2">
      <v-select
        :model-value="formData.type"
        @update:model-value="(value) => updateField('type', value)"
        :error-messages="validationErrors.type"
        :items="accountTypes"
        variant="outlined"
        density="compact"
        hide-details="auto"
        data-testid="type-field"
      />
    </td>

    <td class="pa-2">
      <v-text-field
        :model-value="formData.login"
        @update:model-value="(value) => updateField('login', value)"
        :error-messages="validationErrors.login"
        placeholder="Значение"
        variant="outlined"
        density="compact"
        hide-details="auto"
        @blur="handleBlur('login')"
        data-testid="login-field"
      />
    </td>

    <td class="pa-2" v-if="formData.type === 'Локальная'">
      <v-text-field
        :model-value="formData.password"
        :error-messages="validationErrors.password"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Значение"
        variant="outlined"
        density="compact"
        hide-details="auto"
        @update:model-value="(value) => updateField('password', value)"
        @blur="handleBlur('password')"
        data-testid="password-field"
      >
        <template #append-inner>
          <v-btn
            :icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            variant="text"
            size="small"
            @click="togglePasswordVisibility"
            data-testid="password-toggle"
          />
        </template>
      </v-text-field>
    </td>

    <td class="pa-2" v-else></td>

    <td class="pa-2 text-center">
      <v-btn
        icon="mdi-delete"
        color="error"
        variant="text"
        size="small"
        class="delete-btn"
        @click="handleDelete"
        data-testid="delete-button"
      >
      </v-btn>
    </td>
  </tr>
</template>

<style scoped>
.new-record {
  background: rgba(100, 181, 246, 0.05) !important;
  border-left: 3px solid rgba(100, 181, 246, 0.5) !important;
}

.delete-btn {
  transition: all 0.2s ease !important;
}

.delete-btn:hover {
  transform: scale(1.1) !important;
  background: rgba(244, 67, 54, 0.1) !important;
}

/* Улучшение полей ввода для темной темы */
:deep(.v-text-field .v-field) {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

:deep(.v-text-field .v-field:hover) {
  border-color: rgba(100, 181, 246, 0.5) !important;
}

:deep(.v-text-field .v-field--focused) {
  border-color: rgba(100, 181, 246, 0.8) !important;
  box-shadow: 0 0 0 2px rgba(100, 181, 246, 0.2) !important;
}

:deep(.v-select .v-field) {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

:deep(.v-select .v-field:hover) {
  border-color: rgba(100, 181, 246, 0.5) !important;
}

:deep(.v-select .v-field--focused) {
  border-color: rgba(100, 181, 246, 0.8) !important;
  box-shadow: 0 0 0 2px rgba(100, 181, 246, 0.2) !important;
}
</style>
