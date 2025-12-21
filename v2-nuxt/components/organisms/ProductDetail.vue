<script setup lang="ts">
import { ref, watchEffect, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '~/stores/products';
import { useCartStore } from '~/stores/cart';
import { useUserStore } from '~/stores/user';
import { useOrderStore } from '~/stores/orders';
import ImageGallery from '../molecules/ImageGallery.vue';
import ProductOptionSelector from '../molecules/ProductOptionSelector.vue';
import QuantitySelector from '../molecules/QuantitySelector.vue';
import BaseButton from '../atoms/BaseButton.vue'; 
import RelatedProductsSlider from './RelatedProductsSlider.vue'; 
import ProductReviews from './ProductReviews.vue';

// Fallback images for demo if product has no images
import siyahImg from '@/assets/products/Siyah.jpg';
import kahveImg from '@/assets/products/Kahve.jpg';
import sariImg from '@/assets/products/Sari.jpg';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();
const userStore = useUserStore();
const orderStore = useOrderStore();

// --- FETCH PRODUCT ---
watchEffect(() => {
  const id = route.params.id as string;
  if (id) {
    productStore.fetchProductById(id, true); // Force fetch to get fresh data
  }
});

const product = computed(() => productStore.currentProduct);
const loading = computed(() => productStore.loading);

const selectedOptions = ref<Record<string, string>>({});
const quantity = ref<number>(1);

// Initialize defaults when product options load
watchEffect(() => {
    const p = product.value;
    if (p?.options) {
        const defaults: Record<string, string> = {};
        for (const opt of p.options) {
             // Default to the first value if available
             if (opt.values && opt.values.length > 0) {
                 const firstVal = opt.values[0];
                 if (firstVal) {
                     defaults[opt.title] = firstVal.value;
                 }
             }
        }
        selectedOptions.value = defaults;
    }
});

// --- ACTIONS ---
const handleAddToCart = async () => {
  if (!product.value) return;

  if (!userStore.isAuthenticated) {
     alert("Lütfen önce giriş yapınız.");
     return;
  }

  // Create a variant string from selected options (e.g. "Color: Red, Size: L")
  const variantParts = [];
  const p = product.value;
  if (p?.options) {
      for (const opt of p.options) {
          const val = selectedOptions.value[opt.title];
          if (val) {
              variantParts.push(`${opt.title}: ${val}`);
          }
      }
  }
  const variantString = variantParts.join(', ');

  const item = {
    id: product.value.id,
    name: product.value.title,
    price: Number(product.value.price),
    image: (product.value.images && product.value.images.length > 0 ? product.value.images[0] : (product.value.image || '')) as string,
    quantity: quantity.value,
    variant: variantString
  };

  await cartStore.addToCart(item);
  alert("Ürün sepete eklendi!");
};

const handleBuyNow = async () => {
    if (!product.value) return;
    
    if (!userStore.isAuthenticated) {
        alert("Lütfen önce giriş yapınız.");
        return;
    }

    // 1. Construct Item (Duplicate logic from add to cart for independence)
    const variantParts = [];
    const p = product.value;
    if (p?.options) {
        for (const opt of p.options) {
            const val = selectedOptions.value[opt.title];
            if (val) {
                variantParts.push(`${opt.title}: ${val}`);
            }
        }
    }
    const variantString = variantParts.join(', ');

    const item = {
        id: product.value.id,
        name: product.value.title,
        price: Number(product.value.price),
        image: (product.value.images && product.value.images.length > 0 ? product.value.images[0] : (product.value.image || '')) as string,
        quantity: quantity.value,
        variant: variantString
    };

    // 2. Create Order Directly
    try {
        const total = item.price * item.quantity;
        await orderStore.createOrder([item], total);
        alert("Siparişiniz başarıyla alındı!");
        router.push('/'); 
    } catch (e) {
        console.error(e);
        alert("Bir hata oluştu.");
    }
};

// --- DİNAMİK RESİMLER ---
const productImages = computed(() => {
  if (product.value) {
    // KURAL: Sadece 'images' array'ini kullan.
    if (product.value.images && Array.isArray(product.value.images) && product.value.images.length > 0) {
        return product.value.images;
    }
    
    // Fallback: Eski veriler bozulmasın diye 'image' varsa onu da tek elemanlı dizi olarak dönelim
    if (product.value.image && typeof product.value.image === 'string') {
        return [product.value.image];
    }
  }
  return [siyahImg, kahveImg, sariImg];
});

// --- STICKY PRICE VISIBILITY ---
const priceContainerRef = ref<HTMLElement | null>(null);
const showStickyPrice = ref(false);

// Setup observer when element becomes available
let observer: IntersectionObserver | null = null;

watch(priceContainerRef, (el) => {
    if (observer) observer.disconnect();
    
    if (el) {
        observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry) {
                showStickyPrice.value = !entry.isIntersecting;
            }
        }, { threshold: 0 });
        
        observer.observe(el);
    }
});

