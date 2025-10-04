<script setup lang="ts">
import AccountManagement from "@/widgets/AccountManagement/ui/AccountManagement.vue";
</script>

<template>
  <v-app>
    <v-main style="margin: 0 auto; max-width: 1440px; display: block">
      <AccountManagement />
    </v-main>
  </v-app>
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
