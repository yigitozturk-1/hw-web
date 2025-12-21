import { defineStore } from 'pinia';
import type { ICartItem } from '@/types';
import { useUserStore } from './user';

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as ICartItem[],
        loading: false
    }),
    actions: {
        async fetchCart() {
            const { $db } = useNuxtApp();
            const userStore = useUserStore();
            if (!$db || !userStore.user?.id) return;

            this.loading = true;
            try {
                const { collection, getDocs } = await import('firebase/firestore');
                const cartRef = collection($db as any, "users", userStore.user.id, "cart");
                const snapshot = await getDocs(cartRef);

                this.items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ICartItem[];
            } catch (e) {
                console.error("Cart fetch error", e);
            } finally {
                this.loading = false;
            }
        },

        async addToCart(item: ICartItem) {
            // 1. Optimistic Update (Local)
            const existingItem = this.items.find(i => String(i.id) === String(item.id));

            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                this.items.push(item);
            }

            // 2. Firestore Sync
            const userStore = useUserStore();
            if (userStore.user?.id) {
                const { $db } = useNuxtApp();
                try {
                    const { doc, setDoc } = await import('firebase/firestore');
                    const itemRef = doc($db as any, "users", userStore.user.id, "cart", String(item.id));

                    // Use the updated item or the new one
                    const finalItem = existingItem || item;

                    await setDoc(itemRef, finalItem);
                } catch (e) {
                    console.error("Add to cart error", e);
                }
            }
        },

        async removeFromCart(id: number | string) {
            const userStore = useUserStore();
            // Local
            this.items = this.items.filter(i => String(i.id) !== String(id));

            // Firestore
            if (userStore.user?.id) {
                const { $db } = useNuxtApp();
                try {
                    const { doc, deleteDoc } = await import('firebase/firestore');
                    await deleteDoc(doc($db as any, "users", userStore.user.id, "cart", String(id)));
                } catch (e) {
                    console.error("Remove from cart error", e);
                }
            }
        },

        async updateQuantity(id: number | string, quantity: number) {
            const item = this.items.find(i => String(i.id) === String(id));
            if (item) {
                item.quantity = quantity;

                // Sync
                const userStore = useUserStore();
                if (userStore.user?.id) {
                    const { $db } = useNuxtApp();
                    try {
                        const { doc, updateDoc } = await import('firebase/firestore');
                        await updateDoc(doc($db as any, "users", userStore.user.id, "cart", String(id)), { quantity });
                    } catch (e) { console.error(e) }
                }
            }
        },

        async checkout() {
            const userStore = useUserStore();
            if (!userStore.user?.id || this.items.length === 0) return;

            // 1. Create Order
            const { useOrderStore } = await import('./orders');
            const orderStore = useOrderStore();

            try {
                await orderStore.createOrder(this.items, this.totalPrice);

                // 2. Clear Cart (Firestore)
                const { $db } = useNuxtApp();
                const { doc, writeBatch, collection, getDocs } = await import('firebase/firestore');

                const batch = writeBatch($db as any);
                const cartRef = collection($db as any, "users", userStore.user.id, "cart");
                const snapshot = await getDocs(cartRef);

                snapshot.docs.forEach((d) => {
                    batch.delete(d.ref);
                });

                await batch.commit();

                // 3. Clear Cart (Local)
                this.items = [];

                return true; // Success
            } catch (e) {
                console.error("Checkout error", e);
                return false;
            }
        }
    },
    getters: {
        totalItems: (state) => state.items.reduce((acc, item) => acc + item.quantity, 0),
        totalPrice: (state) => state.items.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0)
    }
});
