<script setup>
import { ref } from 'vue';
import ImageGallery from '../molecules/ImageGallery.vue';
import ProductOptionSelector from '../molecules/ProductOptionSelector.vue';
import QuantitySelector from '../molecules/QuantitySelector.vue';
import BaseButton from '../atoms/BaseButton.vue'; 

import siyahImg from '@/assets/products/Siyah.jpg';
import kahveImg from '@/assets/products/Kahve.jpg';
import sariImg from '@/assets/products/Sari.jpg';

const productImages = [
kahveImg, // İlk açılışta kahverengi eldiven gözüksün
siyahImg,
sariImg,
];

// --- 3. RENK SEÇENEKLERİNİ AYARLAMA ---
const colorOptions = [
  { 
    label: 'Siyah', 
    value: 'Black', 
    img: siyahImg  // Import ettiğimiz değişkeni buraya veriyoruz
  },
  { 
    label: 'Kahve', 
    value: 'Brown', 
    img: kahveImg 
  },
  { 
    label: 'Sarı', 
    value: 'Yellow', 
    img: sariImg 
  }
];
const sizeOptions = [
  { label: 'M', value: 'M' },
  { label: 'L', value: 'L' },
  { label: 'XL', value: 'XL' },
  { label: 'XXL', value: 'XXL' }
];

// --- STATE ---
const selectedColor = ref('Brown'); // Varsayılan renk
const selectedSize = ref('L');
const quantity = ref(1);
</script>

<template>
  <div class="product-page-container">
    
    <div class="col-gallery">
      <ImageGallery :images="productImages" />
    </div>

    <div class="col-info">
      <h1 class="product-title">
        Vintage keçi deri motosiklet eldiveni erkekler kadınlar sert kabuk koruyucu
      </h1>
      <div class="sales-count">11 satıldı</div>

      <div class="price-block">
        <div class="super-friday-banner">
          Süper Cuma • İlk İndirim <span>Bitiş: 4 Aralık</span>
        </div>
        <div class="price-row">
          <span class="current-price">659,12TL</span>
          <span class="original-price">2.085,27TL</span>
          <span class="discount-tag">-68%</span>
        </div>
        <div class="tax-info">Vergiden önce gösterilen fiyat</div>
      </div>

      <ProductOptionSelector 
        title="Renk" 
        type="image" 
        :options="colorOptions" 
        v-model="selectedColor" 
      />
      
      <ProductOptionSelector 
        title="Boyut" 
        type="text" 
        :options="sizeOptions" 
        v-model="selectedSize" 
      />
    </div>

    <div class="col-buybox">
      <div class="seller-info">
        Satıcı: <strong>GP Motor Knight Store</strong>
      </div>

      <div class="shipping-info">
        <p><strong>Ücretsiz Sevkiyat</strong></p>
        <p class="delivery-date">Teslimat: Ara 02 - 09</p>
      </div>

      <div class="protection-info">
        <p>✔ Güvenlik ve gizlilik</p>
        <p>↺ İade ve Para İade Politikası</p>
      </div>

      <div class="qty-section">
        <span>Miktar</span>
        <QuantitySelector v-model="quantity" />
      </div>

      <div class="action-buttons">
        <BaseButton variant="primary" class="full-width-btn">
          Şimdi Satın Al
        </BaseButton>
        
        <BaseButton variant="outline" class="full-width-btn mt-2">
          Sepete ekleyin
        </BaseButton>
      </div>

      <div class="share-wishlist">
        <span>🔗 Paylaş</span>
        <span>❤️ 65</span>
      </div>
    </div>

  </div>
</template>

<style scoped>
.product-page-container {
  display: grid;
  /* Sol (Resim) - Orta (Bilgi) - Sağ (Kutu) */
  grid-template-columns: 400px 1fr 300px;
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
  background: white;
}

/* --- Orta Sütun Stilleri --- */
.product-title {
  font-size: 16px;
  color: #333;
  line-height: 1.4;
  margin-bottom: 10px;
}
.sales-count {
  font-size: 12px;
  color: #999;
  margin-bottom: 15px;
}

.price-block {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}
.super-friday-banner {
  background: linear-gradient(90deg, #000, #333);
  color: white;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 4px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
.price-row {
  display: flex;
  align-items: baseline;
  gap: 10px;
}
.current-price {
  font-size: 28px;
  font-weight: bold;
  color: #191919; /* Siyah fiyat (resimdeki gibi) */
}
.original-price {
  text-decoration: line-through;
  color: #999;
  font-size: 14px;
}
.discount-tag {
  color: #ff4747;
  font-weight: bold;
}
.tax-info {
  font-size: 11px;
  color: #999;
  margin-top: 5px;
}

/* --- Sağ Sütun Stilleri (Buy Box) --- */
.col-buybox {
  border: 1px solid #e5e5e5;
  padding: 20px;
  border-radius: 8px;
  height: fit-content;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
.seller-info {
  font-size: 13px;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}
.shipping-info {
  margin-bottom: 15px;
  font-size: 13px;
}
.delivery-date {
  color: #333;
  font-weight: bold;
}
.protection-info p {
  font-size: 12px;
  color: #666;
  margin: 5px 0;
}
.qty-section {
  margin-top: 20px;
  font-size: 14px;
  font-weight: bold;
}
.full-width-btn {
  width: 100%;
  display: flex;
  justify-content: center;
}
.mt-2 { margin-top: 10px; }

.share-wishlist {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
}

/* Responsive (Mobil) */
@media (max-width: 1024px) {
  .product-page-container {
    grid-template-columns: 1fr; /* Mobilde alt alta */
  }
}
</style>