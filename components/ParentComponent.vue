<script lang="ts" setup>
import { ref } from "vue";
import type { Product } from "~/types/product";
import ProductCard from "./product/ProductCard.vue";

const products = ref<Product[]>([]);
const error = ref<string | null>(null);

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
  }
}

onMounted(fetchProductsList); //коллбек запроса
</script>

<template>
  <Haeder />
  <main>
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </main>
</template>

<style scoped>
main {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  justify-items: center;
  gap: 24px 16px;
  justify-content: flex-start;
  padding-bottom: 40px;
}
</style>
