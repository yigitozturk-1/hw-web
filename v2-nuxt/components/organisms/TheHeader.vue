<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useUserStore } from '~/stores/user';
import { useCartStore } from '~/stores/cart';
import { useUiStore } from '~/stores/ui';

// --- IMPORTS ---
import SearchBar from '../molecules/SearchBar.vue';
import HeaderActionItem from '../molecules/HeaderActionItem.vue';
import UserDropdown from '../molecules/UserDropdown.vue';
import CategoryDropdown from '../molecules/CategoryDropdown.vue';

import IconCart from '../atoms/icons/IconCart.vue';
import IconUser from '../atoms/icons/IconUser.vue';

const userStore = useUserStore();
const cartStore = useCartStore();
const uiStore = useUiStore();

// Kategoriler
const categories: string[] = ['Süper Fırsatlar', 'AliExpress Business', 'Ev Geliştirme', 'Takı ve Saatler', 'Otomotiv', 'Daha fazla ⌄'];

// --- STATE KONTROLLERİ ---
const isUserDropdownVisible = ref<boolean>(false);
const isCategoryMenuVisible = ref<boolean>(false);
const isScrolled = ref<boolean>(false);

const userName = computed(() => userStore.userName);
const cartCount = computed(() => cartStore.totalItems);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 100;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header class="site-header" :class="{ 'is-sticky': isScrolled }">
    
    <div class="top-row container">
      
      <RouterLink to="/" class="logo-link">
        <img src="/images/aliexpress-logo.png" alt="AliExpress" class="logo-img" />
      </RouterLink>

      <div class="search-area">
        <SearchBar />
      </div>

      <div class="actions-area">
        <HeaderActionItem title="Uygulamayı" subtitle="indirin">
           <template #icon>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="color: #333;">
               <path d="M17 1H7C5.9 1 5 1.9 5 3V21C5 22.1 5.9 23 7 23H17C18.1 23 19 22.1 19 21V3C19 1.9 18.1 1 17 1ZM17 21H7V3H17V21Z" fill="currentColor"/>
               <path d="M12 18H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
             </svg>
           </template>
        </HeaderActionItem>
        
        <HeaderActionItem title="" subtitle="TR/TRY">
           <template #icon>🇹🇷</template>
        </HeaderActionItem>

        <div 
          class="account-wrapper"
          @mouseenter="isUserDropdownVisible = true"
          @mouseleave="isUserDropdownVisible = false"
          @click="!userStore.isAuthenticated ? uiStore.toggleLoginModal() : null"
        >
          <HeaderActionItem :title="userStore.isAuthenticated ? 'Merhaba,' : 'Giriş Yap'" :subtitle="userStore.isAuthenticated ? userName : 'Hesap'">
             <template #icon>
               <IconUser />
             </template>
          </HeaderActionItem>
          
          <Transition name="fade">
            <div v-if="isUserDropdownVisible && userStore.isAuthenticated" class="dropdown-position">
              <UserDropdown />
            </div>
          </Transition>
        </div>
        <RouterLink to="/cart" class="action-link">
          <HeaderActionItem subtitle="Sepet" :badgeCount="cartCount">
             <template #icon>
               <IconCart />
             </template>
          </HeaderActionItem>
        </RouterLink>
      </div>
    </div>

    <div class="bottom-row container mega-menu-wrapper" v-show="!isScrolled">
      
      <div 
        class="category-btn-area"
        @mouseenter="isCategoryMenuVisible = true"
        @mouseleave="isCategoryMenuVisible = false"
      >
        <div class="all-categories-btn">
          <span class="burger-icon">☰</span> Tüm Kategoriler
        </div>
        
        <Transition name="fade">
          <div v-if="isCategoryMenuVisible" class="mega-menu-position">
            <CategoryDropdown />
          </div>
        </Transition>
      </div>
      
      <nav class="nav-links">
        <a 
          v-for="cat in categories" 
          :key="cat" 
          href="#"
          :class="{ 'highlight-red': cat === 'Süper Fırsatlar' }"
        >
          {{ cat }}
        </a>
      </nav>
    </div>

  </header>
  <!-- Placeholder to prevent content jump when header becomes fixed -->
  <div class="header-placeholder" v-if="isScrolled"></div>
