<script setup>
defineProps({
  text: String,
  icon: String // Emoji veya SVG path olabilir
});
</script>

<template>
  <a href="#" class="menu-link">
    <span class="icon" v-if="icon">{{ icon }}</span>
    <span class="text">{{ text }}</span>
  </a>
</template>

<style scoped>
.menu-link {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  text-decoration: none;
  color: #333;
  font-size: 13px;
  transition: background 0.2s;
}

.menu-link:hover {
  background-color: #f5f5f5;
  color: #ff4747;
}

.icon {
  margin-right: 10px;
  font-size: 16px;
  width: 20px;
  text-align: center;
}
</style>