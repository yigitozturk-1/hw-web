<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useReviewStore } from '~/stores/reviews';
import { useUserStore } from '~/stores/user';

const props = defineProps<{
    productId: string | number;
}>();

const reviewStore = useReviewStore();
const userStore = useUserStore();

// Form State
const comment = ref('');
const rating = ref(5);
const isSubmitting = ref(false);

// UI State
const activeFilter = ref('all');

const reviews = computed(() => reviewStore.reviews);
const averageRating = computed(() => reviewStore.averageRating);
const totalReviews = computed(() => reviewStore.totalReviews);

// Watch ID change to refetch
watch(() => props.productId, (newId) => {
    if (newId) {
        reviewStore.fetchReviews(newId);
    }
}, { immediate: true });

const submitReview = async () => {
    if (!comment.value.trim()) {
        alert("Lütfen bir yorum yazın.");
        return;
    }
    
    isSubmitting.value = true;
    const success = await reviewStore.addReview(props.productId, rating.value, comment.value);
    isSubmitting.value = false;
    
    if (success) {
        comment.value = '';
        rating.value = 5;
        alert("Yorumunuz başarıyla eklendi!");
    } else {
        alert("Yorum eklenirken bir hata oluştu.");
    }
};

const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
};

// Generate stars string
const getStars = (rating: number) => {
    const filled = '★'.repeat(rating);
    const empty = '☆'.repeat(5 - rating);
    return filled + empty;
};
</script>

<template>
  <div class="reviews-section">
      
      <!-- HEADER ROW -->
      <div class="reviews-header">
          <h3 class="header-title">İnceleme</h3>
          <span class="divider">|</span>
          <span class="header-rating">{{ averageRating }}</span>
          <span class="header-stars">{{ getStars(Math.round(Number(averageRating))) }}</span>
          <span class="header-count">{{ totalReviews }} derecelendirme</span>
          <span class="verified-badge">✓ Tümü doğrulanmış alımlardan</span>
      </div>

      <!-- FILTER TABS -->
      <div class="filter-tabs">
          <button 
            class="filter-tab" 
            :class="{ active: activeFilter === 'all' }"
            @click="activeFilter = 'all'"
          >
            Tüm değerlendirmeler
          </button>
          <!-- No photo/video filters since no photos -->
      </div>

      <!-- SORT ROW -->
      <div class="sort-row">
          <div class="sort-select">
              <span>Varsayılan olarak sırala</span> ⌄
          </div>
          <div class="original-lang">
              Orijinal dili göster
          </div>
      </div>

      <!-- Add Review Form -->
      <div class="add-review-box" v-if="userStore.isAuthenticated">
          <h4>Yorum Yap</h4>
          <div class="rating-select">
              <span>Puanınız:</span>
              <select v-model="rating">
                  <option :value="5">⭐⭐⭐⭐⭐ (5)</option>
                  <option :value="4">⭐⭐⭐⭐ (4)</option>
                  <option :value="3">⭐⭐⭐ (3)</option>
                  <option :value="2">⭐⭐ (2)</option>
                  <option :value="1">⭐ (1)</option>
              </select>
          </div>
          <textarea v-model="comment" placeholder="Ürün hakkında düşünceleriniz..."></textarea>
          <button class="submit-btn" @click="submitReview" :disabled="isSubmitting">Gönder</button>
      </div>
      <div class="login-prompt" v-else>
          Yorum yapmak için <NuxtLink to="/?login=true">giriş yapmalısınız</NuxtLink>.
      </div>

      <!-- Reviews List -->
      <div class="reviews-list">
          <div v-for="review in reviews" :key="review.id" class="review-item">
              <div class="review-left">
                  <div class="avatar-placeholder">
                      <span class="avatar-icon">👤</span> 
                  </div>
              </div>
              <div class="review-right">
                  <div class="review-rating">
                      <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= review.rating }">★</span>
                  </div>
                  <div class="review-variant-info">
                      Color:Standart Size:Standart
                  </div>
                  <div class="review-content">
                      {{ review.comment }}
                  </div>
                  
                  <div class="review-footer">
                      <div class="user-details">
                          <span class="user-name">{{ review.userName }}</span>
                          <span class="separator">|</span>
                          <span class="review-date">{{ formatDate(review.createdAt) }}</span>
                      </div>
                      <div class="helpful-action">
                          <span class="thumbs-up">👍</span> Yardımcı oldu mu (0)
                      </div>
                  </div>
              </div>
          </div>
          
          <div v-if="reviews.length === 0" class="no-reviews">
              Henüz yorum yapılmamış.
          </div>
      </div>
  </div>
