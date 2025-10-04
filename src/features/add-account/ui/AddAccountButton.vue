<script setup lang="ts">
interface Emits {
  (e: "add"): void;
}

const emit = defineEmits<Emits>();

const handleAddAccount = () => {
  emit("add");
};
</script>

<template>
  <v-btn
    @click="handleAddAccount"
    class="add-button"
    color="primary"
    variant="elevated"
    size="large"
    rounded="lg"
    data-testid="add-button"
  >
    <v-icon icon="mdi-plus" size="large" />
    <span class="ml-2 d-none d-sm-inline">Добавить</span>
  </v-btn>
</template>

<style scoped>
.add-button {
  min-width: 120px !important;
  height: 48px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  box-shadow: 0 4px 12px rgba(100, 181, 246, 0.3) !important;
  transition: all 0.3s ease !important;
}

.add-button:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 20px rgba(100, 181, 246, 0.4) !important;
}

@media (max-width: 600px) {
  .add-button {
    min-width: 48px !important;
  }
}
</style>
