<script setup lang="ts">
import BaseInput from '../atoms/BaseInput.vue';
import BaseButton from '../atoms/BaseButton.vue';
import SocialLoginGroup from '../molecules/SocialLoginGroup.vue';
import { ref, computed } from 'vue';
import { useUserStore } from '~/stores/user';

const userStore = useUserStore();
const emit = defineEmits<{ (e: 'close'): void }>();

const email = ref('');
const password = ref('');
const isRegisterMode = ref(false); // Toggle between Login and Register

const loading = computed(() => userStore.loading);
const error = computed(() => userStore.error);

const handleSubmit = async () => {
    try {
        if (isRegisterMode.value) {
            await userStore.registerUser(email.value, password.value);
        } else {
            await userStore.loginUser(email.value, password.value);
        }
        // Success
        emit('close');
        // Optional: Show success toast
    } catch (e) {
        // Error handling handled in store (sets error state)
    }
};
</script>

<template>
  <div class="modal-content-wrapper">
    <button class="close-btn" @click="$emit('close')">
      &times; </button>
    
    <div class="modal-header">
      <h2>Kayıt/Kaydol</h2>
      <p class="verification-msg">
        <span class="tick-icon">✔</span> Bilgileriniz korunur
      </p>
    </div>

    <div class="form-section">
      <div v-if="error" class="error-msg">{{ error }}</div>

      <div class="input-group">
          <BaseInput v-model="email" placeholder="E-posta" type="email" class="full-width-input" />
      </div>
      
      <div class="input-group">
          <BaseInput v-model="password" placeholder="Şifre" type="password" class="full-width-input" />
      </div>

      <BaseButton 
        variant="primary" 
        :is-disabled="email.length < 5 || password.length < 6 || loading"
        @click="handleSubmit"
        class="continue-btn"
      >
        {{ loading ? 'İşleniyor...' : (isRegisterMode ? 'Kayıt Ol & Devam Et' : 'Giriş Yap') }}
      </BaseButton>

      <div class="toggle-mode">
        <span v-if="isRegisterMode">Zaten hesabınız var mı? <a href="#" @click.prevent="isRegisterMode = false">Giriş Yap</a></span>
        <span v-else>Hesabınız yok mu? <a href="#" @click.prevent="isRegisterMode = true">Kayıt Ol</a></span>
      </div>

      <a href="#" class="trouble-link">Giriş yaparken sorun mu yaşıyorsunuz?</a>
    </div>

    <div class="social-section">
      <div class="separator">Hızlı giriş</div>
      
      <SocialLoginGroup />
    </div>

    <div class="legal-section">
      <p class="location-picker">
        Konum: <a href="#">Turkey ⌄</a>
      </p>
      
      <p class="terms-text">
        Devam ederek yetişkin olduğunuzu ve AliExpress Ücretsiz Üyelik Sözleşmesi ile Gizlilik Politikası hükümlerini okuyup kabul ettiğinizi onaylarsınız. 
        Bilgileriniz pazarlama amaçlı kullanılabilir ancak istediğiniz zaman bu onayı geri çekebilirsiniz.
      </p>
      <a href="#" class="why-location-link">Neden konum seçilmeli?</a>
    </div>

  </div>
</template>

<style scoped>
.modal-content-wrapper {
  background: white;
  width: 400px;
  /* Yüksekliği otomatik ayarla */
  padding: 30px; 
  border-radius: 2px; /* Keskin köşeler */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  /* Tüm textler ortalansın */
  text-align: center; 
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
}

.modal-header h2 {
  font-size: 24px;
  margin-bottom: 5px;
  font-weight: 500;
}

.verification-msg {
  color: #28a745; /* Yeşil renk */
  font-size: 14px;
  margin-bottom: 20px;
}
.tick-icon {
  margin-right: 5px;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  width: 100%;
}

.input-group {
    width: 100%;
}

:deep(.full-width-input) {
    border: 1px solid #ccc !important;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
}

.error-msg {
    color: red;
    font-size: 13px;
    background: #ffeeee;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    text-align: center;
}

.toggle-mode {
    font-size: 13px;
    margin-top: 5px;
}
.toggle-mode a {
    color: #ff4747;
    font-weight: bold;
    text-decoration: none;
}

/* BaseButton atomuna müdahale */
:deep(.continue-btn) {
    width: 100%;
    padding: 12px 0;
    font-weight: bold;
    background-color: #ddd; /* Pasif hali gri */
    color: #666;
    border: none;
}
/* Eğer butonu yeniden etkin hale getirecek olsaydık */
/* :deep(.continue-btn:not(.btn-disabled)) { background-color: #ff4747; color: white; } */

.trouble-link {
  font-size: 13px;
  color: #007bff;
  text-decoration: none;
}

.social-section {
  margin-top: 30px;
  margin-bottom: 20px;
}

.separator {
  position: relative;
  text-align: center;
  font-size: 12px;
  color: #999;
}
.separator::before, .separator::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 35%; /* Çizgi uzunluğu */
  height: 1px;
  background: #eee;
}
.separator::before { left: 0; }
.separator::after { right: 0; }

.legal-section {
  padding-top: 20px;
  border-top: 1px solid #eee;
}
.location-picker {
  font-size: 13px;
  margin-bottom: 10px;
}
.location-picker a {
  color: #007bff;
  text-decoration: none;
}
.terms-text {
  font-size: 11px;
  color: #999;
  line-height: 1.4;
  text-align: left;
}
.why-location-link {
  font-size: 11px;
  color: #007bff;
  text-decoration: none;
  margin-top: 5px;
  display: block;
}
</style>