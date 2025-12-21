<script setup>
defineProps({
  modelValue: Number
});
const emit = defineEmits(['update:modelValue']);

const decrease = (val) => {
  if (val > 1) emit('update:modelValue', val - 1);
};
const increase = (val) => emit('update:modelValue', val + 1);
</script>

<template>
  <div class="qty-selector">
    <button @click="decrease(modelValue)" :disabled="modelValue <= 1">-</button>
    <span>{{ modelValue }}</span>
    <button @click="increase(modelValue)">+</button>
  </div>
</template>

<style scoped>
.qty-selector {
  display: inline-flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 10px 0;
}
.qty-selector button {
  background: #f5f5f5;
  border: none;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-weight: bold;
}
.qty-selector span {
  width: 40px;
  text-align: center;
  font-size: 14px;
}
</style>