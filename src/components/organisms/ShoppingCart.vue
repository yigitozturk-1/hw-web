<script setup>
import { ref, computed } from 'vue';
import BaseCheckbox from '../atoms/BaseCheckbox.vue';
import CartItem from '../molecules/CartItem.vue';
import OrderSummary from './OrderSummary.vue';

// Resim Importu (Siz kendi resim yolunuzu kullanın)
import gloveImg from '@/assets/products/Kahve.jpg';

// --- MOCK DATA (Sepet Verisi) ---
const cartItems = ref([
  {
    id: 1,
    name: 'Vintage keçi deri motosiklet eldiveni erkekler kadınlar sert kabuk',
    variant: 'ERG-06 Brown/L',
    price: 1140.71,
    originalPrice: 3386.83,
    image: gloveImg,
    quantity: 1,
    selected: true
  }
]);

const allSelected = ref(true);

// --- COMPUTED (Hesaplamalar) ---
const subtotal = computed(() => {
  return cartItems.value.reduce((acc, item) => item.selected ? acc + (item.originalPrice * item.quantity) : acc, 0);
});

const total = computed(() => {
  return cartItems.value.reduce((acc, item) => item.selected ? acc + (item.price * item.quantity) : acc, 0);
});

const discount = computed(() => subtotal.value - total.value);

const selectedCount = computed(() => cartItems.value.filter(i => i.selected).length);

// --- METHODS ---
const toggleSelectAll = (val) => {
  allSelected.value = val;
  cartItems.value.forEach(item => item.selected = val);
};

const removeItem = (id) => {
  cartItems.value = cartItems.value.filter(item => item.id !== id);
};
</script>

<template>
  <div class="cart-page-container">
    
    <div class="cart-list-section">
      <h2 class="page-title">Alışveriş Sepeti ({{ cartItems.length }})</h2>
      
      <div class="cart-header">
        <BaseCheckbox 
          :modelValue="allSelected" 
          label="Tüm ürünleri seç"
          @update:modelValue="toggleSelectAll"
        />
        <button class="delete-selected-btn">Seçili ürünleri sil</button>
      </div>

      <div class="super-friday-banner">
        <span>Süper Cuma</span> Bitiş: 4 Aralık 10:59 (GMT+3)
      </div>

      <div class="seller-header">
        <BaseCheckbox :modelValue="allSelected" />
        <span class="seller-name">Küresel satıcılar tarafından gönderilir</span>
      </div>

      <div class="items-wrapper">
        <CartItem 
          v-for="item in cartItems" 
          :key="item.id"
          :item="item"
          :isSelected="item.selected"
          @toggle-select="item.selected = !item.selected"
          @update-quantity="(val) => item.quantity = val"
          @remove="removeItem(item.id)"
        />
      </div>
    </div>

    <div class="cart-summary-section">
      <OrderSummary 
        :subtotal="subtotal"
        :discount="discount"
        :total="total"
        :count="selectedCount"
      />
    </div>

  </div>
</template>

<style scoped>
.cart-page-container {
  display: grid;
  grid-template-columns: 2fr 1fr; /* Sol 2 birim, Sağ 1 birim */
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
  align-items: start;
}

.page-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.cart-header {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.delete-selected-btn {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-weight: bold;
}

.super-friday-banner {
  background: #ff004f; /* Görseldeki pembe/kırmızı ton */
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
  font-weight: bold;
  margin-bottom: 20px;
}

.seller-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  margin-bottom: 15px;
}

.cart-list-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
}

/* Mobil Uyumluluk */
@media (max-width: 768px) {
  .cart-page-container {
    grid-template-columns: 1fr; /* Mobilde alt alta */
  }
}
</style>