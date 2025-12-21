<script setup>
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
  gap: 20px; /* İkonlar arası boşluk */
  margin-top: 20px;
}
</style>