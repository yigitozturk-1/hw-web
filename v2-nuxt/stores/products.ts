import { defineStore } from 'pinia';
import { collection, getDocs } from 'firebase/firestore';
import type { IProduct } from '@/types';

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [] as IProduct[],
        categories: [] as any[], // Using any for now, ideally ICategory
        loading: false,
        currentProduct: null as IProduct | null
    }),
    actions: {
        async fetchProducts() {
            this.loading = true;
            try {
                const { $db } = useNuxtApp();
                if (!$db) throw new Error("Firebase not initialized");

                // Firestore 'products' collection
                const querySnapshot = await getDocs(collection($db as any, "products"));
                this.products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as IProduct));
            } catch (e) {
                console.error("Fetch products failed", e);
            } finally {
                this.loading = false;
            }
        },
        async fetchCategories() {
            try {
                const { $db } = useNuxtApp();
                if (!$db) return;
                // Firestore 'categories' collection
                const querySnapshot = await getDocs(collection($db as any, "categories"));
                this.categories = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } catch (e) {
                console.error("Fetch categories failed", e);
            }
        },
        setProducts(products: IProduct[]) {
            this.products = products;
        },
        async fetchProductById(id: string, force = false) {
            this.loading = true;
            try {
                // 1. Check if already in 'products' array (unless forced)
                if (!force) {
                    const existing = this.products.find(p => String(p.id) === id);
                    if (existing) {
                        this.currentProduct = existing;
                        return;
                    }
                }

                // 2. If not, fetch from Firestore
                const { $db } = useNuxtApp();
                if (!$db) return;

                // Firestore 'products' document fetch would be here.
                // For now, let's assume if it's not in the array, we might need to fetch all or single doc.
                // Implementing single doc fetch:
                const { doc, getDoc } = await import('firebase/firestore');
                const docRef = doc($db as any, "products", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    this.currentProduct = { id: docSnap.id, ...docSnap.data() } as IProduct;
                } else {
                    console.error("No such product!");
                    this.currentProduct = null;
                }

            } catch (e) {
                console.error("Fetch product by id failed", e);
            } finally {
                this.loading = false;
            }
        }
    }
});