</template>

<style scoped>
/* --- TEMEL YAPILANDIRMA --- */
.site-header {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e5e5e5;
  font-family: sans-serif;
  background-color: white;
  position: relative;
  z-index: 1000;
  transition: all 0.3s ease;
  width: 100%;
}

.site-header.is-sticky {
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  padding-bottom: 0; 
  /* is-sticky durumunda bottom-row gizleneceği için padding vs ayarlamaya gerek yok, v-show hallediyor */
}

.header-placeholder {
  height: 120px; /* Yaklaşık header yüksekliği */
}

.container {
  max-width: 1600px; /* 1400px -> 1600px for wider look */
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;
}

/* --- ÜST SATIR --- */
.top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0; /* 15px -> 10px */
  gap: 40px;
  transition: padding 0.3s;
}
.site-header.is-sticky .top-row {
    padding: 5px 0; /* Sticky iken daha da daralt */
}

.logo-link { text-decoration: none; display: flex; align-items: center; }
.logo-img { 
  height: 45px; /* 65px -> 45px (Daha kompakt) */
  width: auto;
  cursor: pointer;
  display: block;
  transition: height 0.3s;
}
.site-header.is-sticky .logo-img {
    height: 35px; /* Sticky iken daha küçük */
}

.search-area { flex-grow: 1; }
.actions-area { display: flex; gap: 24px; align-items: center; }
.action-link { text-decoration: none; color: inherit; }

/* --- ALT SATIR --- */
.bottom-row {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  gap: 30px;
  /* Animasyon için opsiyonel */
}
.mega-menu-wrapper {
  position: relative;
}
/* Kategori Butonu */
.category-btn-area {
  /* Buton alanı sadece */
  padding-bottom: 15px; /* Hover kopmasın diye */
  margin-bottom: -15px;
}

.all-categories-btn {
  background-color: #222;
  color: white;
  padding: 10px 24px;
  border-radius: 24px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s;
}
.all-categories-btn:hover { background-color: #000; }
.burger-icon { font-size: 16px; }

.mega-menu-position {
  position: absolute;
  top: 100%; /* Satırın hemen altına */
  left: 20px; /* Container padding'i kadar içerden başla */
  right: 20px; /* Container padding'i kadar içerden bitir */
  /* Genişliği otomatik olarak container kadar olacak (1400px - paddingler) */
  padding-top: 5px;
}

.nav-links { 
  display: flex; 
  gap: 20px; 
  overflow-x: auto; 
  flex-grow: 1; /* Fill remaining space */
  justify-content: space-between; /* Spread items out */
  margin-left: 40px; /* Space from the button */
  padding-right: 20px;
}
.nav-links a { 
  text-decoration: none; 
  color: #191919; 
  font-size: 14px; 
  font-weight: 500; 
  white-space: nowrap; 
}
.nav-links a:hover { color: #ff4747; }
.nav-links a.highlight-red {
  color: #ff4747;
  font-weight: 700;
}

/* Hesap Menüsü Kapsayıcısı */
.account-wrapper { 
  position: relative; 
  height: 100%; 
  display: flex; 
  align-items: center;
  /* Hover köprüsü oluşturmak için */
  padding-bottom: 20px;
  margin-bottom: -20px;
  cursor: pointer;
}
.dropdown-position { position: absolute; top: 100%; right: -50px; padding-top: 10px; }

/* Kategori Menüsü Kapsayıcısı */
.category-wrapper {
  position: relative;
  display: inline-block;
  /* Hover boşluğunu kapatmak için */
  padding-bottom: 20px; 
  margin-bottom: -20px;
}

.mega-menu-position {
  position: absolute;
  top: 100%; /* Butonun hemen altına */
  left: 0;
  padding-top: 5px;
}

/* --- ANİMASYONLAR --- */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-5px); }
</style>