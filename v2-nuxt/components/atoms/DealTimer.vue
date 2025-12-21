<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// Başlangıç saati (Örnek: 10 saat)
const timeLeft = ref<number>(12 * 60 * 60); 
let timerInterval: ReturnType<typeof setInterval> | null = null;

// Saniyeyi Saat:Dakika:Saniye formatına çeviren fonksiyon
const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};

onMounted(() => {
  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timerInterval);
});
</script>

<template>
  <div class="deal-timer">
    <span class="icon">🕒</span> 
    <span class="text">Bitiş: {{ formatTime(timeLeft) }}</span>
  </div>
</template>

<style scoped>
.deal-timer {
  display: inline-flex;
  align-items: center;
  background-color: #ffecec; /* Açık pembe */
  color: #ff4747; /* Kırmızı yazı */
  padding: 8px 12px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
  gap: 6px;
}

.icon {
  font-size: 16px;
}
</style>