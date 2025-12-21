<script setup lang="ts">
import { ref, computed } from 'vue';
import BaseCheckbox from '../atoms/BaseCheckbox.vue';
import CartItem from '../molecules/CartItem.vue';
import OrderSummary from './OrderSummary.vue';
import { useCartStore } from '~/stores/cart';
import type { ICartItem } from '@/types';

const cartStore = useCartStore();

// Local selected state handling could be here, or in store. 
// For now, let's assume CartStore handles items. However, selection might be UI state.
// We will simply map store items. For checkbox toggle, we need to update store item or local logic.
// Simpler: Let's assume store has `isSelected` logic or we modify it.
// Actually, types ICartItem has `isSelected?: boolean`. We should update store actions for selection.

const allSelected = ref<boolean>(true);

// --- COMPUTED ---
const cartItems = computed(() => cartStore.items);

const subtotal = computed<number>(() => cartStore.totalPrice);
const total = computed<number>(() => subtotal.value); // Discount logic to be added
const discount = computed<number>(() => 0); // Placeholder
const selectedCount = computed<number>(() => cartStore.totalItems);

// --- METHODS ---
const toggleSelectAll = (val: boolean) => {
  allSelected.value = val;
  // TODO: Implement select all in store or loop (Note: mutating store state directly is okay in Pinia, but actions pref)
  cartStore.items.forEach(item => item.isSelected = val);
};

const removeItem = (id: number | string) => {
  cartStore.removeFromCart(id);
};

const updateQuantity = (id: number | string, qty: number) => {
  cartStore.updateQuantity(id, qty);
};

import { useRouter } from 'vue-router';
const router = useRouter();

const handleCheckout = async () => {
    if (cartStore.items.length === 0) {
        alert("Sepetiniz boş!");
        return;
    }
    const success = await cartStore.checkout();
    if (success) {
        alert("Siparişiniz başarıyla alındı!");
        router.push('/account/orders');
    } else {
        alert("Sipariş oluşturulurken bir hata oluştu.");
    }
};
</script>

<template>
  <div class="page-bg-wrapper">
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
              :isSelected="item.isSelected"
              @toggle-select="item.isSelected = !item.isSelected"
              @update-quantity="(val) => updateQuantity(item.id, val)"
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
            @checkout="handleCheckout"
          />
        </div>

      </div>
  </div>
</template>

<style scoped>
.cart-page-container {
  display: grid;
  grid-template-columns: 2fr 1fr; /* Sol 2 birim, Sağ 1 birim */
  gap: 30px;
  max-width: 1400px; /* Biraz daha geniş */
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Inter', sans-serif;
  align-items: start;
  min-height: 100vh;
}

/* Background should technically be on the parent or body, but we can fake it here or in layout.
   Better: wrap the content in a wider div if we want full bleed gray, 
   but for now let's assume the layout handles the full width, we just ensure this container sits on gray?
   Actually, the best way in Nuxt page is to set a wrapper class that fills the screen.
*/
.page-bg-wrapper {
    background-color: #f2f2f2; /* AliExpress Light Gray */
    min-height: 100vh;
    padding-bottom: 50px;
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
  background: #0077ff; /* Blue banner per screenshot */
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-weight: 700;
  margin-bottom: 15px;
  font-size: 14px;
}

.seller-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 10px;
  color: #333;
}

.cart-list-section {
  background: white;
  padding: 15px 20px; /* Reduces vertical padding */
  border-radius: 8px;
}

.checkout-actions {
    margin-top: 15px;
}
.btn-checkout {
    width: 100%;
    background-color: #ff4747;
    color: white;
    border: none;
    padding: 15px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
}
.btn-checkout:hover {
    background-color: #e63939;
}

/* Mobil Uyumluluk */
@media (max-width: 768px) {
  .cart-page-container {
    grid-template-columns: 1fr; /* Mobilde alt alta */
  }
}
</style>