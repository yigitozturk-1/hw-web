<script setup lang="ts">
import { computed, onMounted } from 'vue';
import ProductCard from '../molecules/ProductCard.vue';
import { useProductStore } from '~/stores/products';
import { useCartStore } from '~/stores/cart';
import { useUserStore } from '~/stores/user';
import type { IProduct } from '@/types';

const productStore = useProductStore();
const cartStore = useCartStore();
const userStore = useUserStore();

const products = computed(() => productStore.products);

onMounted(() => {
  if (productStore.products.length === 0) {
    productStore.fetchProducts();
  }
});

const handleAddToCart = async (product: IProduct) => {
    if (!userStore.isAuthenticated) {
        alert("Lütfen önce giriş yapınız.");
        return;
    }

    // Default options selection (First value of each option)
    const variantParts = [];
    if (product.options) {
        for (const opt of product.options) {
            if (opt.values && opt.values.length > 0) {
                 const firstVal = opt.values[0];
                 if (firstVal) {
                    variantParts.push(`${opt.title}: ${firstVal.value}`);
                 }
            }
        }
    }
    const variantString = variantParts.join(', ');

    const item = {
        id: product.id,
        name: product.title,
        price: Number(product.price),
        image: (product.images && product.images.length > 0 ? product.images[0] : (product.image || '')) as string,
        quantity: 1,
        variant: variantString
    };

    await cartStore.addToCart(item);
    alert("Ürün sepete eklendi!");
};
</script>

<template>
  <div class="product-grid-container">
    <h2 class="section-title">Beğenebileceğiniz Diğer Ürünler</h2>
    
    <div class="product-grid">
      <ProductCard 
        v-for="prod in products" 
        :key="prod.id" 
        :product="prod"
        class="grid-item"
        @add-to-cart="handleAddToCart(prod)"
      />
    </div>
  </div>
</template>

<style scoped>
.product-grid-container {
  max-width: 1400px;
  margin: 40px auto;
  padding: 0 20px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: #000;
  margin-bottom: 25px;
  text-align: center;
  font-family: Arial, sans-serif;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Mobil: 2 sütun */
  gap: 15px;
}

/* Tablet */
@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Masaüstü */
@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
  }
}

/* Büyük Ekranlar */
@media (min-width: 1200px) {
  .product-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
