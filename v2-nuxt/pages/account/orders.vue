<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useOrderStore } from '~/stores/orders';
import { useUserStore } from '~/stores/user';
import { useCartStore } from '~/stores/cart';
import { useRouter } from 'vue-router';

// Layout
definePageMeta({
  layout: 'account'
});

const orderStore = useOrderStore();
const userStore = useUserStore();
const cartStore = useCartStore();
const router = useRouter();

// UI State
const activeTab = ref('all');
const tabs = [
  { id: 'all', label: 'Tümünü görüntüle' },
  { id: 'unpaid', label: 'Ödenecek' },
  { id: 'unshipped', label: 'Kargoya verilecek' },
  { id: 'shipped', label: 'Kargoya verildi' },
  { id: 'completed', label: 'İşlendi' }
];

// Computed
const orders = computed(() => orderStore.orders);
const loading = computed(() => orderStore.loading);

// Filtered Orders (Mock logic for tabs since backend doesn't support all statuses yet)
const filteredOrders = computed(() => {
    // In a real app, filtering would happen here. Returning all for now.
    return orders.value;
});

onMounted(() => {
    if (!userStore.isAuthenticated) {
        router.push('/');
        return;
    }
    orderStore.fetchOrders();
});

const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

const handleDeleteOrder = async (orderId?: string) => {
    if (!orderId) return;
    if (confirm("Bu siparişi silmek istediğinize emin misiniz?")) {
        await orderStore.cancelOrder(orderId);
    }
};

const handleBuyAgain = async (order: any) => {
    // Add all items from order to cart
    if (order.items) {
        for (const item of order.items) {
            await cartStore.addToCart({
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: 1, // Add 1 by default
                variant: item.variant || ''
            });
        }
        alert("Ürünler sepete eklendi!");
        router.push('/cart');
    }
};
</script>

<template>
  <div class="orders-page-wrapper">
    <h1 class="page-title">Siparişlerim</h1>

    <!-- TABS -->
    <div class="tabs-header">
       <div 
         v-for="tab in tabs" 
         :key="tab.id"
         class="tab"
         :class="{ active: activeTab === tab.id }"
         @click="activeTab = tab.id"
       >
         {{ tab.label }}
         <span v-if="tab.id === 'all'" class="count-badge" v-show="orders.length > 0"></span>
       </div>
       <div class="trash-link">
           <span class="icon">🗑️</span> Silinen siparişler
       </div>
    </div>

    <!-- FILTERS BAR -->
    <div class="filters-bar">
        <div class="search-box">
             <select class="search-select">
                 <option>Sipariş Numarası</option>
             </select>
             <input type="text" placeholder="Sipariş numarası, ürün veya mağaza adını girin..." />
             <button class="search-btn">🔍</button>
        </div>
        <div class="date-filter">
             <span>her zaman</span> ⌄
        </div>
    </div>
    
    <div v-if="loading" class="loading">Yükleniyor...</div>
    
    <div v-else-if="filteredOrders.length === 0" class="empty-state">
        <p>Henüz hiç siparişiniz yok.</p>
        <NuxtLink to="/" class="btn-shop">Alışverişe Başla</NuxtLink>
    </div>

    <div v-else class="orders-list">
        <!-- ORDER CARD -->
        <div v-for="order in filteredOrders" :key="order.id" class="order-card">
            
            <div class="card-header">
                <div class="header-left">
                    <strong class="status-text">{{ order.status === 'pending' ? 'Bekliyor' : 'Bitmiş' }}</strong>
                </div>
                <div class="header-right">
                    <span class="order-date">Siparişin verilme tarihi: {{ formatDate(order.createdAt) }}</span>
                    <span class="order-id">Sipariş no: {{ order.id }}</span>
                    <button class="btn-copy">Kopyala</button>
                    <span class="divider">|</span>
                    <button class="btn-details">Sipariş ayrıntıları ></button>
                </div>
            </div>


            
            <!-- PRODUCT ITEMS -->
            <div class="order-items">
                <div v-for="item in order.items" :key="item.id" class="item-row">
                    <div class="item-img">
                        <img :src="item.image" :alt="item.name" />
                    </div>
                    <div class="item-details">
                        <div class="item-name">{{ item.name }}</div>
                        <div class="item-variant" v-if="item.variant">{{ item.variant }}</div>
                        <div class="item-price-qty">
                            <span class="price">{{ item.price }} TL</span>
                            <span class="qty">x{{ item.quantity }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- FOOTER -->
            <div class="card-footer">
                <div class="total-row">
                    Toplam: <span class="total-price">{{ order.total }} TL</span>
                </div>
                <div class="actions-row">

                    <button class="btn-delete" @click="handleDeleteOrder(order.id)">Sil</button>
                </div>
            </div>

        </div>
    </div>
  </div>
</template>

<style scoped>
.orders-page-wrapper {
    max-width: 1000px;
    margin: 30px auto;
    font-family: Arial, sans-serif;
    color: #333;
}

.page-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
}