onUnmounted(() => {
    if (observer) observer.disconnect();
});
</script>

<template>
  <div class="page-wrapper" v-if="loading">
    <div class="loading-state">Yükleniyor...</div>
  </div>
  
  <div class="page-wrapper" v-else-if="product">
    
    <!-- Breadcrumb (Mock) -->
    <div class="breadcrumbs">
        <span>Anasayfa</span> &gt; <span>Kategoriler</span> &gt; <span>Spor & Outdoor</span> &gt; <span class="current">{{ product.title }}</span>
    </div>

    <div class="two-column-layout">
      
      <!-- LEFT COLUMN: Content (Gallery, Info, Tabs, Related) -->
      <div class="left-column">
        
        <div class="product-intro">
          <!-- GALERİ -->
          <div class="col-gallery">
            <ImageGallery :images="productImages" />
          </div>

          <!-- ÜRÜN BİLGİLERİ -->
          <div class="col-info">
            <h1 class="product-title">
              {{ product.title }}
            </h1>
            
            <div class="ratings-row">
                <span class="stars">★★★★★</span>
                <span class="rating-val">4.8</span>
                <span class="reviews-count">568 Değerlendirme</span>
                <span class="sold-count">| 2000+ satıldı</span>
            </div>

            <div class="price-container" ref="priceContainerRef">
                <div class="deal-badge" v-if="product.discountText">
                    {{ product.discountText }}
                </div>
                <div class="main-price-row">
                    <span class="currency">TL</span>
                    <span class="amount">{{ Math.floor(Number(product.price)) }}</span>
                    <span class="fraction">,{{ (Number(product.price) % 1).toFixed(2).substring(2) || '00' }}</span>
                    <span class="original-price" v-if="product.originalPrice">{{ product.originalPrice }}TL</span>
                    <span class="discount-percent" v-if="product.originalPrice">-45%</span>
                </div>
                <div class="vat-info">Fiyatlara KDV dahildir</div>
                
                <div class="coupons-row">
                    <span class="coupon-tag">Mağaza Kuponu</span>
                    <span class="coupon-text">₺500 üzeri ₺30 indirim</span>
                </div>
            </div>

             <div class="options-section" v-if="product.options && product.options.length > 0">
                <ProductOptionSelector 
                    v-for="(opt, idx) in product.options"
                    :key="idx"
                    :title="opt.title"
                    :type="opt.type"
                    :options="opt.values"
                    v-model="selectedOptions[opt.title]"
                />
            </div>

             <div class="shipping-info-inline">
                 <div class="line">
                     <strong>Ücretsiz Göderim</strong>
                     <span> | 15 gün içinde teslimat</span>
                 </div>
             </div>
          </div>
        </div>

        <!-- ALT KISIM (Tabs/Details) -->

        
        <!-- ÜRÜN YORUMLARI -->
        <ProductReviews :product-id="product!.id" />

        <!-- İLGİLİ ÜRÜNLER SLIDER -->
        <div class="related-products-section">
          <h3>İlgili ürünler</h3>
          <RelatedProductsSlider />
        </div>

      </div>

      <!-- RIGHT COLUMN: Sticky Buy Box -->
      <div class="right-column">
        <div class="sticky-wrapper">
          <div class="buybox-card">
              <!-- PRICE SECTION (Sticky) -->
              <div class="buybox-price-section" v-show="showStickyPrice">
                 <div class="sticky-price-row">
                    <span class="amount">{{ Math.floor(Number(product?.price)) }},{{ (Number(product?.price) % 1).toFixed(2).substring(2) || '00' }}TL</span>
                    <span class="original-price" v-if="product?.originalPrice">{{ product?.originalPrice }}TL</span>
                 </div>
                 <div class="tax-info">Vergiden önce gösterilen fiyat ; <span class="discount-label">Ekstra %2 İndirim</span></div>
              </div>

              <!-- VARIANT INFO -->
              <div class="variant-info-row" v-if="Object.keys(selectedOptions).length > 0">
                  <span class="variant-text">
                      <span v-for="(val, key) in selectedOptions" :key="key">{{ key }}: {{ val }}, </span>
                  </span>
                  <span class="edit-link">Düzenle</span>
              </div>
              
              <!-- SHIPPING DESTINATION -->
              <div class="buybox-header">
                  <span class="label">Şuraya gönderiyor</span>
                  <span class="location">📍 Türkiye</span>
              </div>

              <!-- CHOICE BADGE -->
              <div class="choice-badge-row">
                  <span class="choice-badge">Choice</span>
                  <span class="choice-text">AliExpress taahhüt</span>
              </div>
               
              <!-- SERVICE FEATURES -->
              <div class="service-features">
                  <div class="feat">
                      <span class="icon">🚚</span>
                      <span><strong>Ücretsiz Sevkiyat</strong></span>
                      <span class="arrow">›</span>
                  </div>
                  <div class="feat-detail">Teslimat: <strong>Oca 03 - 08</strong></div>
                  
                  <div class="feat">
                      <span class="icon">↩️</span>
                      <span>İade ve Para İade Politikası</span>
                      <span class="arrow">›</span>
                  </div>
                  <div class="feat">
                      <span class="icon">🔒</span>
                      <span>Güvenlik ve gizlilik <span class="muted">Güvenli ödemeler·Kişi...</span></span>
                      <span class="arrow">›</span>
                  </div>
              </div>
              
              <div class="divider"></div>

              <!-- QUANTITY -->
              <div class="qty-control">
                  <label>Miktar</label>
                  <QuantitySelector v-model="quantity" />
              </div>

              <!-- ACTION BUTTONS -->
              <div class="action-buttons">
                  <button class="btn-buy-now" @click="handleBuyNow">
                      Şimdi Satın Al
                  </button>
                  <button class="btn-add-cart" @click="handleAddToCart">
                      Sepete ekleyin
                  </button>
              </div>

              <!-- SOCIAL ACTIONS -->
              <div class="social-actions">
                 <div class="action-item">
                    <span class="icon">🔗</span> Paylaş
                 </div>
                 <div class="action-item">
                    <span class="icon">♡</span> 307
                 </div>
              </div>
          </div>
          
          <div class="seller-card">
              <div class="seller-name">
                  <strong>AliExpress Selection Store</strong>
              </div>
              <div class="seller-rating">
                  <span>%95.4 Olumlu geri bildirim</span>
              </div>
              <button class="btn-follow">Takip Et</button>
          </div>
        </div>
      </div>

    </div> <!-- End Two Column Layout -->
    
  </div> <!-- End Page Wrapper -->

  <div class="page-wrapper" v-else>
    <div class="error-state">
      <h2>Ürün bulunamadı</h2>
      <NuxtLink to="/" class="back-home">Anasayfaya Dön</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  max-width: 1600px; 
  margin: 0 auto;
  padding: 10px 20px;
  font-family: "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #222;
  background-color: #fff;
}

