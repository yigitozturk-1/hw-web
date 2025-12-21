<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useReviewStore } from '~/stores/reviews';
import { useUserStore } from '~/stores/user';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'account'
});

const reviewStore = useReviewStore();
const userStore = useUserStore();
const router = useRouter();

const reviews = computed(() => reviewStore.reviews);
const loading = computed(() => reviewStore.loading);

onMounted(() => {
  if (userStore.user) {
    reviewStore.fetchUserReviews(userStore.user.id);
  } else {
    // Redirect if not logged in (handled by middleware ideally, but safety check)
    router.push('/login');
  }
});
</script>

<template>
  <div class="user-reviews-page">
    <h2 class="page-title">Yorumlarım</h2>
    
    <div v-if="loading" class="loading-state">
       Yükleniyor...
    </div>
    
    <div v-else-if="reviews.length === 0" class="empty-state">
       <div class="empty-icon">💬</div>
       <p>Henüz hiç yorum yapmadınız.</p>
       <NuxtLink to="/" class="btn-start-shopping">Alışverişe Başla</NuxtLink>
    </div>
    
    <div v-else class="reviews-list">
       <div v-for="review in reviews" :key="review.id" class="review-card">
          <div class="review-header">
             <div class="rating-display">
                <span class="stars">★</span> {{ review.rating }}/5
             </div>
             <div class="review-date">
                {{ new Date(review.createdAt).toLocaleDateString('tr-TR') }}
             </div>
          </div>
          
          <div class="product-info-line">
             <span class="label">Ürün:</span>
             <NuxtLink :to="`/product/${review.productId}`" class="product-link">
               Görüntüle (ID: {{ review.productId }})
             </NuxtLink>
          </div>
          
          <div class="review-content">
             "{{ review.comment }}"
          </div>
       </div>
    </div>
  </div>
</template>

<style scoped>
.user-reviews-page {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.page-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.empty-state {
  text-align: center;
  padding: 40px 0;
  color: #666;
}
.empty-icon { font-size: 40px; margin-bottom: 10px; }
.btn-start-shopping {
    display: inline-block;
    margin-top: 15px;
    background: #ff4747;
    color: white;
    padding: 8px 20px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.review-card {
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 15px;
  background: #fdfdfd;
}

.review-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
}

.rating-display {
  font-weight: bold;
  color: #ff9900;
}

.review-date {
  color: #999;
  font-size: 12px;
}

.product-info-line {
  font-size: 13px;
  margin-bottom: 10px;
  color: #666;
}

.product-link {
  color: #0066c0;
  text-decoration: underline;
  margin-left: 5px;
}

.review-content {
  font-style: italic;
  color: #333;
  line-height: 1.4;
}
</style>
