<script setup lang="ts">
interface Props {
  href?: string;
}

withDefaults(defineProps<Props>(), {
  href: '#'
});
</script>

<template>
  <a :href="href" class="footer-link">
    <slot></slot> </a>
</template>

<style scoped>
.footer-link {
  display: block; /* Alt alta gelmeleri için */
  color: #666; /* Koyu gri */
  text-decoration: none;
  font-size: 12px;
  margin-bottom: 8px;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #ff4747; /* AliExpress kırmızısı */
  text-decoration: underline;
}
</style>