<script setup lang="ts">
import UserMenuLink from '../atoms/UserMenuLink.vue';
import { useUserStore } from '~/stores/user';

const userStore = useUserStore();

// Logout handler
const handleLogout = async () => {
  await userStore.logout();
  // Optional: Redirect or refresh
  // window.location.reload(); 
};

// Main Menu Items with Links
interface MenuItem {
  text: string;
  icon?: string;
  link?: string;
}

const mainMenuItems: MenuItem[] = [
  { text: 'Siparişlerim', icon: '📦', link: '/account/orders' },
  { text: 'Jetonlarım', icon: '🪙' },
  { text: 'Mesaj Merkezi', icon: '💬' },
  { text: 'Ödeme', icon: '💳' },
  { text: 'İstek Listesi', icon: '❤️' },
  { text: 'Kuponlarım', icon: '🎟️' },
];

// Alt kısımdaki düz yazı menüsü
const textMenuItems: string[] = [
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
      <div class="avatar-circle">
        <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
      </div>
      <div class="user-info">
        <div class="welcome-text">Tekrar hoşgeldiniz,</div>
        <div class="username">{{ userStore.userName }}</div>
        <a href="#" class="sign-out" @click.prevent="handleLogout">Çıkış Yap</a>
      </div>
    </div>

    <hr class="divider" />

    <div class="menu-list main-menu">
      <UserMenuLink 
        v-for="item in mainMenuItems" 
        :key="item.text" 
        :text="item.text" 
        :icon="item.icon"
        :to="item.link"
      />
    </div>

    <hr class="divider" />

    <div class="menu-list secondary-menu">
      <UserMenuLink 
        v-for="item in textMenuItems" 
        :key="item" 
        :text="item" 
        class="text-menu-item"
      />
    </div>
  </div>
</template>

<style scoped>
.dropdown-container {
  width: 300px;
  background: #fff; /* Solid white */
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  padding: 0; /* Remove padding, use internal padding */
  z-index: 9999; /* High z-index */
  border: 1px solid #eee;
  position: relative; /* Ensure stacking context */
  overflow: hidden; /* Clip content to bounds */
}

/* Header Kısmı */
.user-header {
  display: flex;
  padding: 20px;
  gap: 12px;
  align-items: flex-start;
  background-color: #fff; /* Solid white */
  border-bottom: 1px solid #f5f5f5;
}

.avatar-circle {
  width: 48px;
  height: 48px;
  background: #999; /* Gray */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
  font-weight: 700;
  flex-shrink: 0;
}

.user-info {
  display: flex;
  flex-direction: column;
  font-size: 13px;
  margin-top: 2px;
}

.welcome-text { color: #333; font-size: 13px; }
.username { font-weight: 700; color: #000; margin: 2px 0; font-size: 14px; }
.sign-out { color: #ff4747; text-decoration: none; font-size: 12px; margin-top: 4px; }
.sign-out:hover { text-decoration: underline; }

.divider {
  border: none;
  border-top: 1px solid #f0f0f0;
  margin: 0;
}

.menu-list {
  display: flex;
  flex-direction: column;
  background: #fff; /* Solid white */
  padding: 10px 0;
}

.main-menu .menu-item-link, 
.main-menu .menu-item {
  padding: 12px 20px;
}

.secondary-menu {
  border-top: 1px solid #f0f0f0;
}

.secondary-menu .text-menu-item {
   padding: 10px 20px;
   font-size: 13px;
   color: #333;
}
</style>