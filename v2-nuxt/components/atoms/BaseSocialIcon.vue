<script setup lang="ts">
import { computed } from 'vue';

type Platform = 'google' | 'facebook' | 'twitter' | 'apple';

interface Props {
  platform: Platform;
}

const props = defineProps<Props>();

// İnternet üzerindeki resmi logoların linkleri (Wikipedia/Wikimedia Commons kaynaklı SVG'ler)
const logoUrls = {
  google: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg',
  facebook: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg',
  twitter: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/X_icon_2.svg', // X logosu
  apple: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg'
};

// Seçilen platforma göre doğru URL'i getir
const currentLogoUrl = computed(() => logoUrls[props.platform]);
</script>

<template>
  <button class="social-icon-btn" :title="platform + ' ile giriş yap'">
    <img 
      :src="currentLogoUrl" 
      :alt="platform" 
      class="social-img"
      :class="{ 'apple-icon': platform === 'apple' }" 
    />
  </button>
</template>

<style scoped>
.social-icon-btn {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0; /* Butonun kendi padding'ini sıfırla */
  overflow: hidden;
}

.social-icon-btn:hover {
  background-color: #f9f9f9;
  border-color: #aaa;
  transform: translateY(-2px); /* Hafif yukarı kalkma efekti */
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.social-img {
  width: 30px;
  height: 30px;
  object-fit: contain;
}

/* Apple logosu bazen diğerlerine göre küçük görünebilir, onu azıcık büyütelim */
.apple-icon {
  width: 26px;
  height: 26px;
}
</style>