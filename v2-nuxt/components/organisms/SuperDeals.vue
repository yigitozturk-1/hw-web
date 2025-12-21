<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import DealTimer from '../atoms/DealTimer.vue';
import DealProductCard from '../molecules/DealProductCard.vue';
import { useProductStore } from '~/stores/products';
import type { IProduct } from '@/types';

const productStore = useProductStore();

// Paket teklifler için ürünler (ilk 3)
const bundleProducts = computed(() => {
  return productStore.products.slice(0, 3).map((p: IProduct) => {
    const priceVal = Number(p.price);
    const oldPriceVal = Number(p.originalPrice || priceVal * 1.5);
    const discountRate = Math.round(((oldPriceVal - priceVal) / oldPriceVal) * 100);

    return {
      id: p.id,
      title: p.title,
      price: String(p.price),
      oldPrice: String(oldPriceVal.toFixed(2)),
      discount: `-${discountRate}%`,
      img: p.images?.length ? p.images[0] : p.image,
      rating: p.rating || 4.5,
      sold: p.sold || Math.floor(Math.random() * 5000) + 100
    };
  });
});

// Süper Fırsatlar için ürünler - daha fazla ürün alıyoruz slider için
const allDealProducts = computed(() => {
  return productStore.products.slice(3, 15).map((p: IProduct) => {
    const priceVal = Number(p.price);
    const oldPriceVal = Number(p.originalPrice || priceVal * 1.5);
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

// Slider state - tekli kayma için
const currentIndex = ref(0);
const visibleProducts = 3; // Aynı anda 3 ürün görünecek

// Toplam kaydırılabilecek adım sayısı
const maxIndex = computed(() => Math.max(0, allDealProducts.value.length - visibleProducts));

const nextSlide = () => {
  if (currentIndex.value < maxIndex.value) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0; // Başa dön
  }
};

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = maxIndex.value; // Sona git
  }
};

// Görünür ürünler
const visibleDealProducts = computed(() => {
  return allDealProducts.value.slice(currentIndex.value, currentIndex.value + visibleProducts);
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
    
    <div class="deals-row">
      <!-- PAKET TEKLİFLER KARTI -->
      <div class="deal-card bundle-card">
        <div class="card-header">
          <h3 class="card-title">Paket teklifler</h3>
          <NuxtLink to="/deals/bundle" class="card-subtitle">
            <span class="subtitle-icon">📦</span>
            600TL'den başlayan 3 ürün
            <span class="arrow">›</span>
          </NuxtLink>
        </div>
        
        <div class="bundle-products">
          <NuxtLink 
            v-for="product in bundleProducts" 
            :key="product.id"
            :to="`/product/${product.id}`"
            class="bundle-product"
          >
            <div class="bundle-image">
              <img :src="product.img" :alt="product.title" />
            </div>
            <h4 class="bundle-title">{{ product.title }}</h4>
            <div class="bundle-price-row">
              <span class="bundle-price">{{ product.price }}TL</span>
              <span class="bundle-old-price">{{ product.oldPrice }}TL</span>
            </div>
            <div class="bundle-meta">
              <span class="bundle-rating">★ {{ product.rating }}</span>
              <span class="bundle-sold">{{ product.sold }}+ satıldı</span>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- SÜPER FIRSATLAR KARTI -->
      <div class="deal-card super-card">
        <div class="card-header">
          <h3 class="card-title">Süper Fırsatlar</h3>
          <div class="timer-badge">
            <DealTimer />
          </div>
        </div>
        
        <!-- SLIDER -->
        <div class="slider-container">
          <button class="slider-btn prev-btn" @click="prevSlide" :disabled="maxIndex === 0">
            ‹
          </button>
          
          <div class="deal-grid">
            <DealProductCard 
              v-for="product in visibleDealProducts" 
              :key="product.id"
              :id="product.id"
              :title="product.title"
              :price="product.price"
              :old-price="product.oldPrice"
              :discount="product.discount"
              :image="product.img"
            />
          </div>
          
          <button class="slider-btn next-btn" @click="nextSlide" :disabled="maxIndex === 0">
            ›
          </button>
        </div>
        
        <!-- Slider pozisyon göstergesi -->
        <div class="slider-indicator" v-if="maxIndex > 0">
          <span>{{ currentIndex + 1 }} / {{ maxIndex + 1 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.super-deals-wrapper {
  max-width: 1600px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: 'Inter', sans-serif;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 24px;
  color: #191919;
}

.deals-row {
  display: flex;
  gap: 20px;
}

/* KART GENEL STİLİ */
.deal-card {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 20px;
  flex: 1;
}

.card-header {
  margin-bottom: 16px;
  text-align: center;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  color: #191919;
  margin: 0 0 12px 0;
}

/* PAKET TEKLİFLER */
.bundle-card {
  flex: 1;
}

.card-subtitle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #ff6b35, #ff4444);
  color: white;
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card-subtitle:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
}

.subtitle-icon {
  font-size: 14px;
}

.arrow {
  font-size: 16px;
  font-weight: bold;
}

.bundle-products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.bundle-product {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s, transform 0.2s;
}

.bundle-product:hover {
  background-color: #f9f9f9;
  transform: translateY(-2px);
}

.bundle-image {
  width: 100%;
  height: 140px;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.bundle-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.bundle-title {
  font-size: 13px;
  color: #333;
  margin: 0 0 6px 0;
  font-weight: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 36px;
}

.bundle-price-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 4px;
}

.bundle-price {
  font-weight: bold;
  font-size: 15px;
  color: #191919;
}

.bundle-old-price {
  font-size: 12px;
  color: #999;
  text-decoration: line-through;
}

.bundle-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bundle-rating {
  font-size: 12px;
  color: #ff9500;
}

.bundle-sold {
  font-size: 11px;
  color: #999;
}

/* SÜPER FIRSATLAR */
.super-card {
  flex: 1;
  overflow: hidden;
}

.timer-badge {
  display: inline-flex;
  align-items: center;
}

/* SLIDER */
.slider-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.slider-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #e5e5e5;
  background: white;
  border-radius: 50%;
  font-size: 20px;
  color: #666;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 10;
  position: relative;
}

.slider-btn:hover:not(:disabled) {
  background: #f5f5f5;
  border-color: #ccc;
}

.slider-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.slider-wrapper {
  flex: 1;
  overflow: hidden;
}

.slider-track {
  display: flex;
  transition: transform 0.4s ease-in-out;
}

.slide {
  min-width: 100%;
  flex-shrink: 0;
}

.deal-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  flex: 1;
  overflow: hidden;
}

/* Slider Indicator */
.slider-indicator {
  text-align: center;
  margin-top: 12px;
  font-size: 13px;
  color: #999;
}

/* RESPONSİV */
@media (max-width: 1200px) {
  .deals-row {
    flex-direction: column;
  }
  
  .bundle-card,
  .super-card {
    flex: 1;
  }
  
  .deal-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .bundle-products {
    flex-direction: row;
    overflow-x: auto;
    gap: 12px;
    padding-bottom: 8px;
  }
  
  .bundle-product {
    flex-direction: column;
    min-width: 140px;
  }
  
  .bundle-image {
    width: 100%;
    height: 100px;
  }
  
  .deal-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>