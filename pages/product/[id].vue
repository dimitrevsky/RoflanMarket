<script setup lang="ts">
import ReviewCard from "~/components/reviews/ReviewCard.vue";
import type { Product } from "~/types/product";

const route = useRoute();
const id = Number(route.params.id);

const { data: product, pending } = await useAsyncData<Product | null>(`product-${id}`, async () => {
  if (!id) return null;

  return await $fetch(`https://dummyjson.com/products/${id}`);
});
</script>

<template>
  <div v-if="pending" class="not-founded">
    <h3>ниче не нашлось! (°□°;)</h3>
  </div>

  <section v-if="product" class="product-section">
    <div class="product-section__img">
      <div>
        <div>
          <img :src="product.thumbnail" alt="Product Image" />
        </div>
        <div class="product-price">
          <p>${{ product.price }}</p>
          <p>{{ product?.discountPercentage }}% off</p>
          <div class="product-card__rating">
            <img class="product-card__rating_icon" src="~/assets/img/RatingIcon.svg" alt="rating icon" />
            <span>{{ product.rating }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="product-section__text">
      <div class="product-title">
        <h2>{{ product.title }}</h2>
        <p>{{ product.description }}</p>
      </div>
      <div class="product-more">
        <p>{{ product?.category }}</p>
        <p>{{ product?.stock }} in stock</p>
        <p>{{ product?.tags?.join("; ") }}</p>
      </div>
    </div>
  </section>

  <section v-if="product?.reviews" class="reviews">
    <ReviewCard v-for="review in product.reviews" :key="review" :review="review" />
  </section>
</template>

<style scoped>
.product-section {
  display: flex;
  margin: 50px auto;
  padding: 12px;
  gap: 16px;
  max-width: 1232px;
  height: fit-content;
  border: 2px solid var(--border-color);
  border-radius: 24px;
  flex-wrap: wrap;
}

.product-section__img {
  max-width: 200px;
  margin: 0 auto;

  img {
    width: 100%;
  }
}

.product-section__text {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;

  .product-title {
    font-size: 24px;
    margin-bottom: 8px;

    h2 {
      color: var(--font-color-accent);
      margin-bottom: 8px;
    }

    p {
      font-size: 16px;
    }
  }
}

.product-price {
  display: flex;
  justify-content: space-around;
  gap: 10px;
  color: var(--font-color-price);
  font-size: 12px;
  text-wrap: nowrap;
}

.product-more {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: var(--font-color-category);
}

.product-card__rating {
  .product-card__rating_icon {
    vertical-align: middle;
    margin-right: 4px;
    width: 16px;
  }

  span {
    font-size: 12px;
  }
}

@media (max-width: 573px) {
  .product-section {
    max-width: 403px;
  }

  .product-title {
    h2 {
      font-size: 24px;
    }

    p {
      font-size: 10px;
    }
  }
}

.reviews {
  max-width: 1232px;
  margin: auto;
  display: flex;
  gap: 12px;
  flex-flow: column;
}
</style>
