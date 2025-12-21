import { defineStore } from 'pinia';
import type { IOrder, ICartItem } from '@/types';
import { useUserStore } from './user';

export const useOrderStore = defineStore('orders', {
    state: () => ({
        orders: [] as IOrder[],
        loading: false
    }),
    actions: {
        async fetchOrders() {
            const { $db } = useNuxtApp();
            const userStore = useUserStore();
            if (!$db || !userStore.user?.id) return;

            this.loading = true;
            try {
                const { collection, getDocs, query, where } = await import('firebase/firestore');

                // DEĞİŞİKLİK: 'users/{id}/orders' yerine direkt 'orders' koleksiyonundan çekiyoruz
                // Ancak sadece bu kullanıcıya ait olanları filtrelememiz lazım (where userId == ...)
                const ordersRef = collection($db as any, "orders");

                // Basitlik için önce where, sonra memory sort yapabiliriz.
                // Index hatasını önlemek için orderBy'ı kaldırıp client-side sıralıyoruz.
                const q = query(ordersRef, where("userId", "==", userStore.user.id));

                const snapshot = await getDocs(q);
                const rawOrders = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt || Date.now())
                    };
                }) as IOrder[];

                // Client-side sort (Yeniden eskiye)
                this.orders = rawOrders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

            } catch (e) {
                console.error("Orders fetch error", e);
            } finally {
                this.loading = false;
            }
        },

        async createOrder(items: ICartItem[], total: number) {
            const { $db } = useNuxtApp();
            const userStore = useUserStore();
            if (!$db || !userStore.user?.id) return;

            try {
                const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');

                // DEĞİŞİKLİK: Direkt 'orders' koleksiyonuna ekliyoruz
                const ordersRef = collection($db as any, "orders");

                const newOrder = {
                    userId: userStore.user.id, // Kullanıcıyı ayırt etmek için ID ekle
                    items,
                    total,
                    status: 'pending',
                    createdAt: serverTimestamp() // Server side timestamp
                };

                const docRef = await addDoc(ordersRef, newOrder);
                return docRef.id;
            } catch (e) {
                console.error("Create order error", e);
                throw e;
            }
        },

        async cancelOrder(orderId: string) {
            const { $db } = useNuxtApp();
            if (!$db) return;

            try {
                const { doc, deleteDoc } = await import('firebase/firestore');

                // Delete from Firestore
                const orderDocRef = doc($db as any, "orders", orderId);
                await deleteDoc(orderDocRef);

                // Update local state
                this.orders = this.orders.filter(o => o.id !== orderId);
            } catch (e) {
                console.error("Cancel order error", e);
                alert("Sipariş iptal edilirken bir hata oluştu.");
            }
        }
    },
    getters: {
        // totalOrders count etc if needed
    }
});
