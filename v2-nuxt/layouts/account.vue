<template>
  <div class="layout-account">
    <TheHeader />
    
    <main class="account-container">
      <div class="container">
        <!-- Breadcrumb / Title area -->
        <div class="account-header">
          <h1>Hesabım</h1>
        </div>

        <div class="account-grid">
          <!-- LEFT SIDEBAR -->
          <aside class="account-sidebar">
             <div class="user-brief">
                <div class="avatar-placeholder">YÖ</div>
                <div class="user-name">Yiğit Öztürk</div>
             </div>
             
             <nav class="sidebar-nav">
                <RouterLink to="/account/orders" class="nav-item active-link">
                  <span class="icon">📦</span> Siparişlerim
                </RouterLink>
                <RouterLink to="/account/reviews" class="nav-item">
                  <span class="icon">💬</span> Yorumlarım
                </RouterLink>
                <a href="#" class="nav-item">
                  <span class="icon">👤</span> Profilim
                </a>
                <a href="#" class="nav-item">
                  <span class="icon">📍</span> Adreslerim
                </a>
                <a href="#" class="nav-item">
                  <span class="icon">🎫</span> Kuponlarım
                </a>
                <hr class="nav-divider" />
                <a href="#" class="nav-item text-red">
                  <span class="icon">🚪</span> Çıkış Yap
                </a>
             </nav>
          </aside>

          <!-- RIGHT CONTENT -->
          <div class="account-content">
            <slot />
          </div>
        </div>
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '~/components/organisms/TheHeader.vue';
import TheFooter from '~/components/organisms/TheFooter.vue';
</script>

<style scoped>
.layout-account {
  background-color: #f2f2f2;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.account-container {
  flex-grow: 1;
  padding-bottom: 40px;
}

.container {
  max-width: 1400px; /* Match main layout */
  margin: 0 auto;
  padding: 0 20px;
}

.account-header {
  padding: 20px 0;
}
.account-header h1 {
  font-size: 24px;
  font-weight: 700;
  color: #333;
}

.account-grid {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 20px;
}

/* SIDEBAR STYLES */
.account-sidebar {
  background: white;
  border-radius: 8px;
  padding: 20px;
  align-self: start; /* stick to top */
}

.user-brief {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.avatar-placeholder {
  width: 40px;
  height: 40px;
  background-color: #ff4747;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
}

.user-name {
  font-weight: 700;
  font-size: 14px;
  color: #333;
}

/* NAVIGATION */
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  text-decoration: none;
  color: #333;
  font-size: 14px;
  border-radius: 6px;
  transition: background 0.2s;
}

.nav-item:hover {
  background-color: #f9f9f9;
}

.nav-item.active-link {
  background-color: #ffeaea;
  color: #ff4747;
  font-weight: 600;
}

.nav-divider {
  border: none;
  border-top: 1px solid #eee;
  margin: 10px 0;
}

.text-red {
  color: #d9534f;
}

.icon {
  font-size: 16px;
  width: 20px;
  text-align: center;
}

/* CONTENT AREA */
.account-content {
  /* Let the slot take full width of this cell */
  min-width: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .account-grid {
    grid-template-columns: 1fr;
  }
}
</style>
