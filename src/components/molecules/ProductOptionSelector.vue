<script setup>
defineProps({
  title: String,    // Örn: "Renk" veya "Boyut"
  options: Array,   // Seçenek listesi
  modelValue: [String, Number], // Seçili olan değer (v-model)
  type: {
    type: String,
    default: 'text' // 'text' (M, L, XL) veya 'image' (Renk resimleri)
  }
});

defineEmits(['update:modelValue']);
</script>

<template>
  <div class="option-selector">
    <h4 class="option-title">{{ title }}: <span>{{ modelValue }}</span></h4>
    
    <div class="options-grid">
      <div 
        v-for="opt in options" 
        :key="opt.value"
        class="option-item"
        :class="{ 
          'active': modelValue === opt.value,
          'is-image': type === 'image',
          'is-text': type === 'text'
        }"
        @click="$emit('update:modelValue', opt.value)"
      >
        <img v-if="type === 'image'" :src="opt.img" :alt="opt.label" />
        
        <span v-else>{{ opt.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.option-selector {
  margin-bottom: 20px;
}
.option-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}
.option-title span {
  color: #333;
  font-weight: bold;
}

.options-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.option-item {
  cursor: pointer;
  border: 1px solid #ddd;
  transition: all 0.2s;
  position: relative;
}

/* Aktif (Seçili) Durum */
.option-item.active {
  border-color: #333;
}

/* --- Metin Kutuları (M, L, XL) --- */
.is-text {
  padding: 8px 15px;
  font-size: 14px;
  font-weight: bold;
  min-width: 40px;
  text-align: center;
}
.is-text:hover {
  border-color: #999;
}

/* --- Resim Kutuları (Renkler) --- */
.is-image {
  width: 40px;
  height: 40px;
  padding: 2px; /* Çerçeve ile resim arası boşluk */
}
.is-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>