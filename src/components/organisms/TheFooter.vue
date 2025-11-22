<script setup>
import FooterColumn from '../molecules/FooterColumn.vue';
import { ref } from 'vue';

// --- VERİLER (DATA) ---
// Sol taraftaki sütunların verileri
const customerServiceLinks = [
  { text: 'Yardım Merkezi', url: '#' },
  { text: 'Transaction Services Agreement', url: '#' },
  { text: 'Terms and Conditions', url: '#' },
  { text: 'Geri bildirim anketi', url: '#' }
];

const shoppingLinks = [
  { text: 'Ödeme yapma', url: '#' },
  { text: 'Teslimat seçenekleri', url: '#' },
  { text: 'Müşteri Koruma', url: '#' }
];

const collabLinks = [
  { text: 'Ortaklıklar', url: '#' },
  { text: 'İş ortağı programı', url: '#' },
  { text: 'Satıcı girişi', url: '#' },
  { text: 'Çin dışı satıcı kayıt', url: '#' }
];

// Ödeme Yöntemleri (Görseldeki logoları temsil eder)
const paymentMethods = ['Visa', 'Master', 'Union', 'JCB', 'Amex', 'Apple', 'GPay'];
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      
      <div class="top-info">
        <h3 class="main-title">AliExpress: Online Alışveriş İçin En İyi Seçenek</h3>
        <div class="info-text-block">
          <h4>AliExpress Nedir?</h4>
          <p>
            AliExpress, Alibaba grubuna bağlı uluslararası bir B2C sınır ötesi e-ticaret platformudur. 
            Küresel tüketicilere rahat ve verimli bir alışveriş deneyimi sunmaya adanmıştır...
            </p>
        </div>
      </div>

      <div class="middle-grid">
        <FooterColumn title="Müşteri hizmetleri" :links="customerServiceLinks" />
        <FooterColumn title="Bizimle alışveriş yapın" :links="shoppingLinks" />
        <FooterColumn title="Bizimle çalışın" :links="collabLinks" />

        <div class="extras-column">
          <div class="payment-section">
            <h4 class="column-title">Şununla ödeyin:</h4>
            <div class="payment-icons">
              <div v-for="pm in paymentMethods" :key="pm" class="fake-card">
                {{ pm }}
              </div>
            </div>
          </div>

          <div class="social-section">
            <h4 class="column-title">Bağlantıda kal</h4>
            <div class="social-icons">
              <a href="#" class="social-icon"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
              <a href="#" class="social-icon"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
              <a href="#" class="social-icon"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom-legal">
        <div class="legal-group">
          <h4>Yardım</h4>
          <p>Yardım Merkezi, İtirazlar ve raporlar, İade ve Para İade Politikası, Fikri Mülkiyet...</p>
        </div>
        <div class="legal-group">
          <h4>Birden fazla dili destekleyen AliExpress siteleri</h4>
          <p>Russian, Portuguese, Spanish, French, German, Italian, Dutch, Turkish...</p>
        </div>
        <div class="legal-group">
          <h4>Alibaba Group</h4>
          <p>Alibaba Group Website, AliExpress, Alimama, Alipay, Fliggy, Alibaba Cloud...</p>
        </div>
      </div>

    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background-color: #f5f5f5; /* Açık gri zemin */
  padding: 30px 0;
  font-family: sans-serif;
  color: #333;
  border-top: 1px solid #e5e5e5;
  margin-top: 50px; /* İçerikten ayırmak için */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* --- ÜST BÖLÜM --- */
.top-info {
  margin-bottom: 30px;
  font-size: 12px;
  color: #666;
}
.main-title {
  font-size: 16px;
  margin-bottom: 10px;
}
.info-text-block p {
  line-height: 1.5;
}

/* --- ORTA GRID YAPISI --- */
.middle-grid {
  display: grid;
  /* 4 sütunlu yapı: 3 tanesi eşit, sonuncusu (ikonlar) biraz daha geniş olabilir */
  grid-template-columns: repeat(3, 1fr) 1.5fr; 
  gap: 20px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 30px;
}

.column-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 15px;
}

/* Ödeme ve Sosyal İkonlar */
.payment-icons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}
.fake-card {
  /* İkon olmadığı için geçici kart görünümü */
  background: white;
  border: 1px solid #ddd;
  padding: 5px 8px;
  font-size: 10px;
  border-radius: 4px;
  font-weight: bold;
  color: #555;
}

.social-icons {
  display: flex;
  gap: 15px;
}
.social-icon {
  color: #333;
  transition: color 0.2s;
}
.social-icon:hover {
  color: #ff4747;
}

/* --- ALT BÖLÜM --- */
.bottom-legal {
  display: grid;
  grid-template-columns: 1fr 1fr; /* İki sütunlu yapı */
  gap: 20px;
  margin-top: 30px;
}

.legal-group {
  margin-bottom: 15px;
}
.legal-group h4 {
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 5px;
}
.legal-group p {
  font-size: 12px;
  color: #999;
  line-height: 1.4;
}

/* Mobil Uyumluluk (Responsive) */
@media (max-width: 768px) {
  .middle-grid, .bottom-legal {
    grid-template-columns: 1fr; /* Mobilde tek sütuna düşür */
  }
}
</style>