/* TABS */
.tabs-header {
    display: flex;
    gap: 30px;
    border-bottom: 2px solid #eee;
    margin-bottom: 20px;
    position: relative;
}
.tab {
    padding-bottom: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    color: #666;
    position: relative;
}
.tab.active {
    color: #000;
    border-bottom: 2px solid #ff4747;
    margin-bottom: -2px;
}
.trash-link {
    margin-left: auto;
    font-size: 13px;
    color: #666;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
}

/* FILTERS */
.filters-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    background: #fff;
}
.search-box {
    display: flex;
    border: 2px solid #ff4747; /* Orange border */
    border-radius: 4px; /* Slightly rounded to match ref */
    overflow: hidden;
    width: 600px;
}
.search-select {
    border: none;
    padding: 8px;
    background: #fff;
    border-right: 1px solid #ddd;
    font-size: 13px;
}
.search-box input {
    flex-grow: 1;
    border: none;
    padding: 8px 12px;
    font-size: 13px;
    outline: none;
}
.search-btn {
    background: #ff4747;
    border: none;
    color: white;
    padding: 0 15px;
    cursor: pointer;
}
.date-filter {
    border: 1px solid #ddd;
    padding: 8px 15px;
    border-radius: 4px;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
}

/* ORDER CARD */
.order-card {
    background: #fff;
    border: 1px solid #eee;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.card-header {
    background: #fff;
    padding: 12px 20px;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #666;
}
.status-text {
    font-size: 16px;
    color: #333;
}
.header-right {
    display: flex;
    align-items: center;
    gap: 10px;
}
.btn-copy { border:none; background:none; color: #007bff; cursor: pointer; padding:0;}
.btn-details { border:none; background:none; color: #333; font-weight:600; cursor: pointer; padding:0;}
.divider { color: #ddd; }

.store-row {
    padding: 10px 20px;
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 600;
    gap: 5px;
}
.store-icon { color: #ff4747; }
.chat-icon { color: #999; margin-left: 5px; cursor: pointer; }

/* ITEMS */
.order-items {
    padding: 0 20px 10px 20px;
}
.item-row {
    display: flex;
    gap: 15px;
    margin-bottom: 15px;
}
.item-img img {
    width: 80px;
    height: 80px;
    object-fit: contain;
    background: #f9f9f9;
    border: 1px solid #eee;
    border-radius: 4px;
}
.item-details { flex-grow: 1; }
.item-name {
    font-size: 13px;
    color: #333;
    margin-bottom: 4px;
    line-height: 1.4;
    max-width: 80%;
}
.item-variant {
    font-size: 12px;
    color: #999;
    margin-bottom: 4px;
}
.item-price-qty {
    font-size: 13px;
    color: #333;
}

/* FOOTER */
.card-footer {
    border-top: 1px solid #f5f5f5;
    padding: 15px 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
}
.total-row {
    font-size: 14px;
    font-weight: 600;
}
.total-price {
    font-size: 18px;
    color: #333;
}
.actions-row {
    display: flex;
    gap: 10px;
}
.btn-buy-again {
    background: #ff4747;
    color: white;
    border: none;
    padding: 8px 30px;
    border-radius: 20px; /* Pill shape */
    font-weight: 700;
    font-size: 13px;
    cursor: pointer;
}
.btn-buy-again:hover { background: #e03e3e; }

.btn-delete {
    background: white;
    color: #333;
    border: 1px solid #ccc;
    padding: 8px 30px;
    border-radius: 20px; /* Pill shape */
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
}
.btn-delete:hover { background: #f9f9f9; }

/* Empty state */
.empty-state { text-align: center; padding: 50px; }
.btn-shop {
    background: #ff4747; color: white; padding: 10px 20px; border-radius: 4px; text-decoration: none; display: inline-block; margin-top: 10px;
}
</style>
