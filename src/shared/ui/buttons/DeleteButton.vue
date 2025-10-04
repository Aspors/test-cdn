<script setup lang="ts">
import { mdiDelete } from "@mdi/js";

defineEmits<{
  (e: "delete"): void;
}>();
</script>

<template>
  <v-btn
    :icon="mdiDelete"
    color="error"
    variant="text"
    size="small"
    class="delete-btn"
    @click="$emit('delete')"
    v-bind="$attrs"
  />
</template>

<style scoped>
.delete-btn {
  transition: all 0.2s ease;
}
.delete-btn:hover {
  transform: scale(1.1);
  background: rgba(244, 67, 54, 0.1);
}
</style>
