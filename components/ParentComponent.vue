<script lang="ts" setup>
import type { Product } from "~/types/product";
import type { ProductFilter } from "~/types/filter";
import ProductCard from "./product/ProductCard.vue";
import AsideFilter from "./AsideFilter.vue";

const products = ref<Product[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

// изначальное состояние
const filters = ref<ProductFilter>({
  category: null,
  minPrice: null,
  maxPrice: null,
});

async function fetchProductsList() {
  try {
    // фетч
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) throw new Error(`проебался!!!!!!!!!!!!!!!!!: ${response.status}`);
    const json = await response.json();

    // получаем json и типизируем
    products.value = json.products as Product[];
    console.log("✅ всё заебись!!!!!!!!!!:", products.value); // отладка
  } catch (e: any) {
    error.value = e.message; // на всякий случай
  } finally {
    isLoading.value = false;
  }
}

// фильтруем говно
const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    if (filters.value.category !== null && product.category !== filters.value.category) {
      return false; //выкидываем нахуй не нужное
    }

    if (filters.value.minPrice !== null && product.price < filters.value.minPrice) {
      return false; //выкидываем нахуй ниже значения
    }

    if (filters.value.maxPrice !== null && product.price > filters.value.maxPrice) {
      return false; //выкидываем нахуй выше значения
    }

    return true; //возвращаем удовлетворяющее
  });
});

onMounted(fetchProductsList); //коллбек запроса
</script>

<template>
  <!-- связываем эмит -->
  <AsideFilter v-model:filters="filters" />

  <section class="catalog">
    <div class="products-title">
      <h1>Католог Товаров</h1>
    </div>
    <div class="product-table">
      <!-- рендерим фильтрованное (пиво) -->

      <div v-if="isLoading">
        <h3>Загрузка товаров...</h3>
      </div>

      <div v-else-if="filteredProducts.length === 0" class="not-founded">
        <h3>ниче не нашлось! (°□°;)</h3>
      </div>

      <ProductCard
        v-else
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>

<style scoped>
.catalog {
  display: flex;
  flex-flow: column;
  width: 100%;
}

.not-founded {
  color: var(--accent-color-text);
}

.product-table {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(231px, 1fr));
  gap: 24px 16px;
  justify-content: flex-start;
  padding-bottom: 40px;
}

.products-title {
  margin: 12px 0 12px 0;
}

@media screen and (max-width: 970px) {
  .product-table {
    grid-template-columns: repeat(auto-fill, minmax(201px, 1fr));
  }
}
</style>