</template>

<style scoped>
.reviews-section {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid #eee;
    font-family: Arial, sans-serif;
}

/* HEADER */
.reviews-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}
.header-title {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
}
.divider { color: #ccc; }
.header-rating {
    font-size: 18px;
    font-weight: 700;
    color: #333;
}
.header-stars {
    color: #ffa41c;
    font-size: 16px;
    letter-spacing: -1px;
}
.header-count {
    font-size: 14px;
    color: #666;
}
.verified-badge {
    color: #00a651;
    font-size: 13px;
    font-weight: 600;
}

/* FILTER TABS */
.filter-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
}
.filter-tab {
    padding: 8px 16px;
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 20px;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
}
.filter-tab.active {
    border-color: #333;
    font-weight: 600;
}
.filter-tab:hover {
    border-color: #999;
}

/* SORT ROW */
.sort-row {
    display: flex;
    gap: 20px;
    font-size: 13px;
    color: #666;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
}
.sort-select {
    cursor: pointer;
}
.original-lang {
    color: #007bff;
    cursor: pointer;
}

/* Form Styles */
.add-review-box {
    background: #fdfdfd;
    border: 1px solid #eee;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
}
.add-review-box h4 { margin-bottom: 10px; font-size: 14px; margin-top: 0; }
.rating-select { margin-bottom: 10px; font-size: 13px; }
.rating-select select { margin-left: 10px; padding: 5px; }
textarea {
    width: 100%;
    height: 80px;
    padding: 10px;
    font-family: inherit;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
    resize: vertical;
    box-sizing: border-box;
}
.submit-btn {
    background: #ff4747;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
}
.submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

.login-prompt {
    margin-bottom: 30px;
    padding: 15px;
    background: #fff8f8;
    border: 1px solid #ffecec;
    border-radius: 4px;
    font-size: 14px;
}

/* List Styles */
.reviews-list {
    display: flex;
    flex-direction: column;
}

.review-item {
    border-bottom: 1px solid #f5f5f5;
    padding: 20px 0;
    display: flex;
    gap: 15px;
}

.review-left {
    flex-shrink: 0;
}
.avatar-placeholder {
    width: 40px;
    height: 40px;
    background-color: #e8f4fc;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #5dade2;
    font-size: 20px;
}

.review-right {
    flex-grow: 1;
}

.review-rating {
    margin-bottom: 4px;
    display: flex;
    gap: 1px;
}
.star {
    color: #e0e0e0;
    font-size: 14px;
}
.star.filled {
    color: #ffa41c;
}

.review-variant-info {
    font-size: 12px;
    color: #999;
    margin-bottom: 8px;
}

.review-content {
    font-size: 14px;
    line-height: 1.5;
    color: #222;
    margin-bottom: 10px;
}

.review-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #999;
}

.user-details {
    display: flex;
    gap: 5px;
}
.separator { margin: 0 2px; }

.helpful-action {
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    color: #666;
}
.helpful-action:hover { color: #333; }
.thumbs-up { font-size: 14px; }

.no-reviews {
    padding: 30px;
    text-align: center;
    color: #999;
    font-size: 14px;
}
</style>
