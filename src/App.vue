<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="showcase-layout">
    
    <aside class="sidebar">
      <div class="sidebar-header">
        <h3>🧩 Component Vitrini</h3>
      </div>
      
      <nav class="menu">
        <div class="menu-group">
          <span>Organizmalar</span>
          <RouterLink to="/header" class="menu-item">Header (Üst Menü)</RouterLink>
          <RouterLink to="/footer" class="menu-item">Footer (Alt Bilgi)</RouterLink>
          <RouterLink to="/login-modal" class="menu-item">Kayıt/Giriş Modalı</RouterLink>
          <RouterLink to="/product-detail" class="menu-item highlight-item">📦 Ürün Detay Sayfası</RouterLink>
          <RouterLink to="/cart" class="menu-item">🛒 Alışveriş Sepeti</RouterLink>
          <RouterLink to="/order-summary" class="menu-item">📄 Sipariş Özeti Tablosu</RouterLink>
          <RouterLink to="/hero-slider" class="menu-item highlight-item">🖼️ Ana Slider (Hero)</RouterLink>
          <RouterLink to="/related-products" class="menu-item highlight-item">🛍️ Ürün Slider (Carousel)</RouterLink>
          <RouterLink to="/super-deals" class="menu-item highlight-item">🔥 Günün Teklifleri</RouterLink>
        </div>
        <div class="menu-group">
          <span>Moleküller</span>
          <RouterLink to="/search-bar" class="menu-item">Arama Çubuğu</RouterLink>
          <RouterLink to="/social-login" class="menu-item">Sosyal Giriş Grubu</RouterLink>
          <RouterLink to="/image-gallery" class="menu-item">Resim Galerisi</RouterLink>
          <RouterLink to="/option-selector" class="menu-item">Seçenek Seçici</RouterLink>
          <RouterLink to="/quantity-selector" class="menu-item">Miktar Seçici</RouterLink>
          <RouterLink to="/product-card" class="menu-item">Tekli Ürün Kartı</RouterLink>

    <RouterLink to="/cart-item" class="menu-item">Sepet Ürün Satırı</RouterLink>
  </div>
        

      
      </nav>
    </aside>

    <main class="stage-area">
      <div class="component-viewer">
        <RouterView />
      </div>
    </main>

  </div>
</template>

<style>
/* Global Reset */
body { margin: 0; font-family: sans-serif; background-color: #f0f2f5; }

/* Layout Düzeni */
.showcase-layout {
  display: flex;
  min-height: 100vh;
}

/* Sol Menü Stilleri */
.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
}

.sidebar-header {
  padding: 20px;
  background-color: #1a252f;
  text-align: center;
}

.menu {
  padding: 20px;
}

.menu-group {
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
}

.menu-group span {
  font-size: 12px;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 10px;
  font-weight: bold;
  letter-spacing: 1px;
}

.menu-item {
  color: #ecf0f1;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
  transition: background 0.2s;
  margin-bottom: 5px;
}

.menu-item:hover {
  background-color: #34495e;
}

/* Aktif Link Rengi (Vue Router otomatik 'router-link-active' classı ekler) */
.router-link-active {
  background-color: #ff4747 !important; /* AliExpress Kırmızısı */
  color: white;
}

/* Sağ Taraf Stilleri */
.stage-area {
  flex-grow: 1;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Yukarı hizala */
  overflow-y: auto; /* Component uzunsa scroll olsun */
}

.component-viewer {
  width: 100%;
  background: white;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  min-height: 200px;
  border-radius: 8px;
  overflow: visible; /* Taşan kısımları gizle */
}
</style>