<script setup>
defineProps({
  modelValue: Boolean,
  label: String
});
defineEmits(['update:modelValue']);
</script>

<template>
  <label class="custom-checkbox">
    <input 
      type="checkbox" 
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="checkmark">
      <svg v-if="modelValue" viewBox="0 0 24 24" width="14" height="14" stroke="white" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
    </span>
    <span v-if="label" class="label-text">{{ label }}</span>
  </label>
</template>

<style scoped>
.custom-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.custom-checkbox input {
  display: none; /* Varsayılan kutuyu gizle */
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 50%; /* Yuvarlak olması için */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  background: white;
}

.custom-checkbox input:checked ~ .checkmark {
  background-color: #ff4747;
  border-color: #ff4747;
}

.label-text {
  margin-left: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
}
</style>