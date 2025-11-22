<script setup>
// Props: Dışarıdan veri almak için kullanılır
defineProps({
  modelValue: String, // v-model desteği için
  placeholder: String,
  type: {
    type: String,
    default: 'text'
  }
});

// Emits: Değişiklikleri üst bileşene bildirmek için
defineEmits(['update:modelValue']);
</script>

<template>
  <input 
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    @input="$emit('update:modelValue', $event.target.value)"
    class="base-input"
  />
</template>

<style scoped>
.base-input {
  width: 100%;
  padding: 10px 15px;
  border: 2px solid transparent; /* AliExpresste border genelde odaklanınca çıkar */
  outline: none;
  font-size: 14px;
  color: #333;
}
/* Placeholder rengi */
.base-input::placeholder {
  color: #999;
}
</style>