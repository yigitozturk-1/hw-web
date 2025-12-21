<script setup>
import { ref } from 'vue';

// Dışarıdan resim listesi alıyoruz
const props = defineProps({
  images: {
    type: Array,
    required: true
  }
});

// Şu an seçili olan resim (Varsayılan olarak ilki)
const selectedImage = ref(props.images[0]);

const selectImage = (img) => {
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
  height: 500px; /* Sabit yükseklik */
}

.thumbnails {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 60px;
  overflow-y: auto;
}

.thumb-item {
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 4px;
  overflow: hidden;
}
.thumb-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.thumb-item.active {
  border-color: #333; /* Seçili olanın çerçevesi */
}

.main-image {
  flex-grow: 1;
  border-radius: 8px;
  overflow: hidden;
}
.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Resmi alana sığdır */
}
</style>