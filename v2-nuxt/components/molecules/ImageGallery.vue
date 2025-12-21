<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  images: string[]
}>();

const selectedImage = ref<string>(props.images?.[0] || '');

watch(() => props.images, (newVal) => {
  if (newVal && newVal.length > 0) {
    selectedImage.value = newVal[0] || '';
  }
});

const selectImage = (img: string) => {
  selectedImage.value = img;
};
</script>

<template>
  <div class="gallery-container">
    <div class="thumbnails">
      <div 
        v-for="(img, index) in images" 
        :key="index"
        class="thumb-item"
        :class="{ 'active': selectedImage === img }"
        @mouseover="selectImage(img)" 
      >
        <img :src="img" alt="thumbnail" />
      </div>
    </div>

    <div class="main-image">
      <img :src="selectedImage" alt="Main Product" />
    </div>
  </div>
</template>

<style scoped>
.gallery-container {
  display: flex;
  gap: 15px;
  /* Remove fixed height to allow auto-scaling based on content, or stick to a max */
  max-width: 100%;
}

.thumbnails {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 60px;
  max-height: 500px; /* Limit height if many thumbnails */
  overflow-y: auto;
}

.thumb-item {
  cursor: pointer;
  border: 1px solid transparent; /* İnce çerçeve */
  border-radius: 4px;
  width: 60px;
  height: 60px; /* Kare thumbnail */
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.thumb-item img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* Küçük resimler de sığsın */
  display: block;
}
.thumb-item.active {
  border-color: #000;
}

.main-image {
  flex-grow: 1;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  /* Kare yapmak için padding hack veya aspect-ratio kullanılabilir */
  width: 100%;
  aspect-ratio: 1 / 1; /* Modern tarayıcılar için kare zorlama */
  /* max-width removed to allow flex growth */
  background: #fff; /* Boşluklar beyaz olsun */
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Sola yasla (kullanıcı isteği) */
  border: 1px solid #f0f0f0;
}
.main-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* Resmi kesmeden sığdır */
}
</style>