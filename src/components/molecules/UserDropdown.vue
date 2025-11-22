<script setup>
import UserMenuLink from '../atoms/UserMenuLink.vue';

// Üst kısımdaki ikonlu menü
const mainMenuItems = [
  { text: 'Siparişlerim', icon: '📦' },
  { text: 'Jetonlarım', icon: '🪙' },
  { text: 'Mesaj Merkezi', icon: '💬' },
  { text: 'Ödeme', icon: '💳' },
  { text: 'İstek Listesi', icon: '❤️' },
  { text: 'Kuponlarım', icon: '🎟️' },
];

// Alt kısımdaki düz yazı menüsü
const textMenuItems = [
  'Ayarlar',
  'AliExpress Business',
  'DS Center',
  'Satıcı girişi',
  'İade ve Para İade Politikası',
  'Yardım Merkezi',
  'Bir Şikayet Girin'
];
</script>

<template>
  <div class="dropdown-container">
    <div class="user-header">
      <div class="avatar-circle">👤</div>
      <div class="user-info">
        <div class="welcome-text">Tekrar hoşgeldiniz,</div>
        <div class="username">KULLANICI</div>
        <a href="#" class="sign-out">Çıkış Yap</a>
      </div>
    </div>

    <hr class="divider" />

    <div class="menu-list">
      <UserMenuLink 
        v-for="item in mainMenuItems" 
        :key="item.text" 
        :text="item.text" 
        :icon="item.icon" 
      />
    </div>

    <hr class="divider" />

    <div class="menu-list">
      <UserMenuLink 
        v-for="item in textMenuItems" 
        :key="item" 
        :text="item" 
      />
    </div>
  </div>
</template>

<style scoped>
.dropdown-container {
  width: 260px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15); /* Gölge efekti */
  padding: 10px 0;
  /* Header'ın üzerinde durması için z-index */
  z-index: 1000; 
  border: 1px solid #eee;
}

/* Header Kısmı */
.user-header {
  display: flex;
  padding: 10px 20px;
  gap: 10px;
}

.avatar-circle {
  width: 40px;
  height: 40px;
  background: #eee;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #aaa;
}

.user-info {
  display: flex;
  flex-direction: column;
  font-size: 12px;
}

.welcome-text { color: #666; }
.username { font-weight: bold; color: #000; margin: 2px 0; }
.sign-out { color: #007bff; text-decoration: none; }

.divider {
  border: none;
  border-top: 1px solid #f0f0f0;
  margin: 5px 0;
}

.menu-list {
  display: flex;
  flex-direction: column;
}
</style>