<script setup lang="ts">
import BaseCheckbox from '../atoms/BaseCheckbox.vue';
import QuantitySelector from './QuantitySelector.vue';
import type { ICartItem } from '@/types';

defineProps<{
  item: ICartItem;
  isSelected?: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggle-select'): void;
  (e: 'update-quantity', val: number): void;
  (e: 'remove'): void;
}>();
</script>

<template>
  <div class="cart-item">
    <div class="item-select">
      <BaseCheckbox 
        :modelValue="isSelected" 
        @update:modelValue="emit('toggle-select')"
      />
    </div>

    <div class="item-content">
      <img :src="item.image" class="product-img" />
      
      <div class="item-details">
        <div class="top-row">
          <span class="brand-tag">Süper Cuma</span>
          <h3 class="product-name">{{ item.name }}</h3>
          <div class="icons">
             <button @click="emit('remove')" class="icon-btn">🗑️</button>
          </div>
        </div>

        <p class="variant-info">{{ item.variant }}</p>
        
        <div class="price-qty-row">
          <div class="prices">
            <span class="current-price">{{ item.price }}TL</span>
            <span class="old-price">{{ item.originalPrice }}TL</span>
          </div>
          
          <QuantitySelector 
            :modelValue="item.quantity" 
            @update:modelValue="(val) => emit('update-quantity', val)"
          />
        </div>

        <div class="shipping-msg">Ücretsiz sevkiyat</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-item {
  display: flex;
  padding: 12px 0; /* Reduced from 20px */
  border-bottom: 1px solid #eee;
  gap: 12px;
}

.product-img {
  width: 80px; /* Reduced from 100px */
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.item-content {
  flex-grow: 1;
  display: flex;
  gap: 12px;
  min-width: 0; /* Prevent flex blowout */
}

.item-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
}

.product-name {
  font-size: 13px;
  color: #333;
  margin: 0 8px;
  line-height: 1.3;
  flex-grow: 1;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2; /* Limit text lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.brand-tag {
  background: #ff4747; /* Match Ali red */
  color: white;
  font-size: 10px;
  padding: 1px 4px;
  border-radius: 2px;
  white-space: nowrap;
  font-weight: bold;
}

.variant-info {
  font-size: 11px;
  color: #999;
  margin-bottom: 4px;
}

.price-qty-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: auto;
}

.prices {
    display: flex;
    flex-direction: column;
}

.current-price {
  color: #ff4747;
  font-weight: 800;
  font-size: 15px;
}
.old-price {
  text-decoration: line-through;
  color: #999;
  font-size: 11px;
}

.shipping-msg {
  font-size: 10px;
  color: #666;
  margin-top: 2px;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  color: #666;
}
</style>