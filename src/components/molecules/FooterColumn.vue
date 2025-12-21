<script setup>
import FooterLink from '../atoms/FooterLink.vue';

// Dışarıdan Başlık ve Link Listesi alıyoruz
defineProps({
  title: String,
  links: {
    type: Array,
    default: () => [] // Örnek: [{ text: 'Yardım', url: '#' }]
  }
});
</script>

<template>
  <div class="footer-column">
    <h4 class="column-title">{{ title }}</h4>
    
    <div class="links-wrapper">
      <FooterLink 
        v-for="(link, index) in links" 
        :key="index" 
        :href="link.url"
      >
        {{ link.text }}
      </FooterLink>
    </div>
  </div>
</template>

<style scoped>
.footer-column {
  margin-bottom: 20px;
}

.column-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}
</style>