<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'outline';
  isDisabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  isDisabled: false,
  type: 'button'
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>();

const handleClick = (event: MouseEvent) => {
  if (!props.isDisabled) {
    emit('click', event);
  }
};

// CSS sınıflarını prop'lara göre dinamik hesapla
const buttonClasses = computed(() => {
  return {
    'base-btn': true,
    [`btn-${props.variant}`]: true,
    'btn-disabled': props.isDisabled
  };
});
</script>

<template>
  <button 
    :type="type"
    :class="buttonClasses"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
/* --- Temel Stiller --- */
.base-btn {
  padding: 10px 20px;
  border-radius: 4px; /* Hafif oval köşeler */
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto; /* Varsayılan olarak içeriği kadar genişler */
}

/* --- Varyasyon 1: Primary (AliExpress Kırmızısı) --- */
/* Örn: "Satın Al", "Sepete Ekle" */
.btn-primary {
  background-color: #ff4747;
  color: white;
}
.btn-primary:hover {
  background-color: #e62e2e; /* Hover'da koyulaşır */
}

/* --- Varyasyon 2: Secondary (Gri) --- */
/* Örn: Login ekranındaki "Devam" butonu */
.btn-secondary {
  background-color: #e6e6e6; /* Çok açık gri */
  color: #999; /* Silik yazı rengi */
}
/* Secondary butonun aktif (hover) hali */
.btn-secondary:not(.btn-disabled):hover {
  background-color: #dcdcdc;
  color: #333;
}

/* --- Varyasyon 3: Outline (Çerçeveli) --- */
/* Örn: "Kupon Al" gibi ikincil butonlar */
.btn-outline {
  background-color: transparent;
  border: 1px solid #333;
  color: #333;
}
.btn-outline:hover {
  background-color: #f5f5f5;
}

/* --- Pasif (Disabled) Durum --- */
.btn-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  /* Pasifken rengi değiştirmek istersen: */
  background-color: #ddd !important;
  color: #aaa !important;
}
</style>