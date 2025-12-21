import { defineStore } from 'pinia';
import type { IReview } from '@/types';
import { useUserStore } from './user';
import { useNuxtApp } from '#app';

export const useReviewStore = defineStore('reviews', {
    state: () => ({
        reviews: [] as IReview[],
        loading: false
    }),
    actions: {
        async fetchReviews(productId: string | number) {
            const { $db } = useNuxtApp();
            if (!$db) return;

            this.loading = true;
            try {
                const { collection, getDocs, query, where, orderBy } = await import('firebase/firestore');

                const reviewsRef = collection($db as any, "reviews");
                // Note: Compound queries with orderBy might require an index. 
                // We'll filter by ProductId and sort client side to avoid index requirement for now
                const q = query(reviewsRef, where("productId", "==", String(productId)));

                const querySnapshot = await getDocs(q);
                const rawReviews = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt || Date.now())
                    };
                }) as IReview[];

                // Client side sort: Newest first
                this.reviews = rawReviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

            } catch (e) {
                console.error("Fetch reviews failed", e);
            } finally {
                this.loading = false;
            }
        },

        async fetchUserReviews(userId: string) {
            const { $db } = useNuxtApp();
            if (!$db) return;

            this.loading = true;
            try {
                const { collection, getDocs, query, where } = await import('firebase/firestore');

                const reviewsRef = collection($db as any, "reviews");
                const q = query(reviewsRef, where("userId", "==", userId));

                const querySnapshot = await getDocs(q);
                const rawReviews = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt || Date.now())
                    };
                }) as IReview[];

                this.reviews = rawReviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

            } catch (e) {
                console.error("Fetch user reviews failed", e);
            } finally {
                this.loading = false;
            }
        },

        async addReview(productId: string | number, rating: number, comment: string) {
            const { $db } = useNuxtApp();
            const userStore = useUserStore();

            if (!$db || !userStore.user) {
                alert("Yorum yapmak için giriş yapmalısınız.");
                return;
            }

            try {
                const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');

                const reviewsRef = collection($db as any, "reviews");

                const newReview = {
                    productId: String(productId),
                    userId: userStore.user.id,
                    userName: userStore.user.email,
                    rating,
                    comment,
                    createdAt: serverTimestamp()
                };

                const docRef = await addDoc(reviewsRef, newReview);

                // Optimistic update
                const addedReview: IReview = {
                    id: docRef.id,
                    productId: String(productId),
                    userId: userStore.user.id,
                    userName: userStore.user.email,
                    rating,
                    comment,
                    createdAt: new Date()
                };

                this.reviews.unshift(addedReview);
                return true;

            } catch (e) {
                console.error("Add review error", e);
                return false;
            }
        }
    },
    getters: {
        averageRating: (state) => {
            if (state.reviews.length === 0) return 0;
            const sum = state.reviews.reduce((acc, r) => acc + r.rating, 0);
            return (sum / state.reviews.length).toFixed(1);
        },
        totalReviews: (state) => state.reviews.length
    }
});
