<script setup lang="ts">
interface Props {
  subtotal?: number;
  discount?: number;
  total?: number;
  count?: number;
}

withDefaults(defineProps<Props>(), {
  subtotal: 0,
  discount: 0,
  total: 0,
  count: 0
});

const emit = defineEmits(['checkout']);
</script>

<template>
  <div class="summary-container">
    <h3 class="summary-title">Özet</h3>

    <div class="summary-content">
      <div class="row">
        <span class="label">Ürünlerin toplam fiyatı</span>
        <span class="value">{{ (subtotal + discount).toFixed(2) }}TL</span>
      </div>
      <div class="row discount">
        <span class="label">Ürün indirimi</span>
        <span class="value">- {{ discount.toFixed(2) }}TL</span>
      </div>
      <div class="row bold">
        <span class="label">Ara toplam</span>
        <span class="value">{{ subtotal.toFixed(2) }}TL</span>
      </div>
      <div class="row bold">
        <span class="label">Gönderim</span>
        <span class="value">Ücretsiz</span>
      </div>

      <div class="total-row">
        <span class="label">Hesaplanan toplam</span>
        <span class="value">{{ total.toFixed(2) }}TL</span>
      </div>

      <button class="btn-checkout" @click="emit('checkout')">
        Ödeme ({{ count }})
      </button>
      
      <div class="scarcity-text">
        ⌛ Neredeyse tükendi!
      </div>
    </div>

    <div class="payment-methods">
      <h4>Ödeme aracı</h4>
      <div class="payment-icons">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" class="p-icon" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" class="p-icon" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png" alt="PayPal" class="p-icon" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png" alt="Amex" class="p-icon" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/2560px-Apple_Pay_logo.svg.png" alt="Apple Pay" class="p-icon" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Pay_Logo_%282021%29.svg/512px-Google_Pay_Logo_%282021%29.svg.png" alt="Google Pay" class="p-icon" />
      </div>
    </div>

    <div class="buyer-protection">
      <h4>Alıcı koruması</h4>
      <div class="protection-content">
        <span class="check-icon">🛡️</span>
        <span class="protection-text">Ürünler açıklandığı gibi değilse veya gönderilmediyse paranız iade edilir.</span>
      </div>
    </div>

  </div>
</template>

<style scoped>
.summary-container {
  background: white;
  border-radius: 8px;
  padding: 24px;
}

.summary-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #000;
}

.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  color: #666;
}

.row.bold {
  color: #000;
  font-weight: 600;
}

.row.discount {
  color: #ff4747;
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 700;
  color: #000;
}

.btn-checkout {
  width: 100%;
  background-color: #ff004f; /* AliExpress Pinkish Red */
  color: white;
  border: none;
  padding: 15px;
  font-size: 18px;
  font-weight: 700;
  border-radius: 30px; /* Rounded pill shape */
  cursor: pointer;
  transition: opacity 0.2s;
}
.btn-checkout:hover {
  opacity: 0.9;
}

.scarcity-text {
  text-align: center;
  color: #ff004f;
  font-weight: 600;
  font-size: 13px;
  margin-top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.payment-methods {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}
.payment-methods h4 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
}
.payment-icons {
  display: flex;
  gap: 4px; /* Reduced gap */
  flex-wrap: nowrap;
  justify-content: flex-start; /* Aligned to start, removing big gaps */
}
.p-icon {
  height: 22px; /* Slightly taller */
  width: auto;
  max-width: none; /* Allow width to accommodate aspect ratio */
  object-fit: contain;
  background: white;
  padding: 2px 4px;
  border-radius: 2px;
  border: 1px solid #ddd;
}

.buyer-protection {
  margin-top: 20px;
}
.buyer-protection h4 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
}
.protection-content {
  display: flex;
  gap: 10px;
  background: #fcfcfc;
  padding: 10px;
  border-radius: 4px;
}
.check-icon {
  font-size: 18px;
}
.protection-text {
  font-size: 12px;
  line-height: 1.4;
  color: #333;
}
</style>