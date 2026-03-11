<script setup lang="ts">
const props = defineProps<{ review: any }>();
</script>

<template>
  <article class="review-card">
    <div class="review-card__meta">
      <img src="~/assets/img/noAvatarImg.svg" alt="" />

      <strong>{{ props.review.reviewerName }}</strong>
      <span> {{ props.review.reviewerEmail }} </span>
      <time>{{ new Date(props.review.date).toLocaleDateString() }}</time>
      <span class="review-card__rating">{{ props.review.rating }}/5</span>
    </div>
    <p class="review-card__text">{{ props.review.comment }}</p>
  </article>
</template>

<style scoped>
.review__img {
  max-width: 30px;
}

.review-card {
  display: flex;
  padding: 12px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  flex-flow: column;
}

.review-card__meta {
  display: flex;
  gap: 8px;
  font-size: 13px;
  color: var(--font-color-category);
}

.review-card__rating {
  margin-left: auto;
  color: var(--font-color-accent);
}

.review-card__text {
  margin-top: 8px;
  font-size: 14px;
}
</style>
