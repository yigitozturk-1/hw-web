<script setup lang="ts">
import HeroSlider from '@/components/organisms/HeroSlider.vue';
import SuperDeals from '@/components/organisms/SuperDeals.vue';
import ProductGrid from '@/components/organisms/ProductGrid.vue';

definePageMeta({
  layout: 'default'
});
</script>

<template>
  <div class="home-page">
    <HeroSlider />
    <SuperDeals />
    <ProductGrid />
  </div>
</template>
