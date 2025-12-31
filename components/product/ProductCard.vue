<script lang="ts" setup>
import type { Product } from "~/types/product";

defineProps<{
  product: Product;
}>();

const imgLoaded = ref(false);
</script>

<template>
  <div class="product-card">
    <div class="product-card__img_wrapper">
      <img
        class="img"
        :src="product.thumbnail"
        :alt="product.title"
        @load="imgLoaded = true"
        v-show="imgLoaded"
      />

      <div v-if="!imgLoaded" class="img-lazy"></div>
    </div>
    <div class="product-card__title_wrapper">
      <div class="display-flex">
        <div class="product-card__price">
          <span>{{ product.price + "$" }}</span>
        </div>
        <div class="product-card__category">
          <span>{{ product.category }}</span>
        </div>
      </div>
      <div class="product-card__title">
        <span>{{ product.title }}</span>
      </div>
      <div class="product-card__rating">
        <Icon name="line-md:star-alt-filled" class="product-card__rating_icon" />
        <span>{{ product.rating }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  width: 230px;
  padding: 12px;
  border-radius: 16px;
  border: 3px solid var(--border-color);

  .product-card__img_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    overflow: hidden;

    .img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .img-lazy {
      width: 200px;
      height: 200px;
      animation: img-lazy 1.5s infinite;
    }
  }

  .product-card__title_wrapper {
    display: flex;
    flex-flow: column;
    margin-top: 8px;
    height: max-content;

    .display-flex {
      display: flex;
      justify-content: space-between;
    }

    .product-card__price {
      span {
        color: rgb(187, 0, 103);
        font-weight: 500;
      }
    }

    .product-card__category {
      span {
        color: #a1a1aa;
        font-size: 14px;
      }
    }

    .product-card__title {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    .product-card__rating {
      .product-card__rating_icon {
        vertical-align: middle;
        font-size: 14px;
        color: #ffae00;
      }
      span {
        font-size: 12px;
      }
    }
  }
}

@keyframes img-lazy {
  0%,
  100% {
    background: #ffffff;
  }

  50% {
    background: #a1a1aa;
  }
}

@media screen and (max-width: 970px) {
  .product-card {
    width: 200px;
  }
}
</style>