.breadcrumbs {
    font-size: 12px;
    color: #666;
    margin-bottom: 20px;
}
.breadcrumbs .current {
    color: #222;
}

/* LAYOUT GRID */
.two-column-layout {
  display: flex;
  gap: 20px;
  position: relative;
}

.left-column {
  flex: 1; /* Takes remaining space */
  min-width: 0; /* Prevents flex overflow */
}

.right-column {
  width: 360px; /* Fixed width sidebar - Decreased as requested */
  flex-shrink: 0;
}

.sticky-wrapper {
  position: sticky;
  top: 20px; /* Stick to top with gap */
  z-index: 10;
}

/* PRODUCT INTRO GRID (Inside Left Column) */
.product-intro {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
}

.col-gallery {
  width: 580px; /* Increased to fit thumbnails + main image better */
  flex-shrink: 0;
}

.col-info {
  flex-grow: 1;
}

/* ... (Existing detail styles) ... */

.product-title {
    font-size: 16px; 
    font-weight: 700;
    line-height: 1.3;
    color: #222;
    margin-bottom: 10px;
}
.ratings-row {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    margin-bottom: 15px;
    color: #666;
}
.stars { color: #000; letter-spacing: -2px; }
.rating-val { color: #000; font-weight: bold; }
.sold-count { margin-left: 5px; }

.price-container {
    background: #fff;
    padding: 10px 0;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
}
.deal-badge {
    display: inline-block;
    background-color: #ff4747;
    color: white;
    font-size: 11px;
    font-weight: bold;
    padding: 2px 6px;
    border-radius: 2px;
    margin-bottom: 4px;
}
.main-price-row {
    color: #ff4747;
    display: flex;
    align-items: baseline;
}
.currency { font-size: 18px; font-weight: 700; }
.amount { font-size: 28px; font-weight: 700; }
.fraction { font-size: 14px; font-weight: 700; margin-right: 8px;}
.original-price {
    color: #999;
    text-decoration: line-through;
    font-size: 13px;
    margin-right: 5px;
}
.discount-percent {
    background: #fff1f1;
    color: #ff4747;
    font-size: 11px;
    padding: 1px 4px;
    font-weight: bold;
}
.vat-info { font-size: 11px; color: #999; margin-top: 4px; }
.coupons-row {
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
}
.coupon-tag {
    background: #ff4747;
    color: #fff;
    padding: 1px 4px;
    font-size: 10px;
    border-radius: 2px;
}
.coupon-text { color: #ff4747; }
.options-section { margin-bottom: 20px; }
.shipping-info-inline { font-size: 13px; color: #333; padding-top: 10px; }

/* STICKY SIDEBAR */
.sticky-wrapper {
  position: sticky;
  top: 110px; /* Increased slightly */
  z-index: 999; /* Max visibility */
  background: white;
  border-radius: 8px;
}

/* BUY BOX STYLES */
.buybox-price-section {
    padding: 10px 15px 5px 15px; /* Reduced bottom padding */
    border-bottom: 1px solid #eee;
}
.current-price {
    font-size: 24px;
    font-weight: 800;
    color: #ff4747;
}
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;900&display=swap');

.sticky-price-row {
    color: #ff4747;
    font-family: 'Inter', sans-serif;
    font-weight: 900;
    line-height: 1;
    letter-spacing: -1px; /* Tighter tracking */
    margin-bottom: 0px; 
}
.sticky-price-row .currency { font-size: 18px; margin-right: 2px; font-weight: 800; }
.sticky-price-row .amount { font-size: 34px; } 
.sticky-price-row .fraction { font-size: 34px; font-weight: 700; }

.original-price-row {
    font-size: 13px;
    color: #999;
    margin-top: 4px;
    display: flex;
    align-items: center;
    gap: 10px;
}
.original-price {
    text-decoration: line-through;
}
.discount-label {
    background: #ffe6e6; /* Light red bg */
    color: #ff4747;
    padding: 2px 4px;
    border-radius: 2px;
    font-size: 11px;
    font-weight: bold;
}
.tax-info {
    font-size: 12px;
    color: #666;
    margin-top: 4px;
}

.buybox-card {
    border: 1px solid #ddd;
    border-radius: 0; /* Sharp corners */
    padding: 16px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    margin-bottom: 15px;
}
.buybox-header { font-size: 13px; margin-bottom: 10px; }
.location { display: inline-block; margin-left: 5px; font-weight: 600; text-decoration: underline; cursor: pointer; }
.delivery-estimated { font-size: 13px; margin-bottom: 15px; }
.service-features { font-size: 12px; color: #666; margin-bottom: 15px; }
.feat { display: flex; align-items: center; gap: 5px; margin-bottom: 4px; }
.feat .icon { font-size: 14px; }
.divider { height: 1px; background: #eee; margin: 15px 0; }
.qty-control { margin-bottom: 20px; }
.qty-control label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 5px; }
.stock-info { font-size: 11px; color: #999; margin-top: 4px; }
.action-buttons { display: flex; flex-direction: column; gap: 10px; margin-bottom: 15px; }
.btn-buy-now {
    width: 100%;
    background-color: #D3021C; 
    color: white;
    border: none;
    padding: 12px; /* Thinner */
    font-size: 18px;
    font-weight: 700;
    border-radius: 0; /* Sharp */
    cursor: pointer;
    transition: background 0.2s;
}
.btn-buy-now:hover { background-color: #b00217; }
.btn-add-cart {
    width: 100%;
    background-color: white; /* White bg */
    color: black; /* Black text */
    border: 1px solid black; /* Black border */
    padding: 12px; /* Thinner */
    font-size: 18px;
    font-weight: 700;
    border-radius: 0; /* Sharp */
    cursor: pointer;
    transition: background 0.2s;
}
.btn-add-cart:hover { background-color: #f9f9f9; }
.social-actions { 
    display: flex; 
    justify-content: space-between; 
    font-size: 13px; 
    color: #666; 
    padding-top: 10px;
    border-top: 1px solid #f5f5f5;
}
.social-actions .action-item {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    padding: 8px 20px;
    border: 1px solid #ddd;
    border-radius: 20px;
}
.social-actions .action-item:hover { background: #f9f9f9; }

/* NEW BUY BOX STYLES */
.variant-info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    padding: 10px 0;
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 10px;
}
.variant-text { color: #333; }
.edit-link { color: #007bff; cursor: pointer; }

.choice-badge-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
}
.choice-badge {
    background: #00a651;
    color: white;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 700;
}
.choice-text { font-size: 13px; color: #333; }

.service-features .feat {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    font-size: 13px;
    color: #333;
    cursor: pointer;
}
.service-features .feat .arrow {
    margin-left: auto;
    color: #ccc;
}
.service-features .feat-detail {
    font-size: 12px;
    color: #666;
    padding-left: 28px;
    margin-bottom: 8px;
}
.service-features .muted { color: #999; font-size: 12px; }

/* Seller Card */
.seller-card {
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 16px;
    background: #f9f9f9;
}
.seller-name { font-size: 14px; font-weight: bold; margin-bottom: 5px; }
.seller-rating { font-size: 11px; color: #666; margin-bottom: 10px; }
.btn-follow {
    width: 100%;
    padding: 6px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 12px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
}
.btn-follow:hover { background: #eee; }

/* TABS & RELATED */
.product-details-tabs {
    display: flex;
    gap: 30px;
    border-bottom: 1px solid #ddd;
    margin-top: 10px;
    margin-bottom: 20px;
}
.tab {
    padding-bottom: 10px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
    font-weight: 500;
    border-bottom: 2px solid transparent;
}
.tab.active {
    color: #ff4747;
    border-bottom-color: #ff4747;
}

.related-products-section {
  margin-top: 30px;
}
.related-products-section h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 15px;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
    .two-column-layout {
        flex-direction: column;
    }
    .left-column {
      width: 100%;
    }
    .right-column {
      width: 100%;
      order: 3; /* Buy box at bottom on mobile optional, or top */
    }
    .col-gallery {
      width: 100%; /* Flexible on mobile */
      margin-bottom: 20px;
    }
    .product-intro {
      flex-direction: column;
    }
}
</style>