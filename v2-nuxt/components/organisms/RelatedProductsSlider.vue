<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import ProductCard from '../molecules/ProductCard.vue';
import { useProductStore } from '~/stores/products';

const productStore = useProductStore();

const scrollContainer = ref<HTMLElement | null>(null);

// Get related products (mock logic: just get all products except current, or first 10)
const relatedProducts = computed(() => {
  return productStore.products.slice(0, 10);
});

const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -300, behavior: 'smooth' });
  }
};

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 300, behavior: 'smooth' });
  }
};

onMounted(() => {
    if (productStore.products.length === 0) {
        productStore.fetchProducts();
    }
});
</script>

<template>
  <div class="related-products-wrapper">
    <h3 class="section-title">Şunları da beğenebilirsiniz</h3>
    
    <div class="slider-container">
      <button class="nav-btn prev" @click="scrollLeft">❮</button>
      
      <div class="products-scroll" ref="scrollContainer">
        <div class="product-item" v-for="product in relatedProducts" :key="product.id">
            <ProductCard :product="product" />
        </div>
      </div>

      <button class="nav-btn next" @click="scrollRight">❯</button>
    </div>
  </div>
</template>

<style scoped>
.related-products-wrapper {
  margin-top: 40px;
  max-width: 1600px; /* Match page width */
  margin: 40px auto;
  padding: 0 20px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #222;
}

.slider-container {
  position: relative;
  display: flex;
  align-items: center;
}

.products-scroll {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 10px; /* Hide scrollbar a bit or give space */
  /* Hide scrollbar for cleaner look */
  scrollbar-width: none; /* Firefox */
}
.products-scroll::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.product-item {
  flex: 0 0 200px; /* Sabit genişlik kartlar */
  max-width: 200px;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #ddd;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: all 0.2s;
}
.nav-btn:hover {
  background: white;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.prev { left: -20px; }
.next { right: -20px; }

</style>