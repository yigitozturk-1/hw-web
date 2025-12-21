<script setup lang="ts">
interface Props {
  modelValue: string;
  placeholder?: string;
  type?: string;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <input 
    :type="type || 'text'"
    :value="modelValue"
    :placeholder="placeholder"
    @input="handleInput"
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