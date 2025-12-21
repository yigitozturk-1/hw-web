<script setup lang="ts">
import { ref } from 'vue';
import BaseInput from '../atoms/BaseInput.vue'; 
import IconCamera from '../atoms/icons/IconCamera.vue';
import IconSearch from '../atoms/icons/IconSearch.vue';

const searchQuery = ref<string>('');

const handleSearch = () => {
  console.log('Aranıyor:', searchQuery.value);
};
</script>

<template>
  <div class="search-bar-wrapper">
    <div class="input-container">
      <BaseInput 
        v-model="searchQuery" 
        placeholder="zero red truthear" 
      />
      <IconCamera class="camera-icon" />
    </div>

    <button class="search-btn" @click="handleSearch">
      <IconSearch />
    </button>
  </div>
</template>

<style scoped>
.search-bar-wrapper {
  display: flex;
  align-items: center;
  /* AliExpress'in kırmızı çerçevesi */
  border: 2px solid #ff4747; 
  /* Oval köşeler */
  border-radius: 24px; 
  /* Köşelerden taşan kısımları gizle */
  overflow: hidden; 
  width: 100%;
  /* Genişlik sınırı */
  max-width: 100%; /* Parent container (search-area) will control width */ 
  /* Tüm çubuğun arka planı beyaz */
  background: white; 
  /* Yükseklik belirleyelim ki içindekiler hizalansın */
  height: 40px; 
}

.input-container {
  flex-grow: 1; /* Kalan tüm boşluğu kapla */
  display: flex;
  align-items: center;
  padding-left: 5px; /* Soldan biraz boşluk */
}

/* BaseInput componentine stil müdahalesi */
/* :deep() kullanarak alt componentin stillerini eziyoruz */
:deep(.base-input) {
  border: none !important; /* Inputun kendi çerçevesini kaldır */
  padding: 0 10px; /* İç boşlukları ayarla */
  height: 100%; /* Ebeveyn yüksekliğine uydur */
}

.camera-icon {
  cursor: pointer;
  color: #999; /* Kamera ikonu gri tonunda */
  margin-right: 12px;
  transition: color 0.2s;
}

.camera-icon:hover {
  color: #ff4747; /* Üzerine gelince kırmızı olsun */
}

.search-btn {
  /* Arka planı beyaz yap (veya transparent) */
  background-color: white; 

  color: #333; 
  

  border: none;
  outline: none; /* Tıklanınca çıkan odak çerçevesini de kaldır */
  
  padding: 0 20px;
  cursor: pointer;
  height: 100%; /* Çubuğun yüksekliğini doldur */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.search-btn:hover {
  background-color: #f2f2f2; 
}
</style>