<script setup>
import BaseCheckbox from '../atoms/BaseCheckbox.vue';
import QuantitySelector from './QuantitySelector.vue'; // Mevcut bileşen

defineProps({
  item: Object,       // Ürün verisi
  isSelected: Boolean // Seçili mi?
});

const emit = defineEmits(['toggle-select', 'update-quantity', 'remove']);
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
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  gap: 15px;
}

.product-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.item-content {
  flex-grow: 1;
  display: flex;
  gap: 15px;
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
}

.product-name {
  font-size: 13px;
  color: #333;
  margin: 0 10px;
  line-height: 1.4;
  flex-grow: 1;
}

.brand-tag {
  background: black;
  color: white;
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 2px;
  white-space: nowrap;
}

.variant-info {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}

.price-qty-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.current-price {
  color: #ff4747;
  font-weight: bold;
  font-size: 16px;
  margin-right: 5px;
}
.old-price {
  text-decoration: line-through;
  color: #999;
  font-size: 12px;
}

.shipping-msg {
  font-size: 11px;
  color: #666;
  margin-top: 5px;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}
</style>