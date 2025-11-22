<script setup>
import { computed } from 'vue';

const props = defineProps({
  // İkonun rengini ve logosunu belirlemek için
  platform: {
    type: String,
    required: true,
    validator: (value) => ['google', 'facebook', 'twitter', 'apple'].includes(value)
  }
});

const getIconPath = (platform) => {
  // Gerçek projede burada SVG veya Image import edersiniz
  switch (platform) {
    case 'google': return 'G';
    case 'facebook': return 'f';
    case 'twitter': return 'X';
    case 'apple': return 'A';
    default: return '?';
  }
};
</script>

<template>
  <button class="social-icon-btn" :data-platform="platform">
    <span class="icon-placeholder">{{ getIconPath(platform) }}</span>
  </button>
</template>

<style scoped>
.social-icon-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s;
}

.social-icon-btn:hover {
  border-color: #aaa;
}

.icon-placeholder {
  font-size: 20px;
  font-weight: bold;
  /* Platforma özel renkler */
  color: #333; 
}
/* Görseldeki renkleri simule edelim (Gerçekte SVG/resim renkli olur) */
[data-platform="google"] .icon-placeholder { color: #db4437; } 
[data-platform="facebook"] .icon-placeholder { color: #4267b2; }
[data-platform="twitter"] .icon-placeholder { font-size: 16px; } 
</style>