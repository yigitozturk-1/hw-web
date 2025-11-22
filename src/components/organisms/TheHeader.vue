<script setup>
import { ref } from 'vue';
import SearchBar from '../molecules/SearchBar.vue';
import HeaderActionItem from '../molecules/HeaderActionItem.vue';
import IconCart from '../atoms/icons/IconCart.vue';
import IconUser from '../atoms/icons/IconUser.vue';
import UserDropdown from '../molecules/UserDropdown.vue';

// Kategoriler şimdilik bir dizi (Array)
const categories = ['Süper Fırsatlar', 'AliExpress Business', 'Ev Geliştirme', 'Takı ve Saatler'];
const isUserDropdownVisible = ref(false);
</script>

<template>
  <header class="site-header">
    <div class="top-row container">
      
      <div class="logo">AliExpress</div>

      <div class="search-area">
        <SearchBar />
      </div>

    <div class="actions-area">
        <HeaderActionItem title="AliExpress uygulamasını" subtitle="indirin">
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

        <HeaderActionItem subtitle="Sepet" :badgeCount="0">
           <template #icon>
             <IconCart />
           </template>
        </HeaderActionItem>
      </div>
    </div>

    <div class="bottom-row container">
      <div class="all-categories-btn">
        ☰ Tüm Kategoriler
      </div>
      
      <nav class="nav-links">
        <a v-for="cat in categories" :key="cat" href="#">
          {{ cat }}
        </a>
        <a href="#" class="more-link">Daha fazla ⌄</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e5e5e5;
  font-family: sans-serif;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
}

/* Üst Satır Dizilimi */
.top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  gap: 40px;
}

.logo {
  font-size: 28px;
  font-weight: bold;
  letter-spacing: -1px;
}

.search-area {
  flex-grow: 1; /* Boşluğu doldurur */
}

.actions-area {
  display: flex;
  gap: 24px;
}

/* Alt Satır Dizilimi */
.bottom-row {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  gap: 20px;
}

.all-categories-btn {
  background-color: #f5f5f5;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  text-decoration: none;
  color: #191919;
  font-size: 14px;
  font-weight: 500;
}

.nav-links a:hover {
  color: #ff4747;
}
.account-wrapper {
  position: relative; 
  height: 100%; /* Yükseklik sorunu olmaması için */
  display: flex;
  align-items: center;
}

/* Dropdown'ın Konumu: Absolute */
.dropdown-position {
  position: absolute;
  top: 100%; /* Kapsayıcının tam altına */
  right: -50px; /* Biraz sağa kaydırarak hizala */
  padding-top: 10px; /* Mouse aradaki boşlukta kaybolmasın diye görünmez dolgu */
}

/* --- Animasyon (Fade Effect) --- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px); /* Hafif yukarıdan aşağı gelsin */
}
</style>