<script setup>
import { ref } from 'vue';

// --- IMPORTS ---
// Moleküller
import SearchBar from '../molecules/SearchBar.vue';
import HeaderActionItem from '../molecules/HeaderActionItem.vue';
import UserDropdown from '../molecules/UserDropdown.vue';
import CategoryDropdown from '../molecules/CategoryDropdown.vue';

// İkon Atomları (Önceki adımlarda oluşturduk)
import IconCart from '../atoms/icons/IconCart.vue';
import IconUser from '../atoms/icons/IconUser.vue';

// Kategoriler (Menü linkleri)
const categories = ['Süper Fırsatlar', 'AliExpress Business', 'Ev Geliştirme', 'Takı ve Saatler', 'Otomotiv', 'Daha fazla ⌄'];

// --- STATE KONTROLLERİ ---
const isUserDropdownVisible = ref(false);
const isCategoryMenuVisible = ref(false);
</script>

<template>
  <header class="site-header">
    
    <div class="top-row container">
      
      <div class="logo">AliExpress</div>

      <div class="search-area">
        <SearchBar />
      </div>

      <div class="actions-area">
        <HeaderActionItem title="Uygulamayı" subtitle="indirin">
           <template #icon>📱</template>
        </HeaderActionItem>
        
        <HeaderActionItem title="" subtitle="TR/TRY">
           <template #icon>🇹🇷</template>
        </HeaderActionItem>

        <div 
          class="account-wrapper"
          @mouseenter="isUserDropdownVisible = true"
          @mouseleave="isUserDropdownVisible = false"
        >
          <HeaderActionItem title="Merhaba," subtitle="Hesap">
             <template #icon>
               <IconUser />
             </template>
          </HeaderActionItem>
          
          <Transition name="fade">
            <div v-if="isUserDropdownVisible" class="dropdown-position">
              <UserDropdown />
            </div>
          </Transition>
        </div>
        <HeaderActionItem subtitle="Sepet" :badgeCount="1">
           <template #icon>
             <IconCart />
           </template>
        </HeaderActionItem>
      </div>
    </div>

    <div class="bottom-row container">
      
      <div 
        class="category-wrapper"
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
        <a v-for="cat in categories" :key="cat" href="#">
          {{ cat }}
        </a>
      </nav>
    </div>

  </header>
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
}

.container {
  max-width: 1400px;
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
  padding: 15px 0;
  gap: 40px;
}

.logo {
  font-size: 28px;
  font-weight: 900;
  letter-spacing: -1px;
  color: #000;
  cursor: pointer;
}

.search-area {
  flex-grow: 1;
}

.actions-area {
  display: flex;
  gap: 24px;
  align-items: center;
}

/* --- ALT SATIR --- */
.bottom-row {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  gap: 30px;
}

/* Kategori Butonu */
.all-categories-btn {
  background-color: #222; /* Siyah/Koyu Gri buton */
  color: white; /* Beyaz yazı */
  padding: 10px 20px;
  border-radius: 24px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s;
}
.all-categories-btn:hover {
  background-color: #000;
}
.burger-icon { font-size: 16px; }

.nav-links {
  display: flex;
  gap: 25px;
  overflow-x: auto; /* Ekran küçülürse kaydırma */
}

.nav-links a {
  text-decoration: none;
  color: #191919;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
}
.nav-links a:hover {
  color: #ff4747;
}

/* --- DROPDOWN POZİSYONLAMA (ÖNEMLİ) --- */

/* Hesap Menüsü Kapsayıcısı */
.account-wrapper {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}

.dropdown-position {
  position: absolute;
  top: 100%;
  right: -50px;
  padding-top: 10px;
}

/* Kategori Menüsü Kapsayıcısı */
.category-wrapper {
  position: relative;
  display: inline-block;
  /* Hover boşluğunu kapatmak için */
  padding-bottom: 15px; 
  margin-bottom: -15px;
}

.mega-menu-position {
  position: absolute;
  top: 100%; /* Butonun hemen altına */
  left: 0;
  padding-top: 5px;
}

/* --- ANİMASYONLAR --- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>