<script setup lang="ts">
import { computed, onMounted } from 'vue';
import DealTimer from '../atoms/DealTimer.vue';
import BaseButton from '../atoms/BaseButton.vue';
import DealProductCard from '../molecules/DealProductCard.vue';
import { useProductStore } from '~/stores/products';
import type { IProduct } from '@/types';

const productStore = useProductStore();

// Map Firestore products to Deal format
const dealProducts = computed(() => {
  // Take first 4 products for the deal section or filter by some logic
  return productStore.products.slice(0, 4).map((p: IProduct) => {
    const priceVal = Number(p.price);
    const oldPriceVal = Number(p.originalPrice || priceVal * 1.5); // Mock old price if missing
    const discountRate = Math.round(((oldPriceVal - priceVal) / oldPriceVal) * 100);

    return {
      id: p.id,
      title: p.title,
      price: String(p.price),
      oldPrice: String(oldPriceVal.toFixed(2)),
      discount: `-${discountRate}%`,
      img: p.images?.length ? p.images[0] : p.image
    };
  });
});

onMounted(() => {
  if (productStore.products.length === 0) {
    productStore.fetchProducts();
  }
});
</script>

<template>
  <div class="super-deals-wrapper">
    <h2 class="section-title">Günün teklifleri</h2>
    
    <div class="deals-container">
      <div class="deal-sidebar">
        <div class="sidebar-content">
          <h3>Süper Fırsatlar</h3>
          <div class="timer-wrapper">
            <DealTimer />
          </div>
          <BaseButton class="deal-btn">Şimdi satın alın</BaseButton>
        </div>
      </div>

      <div class="deal-grid">
        <DealProductCard 
          v-for="product in dealProducts" 
          :key="product.id"
          :id="product.id"
          :title="product.title"
          :price="product.price"
          :old-price="product.oldPrice"
          :discount="product.discount"
          :image="product.img"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.super-deals-wrapper {
  max-width: 1600px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: sans-serif;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center; /* Başlık ortada */
  margin-bottom: 20px;
  color: #191919;
}

.deals-container {
  display: flex;
  border: 1px solid #e5e5e5; /* Dış çerçeve */
  border-radius: 12px;
  padding: 20px;
  background: white;
  gap: 30px;
}

/* SOL SIDEBAR */
.deal-sidebar {
  width: 250px; /* Sabit genişlik */
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.sidebar-content h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.timer-wrapper {
  margin-bottom: 20px;
}

/* BaseButton özelleştirme (Siyah arka plan) */
:deep(.deal-btn) {
  background-color: black !important;
  color: white !important;
  padding: 12px 24px;
  font-size: 14px;
  width: auto;
}

/* SAĞ ÜRÜN GRID */
.deal-grid {
  flex-grow: 1;
  display: grid;
  /* 4 sütunlu yapı */
  grid-template-columns: repeat(4, 1fr); 
  gap: 20px;
}

</style>