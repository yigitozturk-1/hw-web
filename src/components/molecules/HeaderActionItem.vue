<script setup>
defineProps({
  title: String,      // Örn: "Giriş Yap"
  subtitle: String,   // Örn: "Hesap"
  badgeCount: Number, // Sepetteki '0' sayısı için
  iconName: String    // İkon adı (İlerde dinamik yapacağız)
});
</script>

<template>
  <div class="action-item">
    <div class="icon-area">
      <slot name="icon">
        <span class="temp-icon">👤</span> </slot>
      
      <span v-if="badgeCount !== undefined" class="badge">
        {{ badgeCount }}
      </span>
    </div>

    <div class="text-area">
      <span class="title" v-if="title">{{ title }}</span>
      <span class="subtitle">{{ subtitle }}</span>
    </div>
  </div>
</template>

<style scoped>
.action-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #191919;
}

.icon-area {
  position: relative;
  font-size: 24px;
}

.badge {
  position: absolute;
  top: -5px;
  right: -8px;
  background-color: #ff4747; /* Kırmızı bildirim rengi */
  color: white;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
  font-weight: bold;
}

.text-area {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.title {
  font-size: 11px;
  color: #666;
}

.subtitle {
  font-size: 13px;
  font-weight: bold;
}
</style>