<script setup>
import { ref } from 'vue';

// --- KATEGORİ VERİLERİ (MOCK DATA) ---
const categories = [
  { 
    id: 1, 
    name: 'Ev geliştirme ve aydınlatma', 
    icon: '💡',
    recommendations: [
      { img: 'https://via.placeholder.com/80?text=Mutfak', label: 'Mutfak dolabı' },
      { img: 'https://via.placeholder.com/80?text=Ampul', label: 'Ampuller' },
      { img: 'https://via.placeholder.com/80?text=Anahtar', label: 'Akıllı anahtarlar' },
      { img: 'https://via.placeholder.com/80?text=Isitma', label: 'Yerden ısıtma' },
      { img: 'https://via.placeholder.com/80?text=Duvar', label: 'Duvar panelleri' }
    ],
    subSections: [
      { title: 'Mutfak armatürleri', items: ['Su filtrasyon', 'Mutfak dolabı', 'Mutfak musluklar', 'Mutfak donanımı'] },
      { title: 'Elektrikli ekipman', items: ['Güneş panelleri', 'Güneş invertörleri', 'Güç kaynakları', 'Kablo aksesuarları'] },
      { title: 'Boyama malzemeleri', items: ['Duvar kağıtları', 'Duvar panelleri', 'Boya fırçaları'] },
      { title: 'Banyo armatürleri', items: ['Musluk yedek parçaları', 'Küvet musluklar', 'Duş sistemi', 'Banyo lavaboları'] },
      { title: 'Isıtma ve Soğutma', items: ['HVAC sistemleri', 'Şömineler', 'Yerden ısıtma', 'Termostatlar'] }
    ]
  },
  { 
    id: 2, 
    name: 'Otomotiv ve motosiklet', 
    icon: '🏎️',
    recommendations: [
      { img: 'https://via.placeholder.com/80?text=Lastik', label: 'Lastikler' },
      { img: 'https://via.placeholder.com/80?text=Kask', label: 'Kasklar' }
    ],
    subSections: [
      { title: 'Oto Yedek Parça', items: ['Fren Sistemi', 'Filtreler', 'Ateşleme', 'Motorlar'] },
      { title: 'Araç Elektroniği', items: ['Araç Kameraları', 'GPS Takip', 'Ses Sistemleri'] }
    ]
  },
  { id: 3, name: 'Takı ve saatler', icon: '💍', recommendations: [], subSections: [] },
  { id: 4, name: 'Tüketici elektroniği', icon: '📷', subSections: [], recommendations: [] },
  { id: 5, name: 'İç çamaşırı ve salonlar', icon: '🩲', subSections: [], recommendations: [] },
  { id: 6, name: 'Kadın giyim', icon: '👗', subSections: [], recommendations: [] },
  { id: 7, name: 'Spor ve eğlence', icon: '🏀', subSections: [], recommendations: [] },
  { id: 8, name: 'Bilgisayar, ofis ve eğitim', icon: '💻', subSections: [], recommendations: [] },
  { id: 9, name: 'Ev ve bahçe', icon: '🏡', subSections: [], recommendations: [] },
  { id: 10, name: 'Ayakkabı', icon: '👟', subSections: [], recommendations: [] },
  { id: 11, name: 'Oyuncaklar ve Hobi', icon: '🧸', subSections: [], recommendations: [] },
];

const activeCategory = ref(categories[0]);

const handleHover = (category) => {
  activeCategory.value = category;
};
</script>

<template>
  <div class="mega-menu-container">
    <ul class="sidebar-list">
      <li 
        v-for="cat in categories" 
        :key="cat.id" 
        class="sidebar-item"
        :class="{ 'active': activeCategory.id === cat.id }"
        @mouseover="handleHover(cat)"
      >
        <span class="cat-icon">{{ cat.icon }}</span>
        <span class="cat-name">{{ cat.name }}</span>
      </li>
    </ul>

    <div class="content-area">
      <div v-if="activeCategory.recommendations.length > 0">
        <h4 class="section-title">Önerilen</h4>
        <div class="recommendation-grid">
          <div v-for="(rec, index) in activeCategory.recommendations" :key="index" class="rec-item">
            <img :src="rec.img" alt="rec" />
            <span>{{ rec.label }}</span>
          </div>
        </div>
      </div>

      <div class="subcategories-grid">
        <div v-for="(sub, index) in activeCategory.subSections" :key="index" class="sub-group">
          <h5 class="sub-title">{{ sub.title }}</h5>
          <ul>
            <li v-for="item in sub.items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
      
      <div v-if="activeCategory.subSections.length === 0 && activeCategory.recommendations.length === 0" class="empty-state">
        Bu kategori için detay verisi eklenmedi.
      </div>
    </div>
  </div>
</template>

<style scoped>
.mega-menu-container {
  display: flex;
  /* --- BOYUT AYARLARI BURADA --- */
  width: 1100px; /* Genişliği artırdık */
  height: 550px; /* Yüksekliği artırdık */
  /* --------------------------- */
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0,0,0,0.15);
  border: 1px solid #eee;
  overflow: hidden;
  z-index: 2000; /* Diğer her şeyin üstünde olsun */
}

.sidebar-list {
  width: 280px; /* Sol menü biraz daha geniş */
  background-color: #f5f5f5;
  list-style: none;
  padding: 10px 0;
  margin: 0;
  overflow-y: auto;
  border-right: 1px solid #e0e0e0;
}

.sidebar-item {
  padding: 12px 20px; /* Daha rahat tıklama alanı */
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #333;
  transition: background 0.2s;
}

.sidebar-item:hover, .sidebar-item.active {
  background-color: white;
  font-weight: bold;
  color: #000;
  position: relative;
}

.sidebar-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: #ff4747;
}

.content-area {
  flex-grow: 1;
  padding: 30px;
  overflow-y: auto;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #191919;
}

.recommendation-grid {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.rec-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90px;
  text-align: center;
}
.rec-item img {
  width: 70px;
  height: 70px;
  border-radius: 8px;
  margin-bottom: 8px;
  object-fit: cover;
}
.rec-item span {
  font-size: 12px;
  color: #333;
  line-height: 1.3;
}

.subcategories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.sub-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #191919;
}

.sub-group ul { list-style: none; padding: 0; margin: 0; }
.sub-group li {
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
  cursor: pointer;
}
.sub-group li:hover {
  color: #ff4747;
  text-decoration: underline;
}

.empty-state { color: #999; font-style: italic; margin-top: 20px; }
</style>    