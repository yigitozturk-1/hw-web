<script setup lang="ts">
import { ref } from 'vue';

interface Recommendation {
  img: string;
  label: string;
}

interface SubSection {
  title: string;
  items: string[];
}

interface Category {
  id: number;
  name: string;
  icon: string;
  recommendations: Recommendation[];
  subSections: SubSection[];
}

// --- KATEGORİ VERİLERİ ---
const categories: Category[] = [
  { 
    id: 1, 
    name: 'Ev geliştirme ve aydınlatma', 
    icon: '💡',
    recommendations: [
      { img: 'https://ae-pic-a1.aliexpress-media.com/kf/S176b90bf79714bf09abe11f0b84bfe94i.png_960x960.png_.avif', label: 'Mutfak dolabı' },
      { img: 'https://ae-pic-a1.aliexpress-media.com/kf/S1e3df192b5fb4183816e53c1b6b51637L.png_960x960.png_.avif', label: 'Ampuller' },
      { img: 'https://ae-pic-a1.aliexpress-media.com/kf/S0aa3043948a847408fac2c606ec021c4z/800x800.jpg_960x960q75.jpg_.avif', label: 'Akıllı anahtarlar' },
      { img: 'https://ae-pic-a1.aliexpress-media.com/kf/Sc5c8a79b9e8b4d158a2eddda721c2d766.jpg_960x960q75.jpg_.avif', label:'Güneş Panelleri'},
      { img: 'https://ae-pic-a1.aliexpress-media.com/kf/Sadd2bf4587b54b7bb3e62f29f7f4903aU/1601x1601.jpg_960x960q75.jpg_.avif', label: 'Duvar panelleri' },
      { img: 'https://ae-pic-a1.aliexpress-media.com/kf/Sd60aee3173d249a589ab18c874cded7fD.png_960x960.png_.avif', label: 'Soğuk oda sistemleri' },
      { img: 'https://ae-pic-a1.aliexpress-media.com/kf/Sa3750911dac94d95a1aa535b599f5ec2l/800x800.jpg_960x960q75.jpg_.avif', label: 'Elektrik Prizleri' },
      { img: 'https://ae-pic-a1.aliexpress-media.com/kf/S416f8ac923204b0b9d660620956116fbe/800x800.jpg_960x960q75.jpg_.avif', label: 'Güç kaynakları' }
    ],
    subSections: [
      { title: 'Mutfak armatürleri', items: ['Su filtrasyon', 'Mutfak dolabı depolama', 'Mutfak musluklar', 'Mutfak donanımı', 'Mutfak sabunluklar', 'Mutfak lavaboları'] },
      { title: 'Elektrikli ekipman', items: ['Güneş panelleri', 'Güneş invertörleri', 'Akıllı anahtarlar', 'Güç kaynakları', 'Kablo aksesuarları', 'Kablolar meclisleri'] },
      { title: 'Boyama malzemeleri', items: ['Duvar kağıtları', 'Duvar panelleri', 'Boya fırçaları', 'Duvar kağıdı yapıştırıcı'] },
      { title: 'Banyo armatürleri', items: ['Musluk yedek parçaları', 'Küvet musluklar', 'Banyo donanım', 'Duş sistemi', 'Banyo lavaboları', 'Küvetler ve aksesuarlar'] },
      { title: 'Isıtma, soğutma', items: ['Hvac sistemleri', 'Şömineler ve sobalar', 'Yerden ısıtma sistemleri', 'Soğuk oda sistemleri', 'Havalandırma delikleri'] },
      { title: 'Donanım', items: ['Yapıştırıcılar', 'Manyetik malzemeler', 'Lineer kılavuzlar', 'Bağlantı elemanları', 'Güç iletim parçaları', 'Pnömatik parçalar'] },
      { title: 'Aile istihbarat sistemi', items: ['Akıllı dimmerler', 'Akıllı termostatlar'] }
    ]
  },
  { 
    id: 2, 
    name: 'Otomotiv ve motosiklet', 
    icon: '🏎️',
    recommendations: [
      { img: 'https://ae-pic-a1.aliexpress-media.com/kf/S976ff942a6f641858860f77f9aba8a40b.jpg_960x960q75.jpg_.avif', label: 'Motosiklet' },
      { img: 'https://ae-pic-a1.aliexpress-media.com/kf/S200dc409cf8d4fc980e701d01339f49fq/1200x1200.jpg_960x960q75.jpg_.avif', label: 'Kasklar' },
      { img: 'https://ae-pic-a1.aliexpress-media.com/kf/Se33810aa970a4589b0c6c48eca0d3f86c.jpg_960x960q75.jpg_.avif', label: 'Akıllı Sistem' },
      { img: 'https://ae-pic-a1.aliexpress-media.com/kf/Sc187a5e4386741c29533b175489f00f7W.jpg_960x960q75.jpg_.avif', label: 'Süsler' }
    ],
    subSections: [
      { title: 'Oto Yedek Parça', items: ['Fren Sistemi', 'Filtreler', 'Ateşleme', 'Motorlar', 'Süspansiyon', 'Silecekler'] },
      { title: 'Araç Elektroniği', items: ['Araç Kameraları', 'GPS Takip', 'Ses Sistemleri', 'Alarm Sistemleri'] },
      { title: 'Araç Bakım', items: ['Temizlik Ürünleri', 'Cila', 'Boya Koruma'] }
    ]
  },
  { id: 3, name: 'Takı ve saatler', icon: '💍', recommendations: [], subSections: [] },
  { id: 4, name: 'Tüketici elektroniği', icon: '📷', subSections: [], recommendations: [] },
  { id: 5, name: 'Kadın giyim', icon: '👗', subSections: [], recommendations: [] },
  { id: 6, name: 'Spor ve eğlence', icon: '🏀', subSections: [], recommendations: [] },
  { id: 7, name: 'Bilgisayar, ofis ve eğitim', icon: '💻', subSections: [], recommendations: [] },
  { id: 8, name: 'Ev ve bahçe', icon: '🏡', subSections: [], recommendations: [] },
  { id: 9, name: 'Aksesuarlar', icon: '⌚', subSections: [], recommendations: [] },
  { id: 10, name: 'Ev aletleri', icon: '🔌', subSections: [], recommendations: [] },
  { id: 11, name: 'Ayakkabı', icon: '👟', subSections: [], recommendations: [] },
];

