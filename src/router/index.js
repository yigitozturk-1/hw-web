// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
//Resimler için
import siyahImg from '@/assets/products/Siyah.jpg';
import kahveImg from '@/assets/products/Kahve.jpg';
import sariImg from '@/assets/products/Sari.jpg';
// Hazırladığımız componentleri buraya çağırıyoruz
import TheHeader from '../components/organisms/TheHeader.vue'
import TheFooter from '../components/organisms/TheFooter.vue'
import SearchBar from '../components/molecules/SearchBar.vue'
import LoginModal from '../components/organisms/LoginModal.vue'
import SocialLoginGroup from '../components/molecules/SocialLoginGroup.vue'
import ProductDetail from '../components/organisms/ProductDetail.vue'
import ImageGallery from '../components/molecules/ImageGallery.vue' // Soldaki galeri
import ProductOptionSelector from '../components/molecules/ProductOptionSelector.vue' //renk seçimi
import QuantitySelector from '../components/molecules/QuantitySelector.vue' //Miktar seçen molekül
import ShoppingCart from '../components/organisms/ShoppingCart.vue'
import CartItem from '../components/molecules/CartItem.vue'
import OrderSummary from '../components/organisms/OrderSummary.vue'
import HeroSlider from '../components/organisms/HeroSlider.vue'
import RelatedProductsSlider from '../components/organisms/RelatedProductsSlider.vue'
import ProductCard from '../components/molecules/ProductCard.vue'
import SuperDeals from '../components/organisms/SuperDeals.vue';




// Rotaları (Sayfa yollarını) tanımlıyoruz

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: { template: '<h2>Lütfen soldan bir component seçin 👈</h2>' } // Açılış ekranı
    },
    {
      path: '/header',
      name: 'header',
      component: TheHeader
    },
    {
      path: '/footer',
      name: 'footer',
      component: TheFooter
    },
    {
      path: '/search-bar',
      name: 'searchbar',
      component: SearchBar
    },
    {
      path: '/login-modal', // Yeni yol
      name: 'login',
      component: LoginModal // Yeni Component
    },
    {
      path: '/social-login',
      name: 'social-group',
      component: SocialLoginGroup
    },
    {
      path: '/product-detail',
      name: 'product-detail',
      component: ProductDetail
    },
    {
      path: '/quantity-selector',
      name: 'quantity-selector',
      component: QuantitySelector,
      props: { modelValue: 1 } // Varsayılan değer gönderdik
    },
    {
      path: '/option-selector',
      name: 'option-selector',
      component: ProductOptionSelector,
      props: {
        title: 'Test Seçenekleri',
        type: 'text',
        modelValue: 'M',
        options: [
          { label: 'S', value: 'S' },
          { label: 'M', value: 'M' },
          { label: 'L', value: 'L' }
        ]
      }
    },
    {
      path: '/image-gallery',
      name: 'image-gallery',
      component: ImageGallery,
      props: {
        images: [
          kahveImg, 
          siyahImg,
          sariImg,
        ]
      }
    },
    {
        path: '/cart',
        name: 'cart',
       component: ShoppingCart
    },
    {
      path: '/cart-item',
      name: 'cart-item',
      component: CartItem,
      // Component'in düzgün görünmesi için sahte veri gönderiyoruz
      props: {
        isSelected: true,
        item: {
          id: 999,
          name: 'Örnek Ürün: Kablosuz Bluetooth Kulaklık (Test Verisi)',
          variant: 'Renk: Siyah, Model: Pro',
          price: 450.90,
          originalPrice: 600.00,
          image: kahveImg, // Placeholder resim
          quantity: 2
        }
      }
    },

    // --- YENİ: ORDER SUMMARY (ORGANİZMA) ---
    {
      path: '/order-summary',
      name: 'order-summary',
      component: OrderSummary,
      // Özet tablosunun dolu görünmesi için sahte sayılar
      props: {
        subtotal: 1250.50,
        discount: 250.50,
        total: 1000.00,
        count: 3
      }
    },
    {
      path: '/hero-slider',
      name: 'hero-slider',
      component: HeroSlider
    },
    {
      path: '/related-products',
      name: 'related-products',
      component: RelatedProductsSlider
    },
    {
      path: '/product-card',
      name: 'product-card',
      component: ProductCard,
      // Component'in boş görünmemesi için tek bir ürün verisi yolluyoruz
      props: {
        product: {
          id: 101,
          title: "Örnek Ürün: Yüksek Kaliteli Deri Eldiven",
          price: "771,87",
          rating: "4.8",
          discountText: "449,6TL için 89,9",
          extraDrop: "150,00",
          // Placeholder bir resim kullanıyoruz
          image: siyahImg
        }
      }
    },
    {
      path: '/super-deals',
      name: 'super-deals',
      component: SuperDeals
    }

  ]
})

export default router