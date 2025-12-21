<template>
  <div class="layout-simple">
    <div class="simple-header">
      <div class="container header-content">
        <RouterLink to="/" class="logo-link">
          <img src="/images/aliexpress-logo.png" alt="AliExpress" class="logo-img" />
        </RouterLink>
        <span class="page-title">Alışveriş Sepeti</span>
      </div>
    </div>
    <main>
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import TheFooter from '~/components/organisms/TheFooter.vue';
</script>

<style scoped>
.layout-simple {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: sans-serif;
  background-color: #f2f2f2; /* Light gray bg for whole page like cart usually is */
}

.simple-header {
  padding: 20px 0;
  border-bottom: 1px solid #e5e5e5;
  background: white;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.container {
  max-width: 1400px; /* Match main site width */
  margin: 0 auto;
  padding: 0 20px;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-img {
  height: 40px;
  width: auto;
}

.page-title {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin-top: 5px; /* Slight alignment adjustment */
}

main {
  flex-grow: 1;
  padding-bottom: 40px;
}
</style>
