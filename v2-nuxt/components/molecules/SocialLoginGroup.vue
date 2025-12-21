<script setup lang="ts">
import BaseSocialIcon from '../atoms/BaseSocialIcon.vue';
</script>

<template>
  <div class="social-login-group">
    <BaseSocialIcon platform="google" />
    <BaseSocialIcon platform="facebook" />
    <BaseSocialIcon platform="twitter" />
    <BaseSocialIcon platform="apple" />
  </div>
</template>

<style scoped>
.social-login-group {
  display: flex;
  justify-content: center;
  gap: 10px; /* İkonlar arası boşluk azaltıldı */
  margin-top: 20px;
}
</style>