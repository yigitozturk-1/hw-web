import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
    state: () => ({
        isLoginModalOpen: false,
        isSidebarOpen: false,
        currentTheme: 'light'
    }),
    actions: {
        toggleLoginModal() {
            this.isLoginModalOpen = !this.isLoginModalOpen;
        },
        closeLoginModal() {
            this.isLoginModalOpen = false;
        },
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        }
    }
});
