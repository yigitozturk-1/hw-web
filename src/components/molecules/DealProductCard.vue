<script setup>
defineProps({
  image: String,
  title: String,
  price: String,
  oldPrice: String,
  discount: String // Örn: "-75%"
});
</script>

<template>
  <div class="deal-card">
    <div class="image-box">
      <img :src="image" :alt="title" />
    </div>
    
    <div class="info-box">
      <h4 class="title">{{ title }}</h4>
      
      <div class="price-row">
        <span class="current-price">{{ price }}TL</span>
        <span class="old-price">{{ oldPrice }}TL</span>
      </div>
      
      <div class="discount-tag">
        {{ discount }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.deal-card {
  width: 100%;
  cursor: pointer;
  transition: transform 0.2s;
}
.deal-card:hover {
  transform: translateY(-2px); /* Hafif yukarı kalkma efekti */
}

.image-box {
  background-color: #f5f5f5;
  height: 160px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.image-box img {
  max-width: 100%;
  max-height: 100%;
  mix-blend-mode: multiply; /* Beyaz arka planı temizlemek için */
}

.title {
  font-size: 13px;
  color: #333;
  margin: 0 0 8px 0;
  /* 2 satırda kesme işlemi (clamp) */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: normal;
  height: 36px; /* Başlıklar hizalı dursun */
}

.price-row {
  display: flex;
  align-items: baseline;
  gap: 5px;
  margin-bottom: 5px;
}

.current-price {
  font-weight: bold;
  font-size: 16px;
  color: #191919;
}

.old-price {
  font-size: 12px;
  text-decoration: line-through;
  color: #999;
}

.discount-tag {
  display: inline-block;
  background-color: #ff4747;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 4px;
}
</style>