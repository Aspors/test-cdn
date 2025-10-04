<template>
  <v-alert
    type="info"
    variant="tonal"
    class="mb-6 modern-alert"
    density="comfortable"
    rounded="lg"
  >
    <template #prepend>
      <v-icon color="primary">mdi-information</v-icon>
    </template>
    <div class="text-body-2 font-weight-medium">
      Для указания нескольких меток для одной пары логин/пароль используйте
      разделитель <code class="text-primary">;</code>
    </div>
  </v-alert>
</template>

<style scoped>
.modern-alert {
  background: rgba(100, 181, 246, 0.1) !important;
  border: 1px solid rgba(100, 181, 246, 0.2) !important;
  backdrop-filter: blur(10px);
}

code {
  background: rgba(100, 181, 246, 0.2);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: "Courier New", monospace;
  font-weight: bold;
}
</style>
