<script setup lang="ts">
defineProps<{
  text: string;
  icon?: string;
  to?: string;
}>();
</script>

<template>
  <NuxtLink v-if="to" :to="to" class="menu-item-link">
    <span class="icon" v-if="icon">{{ icon }}</span>
    <span class="text">{{ text }}</span>
  </NuxtLink>
  
  <div v-else class="menu-item link-hover">
    <span class="icon" v-if="icon">{{ icon }}</span>
    <span class="text">{{ text }}</span>
  </div>
</template>

<style scoped>
.menu-item, .menu-item-link {
  display: flex;
  align-items: center;
  padding: 12px 24px; /* Increased padding */
  cursor: pointer;
  transition: background 0.2s;
  color: #333;
  text-decoration: none;
}
.menu-item:hover, .menu-item-link:hover {
  background-color: #f5f5f5;
}
.icon { margin-right: 12px; font-size: 20px; /* Larger icons */ }
.text { font-size: 14px; /* Larger text */ }
</style>