const activeCategory = ref<Category>(categories[0]!);

const handleHover = (category: Category) => {
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
            <img :src="rec.img || 'https://via.placeholder.com/80'" alt="rec" />
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
  width: 100%;       /* Kapsayıcısının %100'ü kadar genişle */
  min-width: 1000px; /* En az bu kadar olsun */
  height: 600px;     /* AliExpress standardına yakın yükseklik */
  /* --------------------------- */
  background: white;
  border-radius: 0 0 8px 8px; /* Sadece alt köşeler oval */
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  border: 1px solid #eee;
  border-top: none; /* Üst çizgiye gerek yok, butona yapışık */
  overflow: hidden;
  z-index: 2000;
}

/* Sol Sidebar */
.sidebar-list {
  width: 280px; 
  flex-shrink: 0; /* Daralmasını engelle */
  background-color: #fff; /* AliExpress'te sol taraf beyaz */
  list-style: none;
  padding: 10px 0;
  margin: 0;
  overflow-y: auto;
  border-right: 1px solid #e0e0e0;
}

.sidebar-item {
  padding: 12px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #333;
  transition: all 0.1s;
}

.sidebar-item:hover, .sidebar-item.active {
  background-color: white;
  font-weight: bold;
  color: #ff4747; /* Aktif olunca kırmızı yazı */
  box-shadow: -3px 0 0 #ff4747 inset; /* Sol tarafa kırmızı çizgi efekti */
}

/* Sağ İçerik */
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

/* Önerilen Resimler Grid */
.recommendation-grid {
  display: flex;
  gap: 25px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.rec-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90px;
  text-align: center;
  cursor: pointer;
}
.rec-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
  object-fit: contain;
  transition: transform 0.2s;
}
.rec-item:hover img {
  transform: scale(1.05);
}
.rec-item span {
  font-size: 12px;
  color: #333;
  line-height: 1.3;
}

/* Alt Kategoriler Grid - 4 Sütun */
.subcategories-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 Sütuna çıkardık */
  gap: 40px; /* Araları açtık */
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