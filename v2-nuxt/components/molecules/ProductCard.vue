<script setup lang="ts">
import type { IProduct } from '@/types';

defineProps<{
  product: IProduct
}>();
</script>

<template>
  <NuxtLink :to="`/product/${product.id}`" class="product-card">
    <div class="image-wrapper">
      <img :src="product.images?.length ? product.images[0] : product.image" :alt="product.title" />
      
      <button class="cart-btn" @click.prevent="$emit('add-to-cart')">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
      </button>
    </div>

    <div class="info-wrapper">
      <h3 class="title" :title="product.title">{{ product.title }}</h3>
      
      <div class="price">{{ product.price }}TL</div>
      
      <div class="rating">
        ★★★★☆ <span class="rating-score">{{ product.rating }}</span>
      </div>

      <div class="discount-text">
        <span>%</span> {{ product.discountText }}
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.product-card {
  background: white;
  border: 1px solid #eee; /* İnce gri çerçeve */
  border-radius: 0; /* Sivri köşeler */
  overflow: hidden;
  transition: transform 0.2s;
  height: 100%; /* Slider içinde boyu tam kaplasın */
  cursor: pointer;
  text-decoration: none;
  display: block;
  color: inherit;
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 180px;
  background: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-wrapper img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* Yuvarlak Sepet Butonu */
.cart-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.cart-btn:hover {
  border-color: #000;
}

.info-wrapper {
  padding: 10px;
}

.title {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #333;
  margin: 0 0 8px 0;
  /* Çok uzun başlıkları ... ile kesmek için */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.price {
  font-size: 18px;
  font-weight: bold;
  color: #191919;
  margin-bottom: 4px;
}

.rating {
  font-size: 12px;
  color: #333;
  margin-bottom: 5px;
}
.rating-score {
  color: #999;
  font-size: 11px;
}

.discount-text {
  color: #ff4747;
  font-size: 11px;
  font-weight: bold;
  background: #ffecec;
  display: inline-block;
  padding: 2px 4px;
  border-radius: 2px;
}
</style>