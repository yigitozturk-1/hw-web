import { defineStore } from 'pinia';
import type { IUser } from '@/types';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as IUser | null,
        isAuthenticated: false,
        loading: false,
        error: null as string | null
    }),
    actions: {
        async registerUser(email: string, password: string) {
            this.loading = true;
            this.error = null;
            try {
                const { $auth, $db } = useNuxtApp();
                if (!$auth || !$db) throw new Error("Firebase not initialized");

                const { createUserWithEmailAndPassword } = await import('firebase/auth');
                const { doc, setDoc } = await import('firebase/firestore');

                const userCredential = await createUserWithEmailAndPassword($auth as any, email, password);
                const user = userCredential.user;

                // Sync to store
                this.user = {
                    id: user.uid,
                    email: user.email || '',
                    name: user.displayName || 'Yeni Kullanıcı', // Varsayılan isim
                    avatar: user.photoURL || ''
                };
                this.isAuthenticated = true;

                // Write to Firestore
                await setDoc(doc($db as any, "users", user.uid), {
                    email: user.email,
                    createdAt: new Date().toISOString()
                });

            } catch (e: any) {
                this.error = e.message;
                console.error("Registration failed", e);
                throw e; // Modal içinde yakalamak için
            } finally {
                this.loading = false;
            }
        },

        async loginUser(email: string, password: string) {
            this.loading = true;
            this.error = null;
            try {
                const { $auth } = useNuxtApp();
                if (!$auth) throw new Error("Firebase not initialized");

                const { signInWithEmailAndPassword } = await import('firebase/auth');
                const userCredential = await signInWithEmailAndPassword($auth as any, email, password);
                const user = userCredential.user;

                this.user = {
                    id: user.uid,
                    email: user.email || '',
                    name: user.displayName || 'Kullanıcı',
                    avatar: user.photoURL || ''
                };
                this.isAuthenticated = true;

            } catch (e: any) {
                this.error = e.message;
                console.error("Login failed", e);
                throw e;
            } finally {
                this.loading = false;
            }
        },

        async logout() {
            try {
                const { $auth } = useNuxtApp();
                if ($auth) {
                    const { signOut } = await import('firebase/auth');
                    await signOut($auth as any);
                }
            } catch (e) {
                console.error('Logout error', e);
            } finally {
                this.user = null;
                this.isAuthenticated = false;
            }
        }
    },
    getters: {
        userName: (state) => state.user?.email || state.user?.name || 'Misafir'
    }
});
