<script setup>
import DealTimer from '../atoms/DealTimer.vue';
import BaseButton from '../atoms/BaseButton.vue';
import DealProductCard from '../molecules/DealProductCard.vue';

// Resimleri import ediyoruz (Daha önce oluşturduğunuz klasörden)
import img1 from '@/assets/urun_slider/urun1.jpg';
import img2 from '@/assets/urun_slider/urun2.jpg';
import img3 from '@/assets/urun_slider/urun3.jpg';
import img4 from '@/assets/urun_slider/urun4.jpg';

// Ürün Verileri
const dealProducts = [
  { id: 1, title: 'KBEAR 16 Çekirdekli Saf Bakır Kulaklık...', price: '316,88', oldPrice: '1.300,86', discount: '-75%', img: img1 },
  { id: 2, title: 'SUOMY Yaz Delikli motosiklet eldiveni', price: '771,87', oldPrice: '1.922,36', discount: '-59%', img: img2 },
  { id: 3, title: 'TRN Tx T2 PRO fiş değiştirilebilir ses', price: '223,90', oldPrice: '647,88', discount: '-65%', img: img3 },
  { id: 4, title: 'KBEAR ST19 4 çekirdekli Kulaklık T...', price: '643,07', oldPrice: '1.427,51', discount: '-54%', img: img4 },
];
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
  max-width: 1400px;
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