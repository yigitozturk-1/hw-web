<script setup>
import BaseButton from '../atoms/BaseButton.vue';

defineProps({
  subtotal: Number,
  discount: Number,
  total: Number,
  count: Number
});
</script>

<template>
  <div class="order-summary">
    <h3>Özet</h3>
    
    <div class="summary-row">
      <span>Ürünlerin toplam fiyatı</span>
      <span class="price-text">{{ subtotal.toFixed(2) }}TL</span>
    </div>
    
    <div class="summary-row discount">
      <span>Ürün indirimi</span>
      <span>- {{ discount.toFixed(2) }}TL</span>
    </div>
    
    <div class="divider"></div>

    <div class="summary-row total-row">
      <span>Hesaplanan toplam</span>
      <span class="total-price">{{ total.toFixed(2) }}TL</span>
    </div>

    <BaseButton variant="primary" class="checkout-btn">
      Ödeme ({{ count }})
    </BaseButton>

    <div class="buyer-protection">
      <div class="icon">🛡️</div>
      <div class="text">
        <strong>Alıcı koruması</strong>
        <p>Ürünler açıklandığı gibi değilse para iadesi.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-summary {
  background: white;
  padding: 20px;
  border-radius: 8px;
  /* Sayfa kaydırılsa bile sağda sabit kalsın */
  position: sticky; 
  top: 20px; 
}

h3 {
  margin-top: 0;
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 14px;
  color: #333;
}

.discount {
  color: #ff4747;
}

.divider {
  height: 1px;
  background: #eee;
  margin: 15px 0;
}

.total-row {
  font-weight: bold;
  font-size: 18px;
  margin-top: 20px;
}

.checkout-btn {
  width: 100%;
  margin-top: 15px;
  padding: 12px;
  font-size: 18px;
}

.buyer-protection {
  margin-top: 30px;
  background: #f9f9f9;
  padding: 15px;
  border-radius: 4px;
  display: flex;
  gap: 10px;
}
.buyer-protection p {
  font-size: 11px;
  color: #666;
  margin: 5px 0 0 0;
}
</style>