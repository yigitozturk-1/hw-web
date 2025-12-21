<template>
  <div class="layout-default">
    <TheHeader />
    <main class="main-content">
      <slot />
    </main>
    <TheFooter />
    
    <Transition name="fade">
      <div v-if="uiStore.isLoginModalOpen" class="modal-overlay">
        <LoginModal @close="uiStore.closeLoginModal" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import TheHeader from '~/components/organisms/TheHeader.vue';
import TheFooter from '~/components/organisms/TheFooter.vue';
import LoginModal from '~/components/organisms/LoginModal.vue';
import { useUiStore } from '~/stores/ui';

const uiStore = useUiStore();
</script>

<style scoped>
.layout-default {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-content {
  flex: 1;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
