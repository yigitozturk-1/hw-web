<script setup>
// --- SWIPER İTHALATLARI (IMPORTS) ---
// Swiper'ın temel Vue bileşenleri
import { Swiper, SwiperSlide } from 'swiper/vue';

// Swiper'ın temel CSS dosyaları
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Kullanacağımız ekstra modüller (Noktalar ve Otomatik Oynatma)
import { Pagination, Autoplay } from 'swiper/modules';

// --- YEREL RESİM İTHALATLARI ---
// Vite/Webpack'in resimleri işlemesi için import ediyoruz
import slider1Img from '@/assets/sliders/slider1.jpg';
import slider2Img from '@/assets/sliders/slider2.jpg';
import slider3Img from '@/assets/sliders/slider3.jpg';

// --- SLIDE VERİLERİ ---
const slides = [
  { id: 1, img: slider1Img, alt: 'Süper Cuma İndirimleri Başladı' },
  { id: 2, img: slider2Img, alt: 'Akıllı Aksesuarlar' },
  { id: 3, img: slider3Img, alt: 'Efsane Kasım' }
];

// Swiper'a hangi modülleri kullanacağımızı söylüyoruz
const modules = [Pagination, Autoplay];

</script>

<template>
  <div class="hero-slider-wrapper">
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="0"
      :loop="true"
      :autoplay="{
        delay: 5000, /* 5 saniyede bir değişsin */
        disableOnInteraction: false /* Kullanıcı dokununca durmasın */
      }"
      :pagination="{ clickable: true }"
      class="my-hero-swiper"
    >
      <swiper-slide v-for="slide in slides" :key="slide.id">
        <a href="#" class="slide-link">
           <img :src="slide.img" :alt="slide.alt" class="slide-image" />
        </a>
      </swiper-slide>
      
    </swiper>
  </div>
</template>

<style scoped>
.hero-slider-wrapper {
  width: 100%;
  max-width: 1400px; /* Sitenin genel genişliğine uyum */
  margin: 20px auto; /* Üstten ve alttan biraz boşluk */
}

/* Swiper konteynerinin kendisine stil */
.my-hero-swiper {
  width: 100%;
  height: auto;
  border-radius: 12px; /* Köşeleri hafif yuvarlayalım */
  overflow: hidden;
}

.slide-link {
  display: block;
  width: 100%;
  height: 100%;
}

.slide-image {
  display: block;
  width: 100%;
  height: auto; /* Yükseklik otomatik ayarlansın */
  object-fit: cover; /* Resmi alana doldur */
}

/* --- SWIPER NOKTALARINI ÖZELLEŞTİRME (CSS HACK) --- */
/* :deep() kullanıyoruz çünkü bu stiller Swiper'ın kendi içindeki elemanlara uygulanacak */
:deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background: white; /* Pasif noktalar beyaz */
  opacity: 0.6;
}

:deep(.swiper-pagination-bullet-active) {
  background: #ff4747; /* Aktif nokta AliExpress kırmızısı */
  opacity: 1;
  width: 25px; /* Aktif olan biraz daha uzun */
  border-radius: 5px;
  transition: all 0.3s ease;
}
</style>