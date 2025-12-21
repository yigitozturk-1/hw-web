<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import ProductCard from '../molecules/ProductCard.vue';

// CSS Importları
import 'swiper/css';
import 'swiper/css/navigation'; // Oklar için gerekli

// Modüller
import { Navigation } from 'swiper/modules';

// RESİM IMPORTLARI (Lütfen dosya isimlerinin doğruluğundan emin olun)
import img1 from '@/assets/urun_slider/urun1.jpg';
import img2 from '@/assets/urun_slider/urun2.jpg';
import img3 from '@/assets/urun_slider/urun3.jpg';
import img4 from '@/assets/urun_slider/urun4.jpg';
import img5 from '@/assets/urun_slider/urun5.jpg';

// --- ÜRÜN VERİLERİ (Mock Data) ---
// Görseldeki 5 ürünü simüle ediyoruz
const products = [
  { id: 1, title: "TANGZU Wan'er S.G HiFi", price: "851,55", rating: "4.6", discountText: "809,29TL için 134", extraDrop: "67,44", image: img1 },
  { id: 2, title: "CHU II Dinamik Kulaklık", price: "780,07", rating: "4.9", discountText: "449,6TL için 89,9", extraDrop: "279,2", image: img2 },
  { id: 3, title: "SUOMY Deri Eldiven", price: "771,87", rating: "5.0", discountText: "449,6TL için 89,9", extraDrop: "1.150,49", image: img3 },
  { id: 4, title: "Vintage Pilot Gözlüğü", price: "227,75", rating: "4.4", discountText: "449,6TL için 89,9", extraDrop: "691,52", image: img4 },
  { id: 5, title: "16Core Bakır Kablo", price: "316,88", rating: "4.8", discountText: "449,6TL için 89,9", extraDrop: "983,98", image: img5 },
  // Slider dolu görünsün diye aynı ürünleri tekrar ekliyorum (Opsiyonel)
  { id: 6, title: "Yedek TANGZU Kulaklık", price: "851,55", rating: "4.6", discountText: "809,29TL için 134", extraDrop: "67,44", image: img1 },
];

const modules = [Navigation];

</script>

<template>
  <div class="related-products-container">
    <h2 class="section-title">İlgili ürünler</h2>
    
    <div class="slider-wrapper">
      <swiper
        :modules="modules"
        :space-between="15" 
        :navigation="true"
        :breakpoints="{
          320: { slidesPerView: 2, spaceBetween: 10 },   /* Mobil: 2 ürün */
          768: { slidesPerView: 3, spaceBetween: 15 },   /* Tablet: 3 ürün */
          1024: { slidesPerView: 5, spaceBetween: 20 }   /* Masaüstü: 5 ürün (Görseldeki gibi) */
        }"
        class="products-swiper"
      >
        <swiper-slide v-for="prod in products" :key="prod.id">
          <ProductCard :product="prod" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style scoped>
.related-products-container {
  max-width: 1400px;
  margin: 40px auto; /* Üstten alttan boşluk */
  padding: 0 20px;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  color: #191919;
  margin-bottom: 20px;
}

.slider-wrapper {
  position: relative;
}

.products-swiper {
  padding: 10px 5px; /* Gölgeler kesilmesin diye iç boşluk */
}

/* --- Navigation Oklarını Özelleştirme (Gri Yuvarlaklar) --- */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  background-color: rgba(0, 0, 0, 0.2); /* Yarı saydam gri */
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white; /* Ok rengi */
  border-radius: 0 10px 10px 0; /* Görseldeki gibi yarım dairemsi stil için */
}

/* Görseldeki stile daha yakın olması için (İsteğe bağlı) */
:deep(.swiper-button-prev) {
  left: 0;
  border-radius: 0 20px 20px 0;
}
:deep(.swiper-button-next) {
  right: 0;
  border-radius: 20px 0 0 20px;
}

:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
  font-size: 16px;
  font-weight: bold;
}

:deep(.swiper-button-disabled) {
  opacity: 0; /* Sona gelince ok kaybolsun */
}
</style>