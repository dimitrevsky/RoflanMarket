<template>
  <div>asdasd</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { Product } from "~/types/product";

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
    console.log("✅ всё заебись:", products.value); // отладка
  } catch (e: any) {
    error.value = e.message; // на всякий случай
  }
}

onMounted(() => {
  fetchProductsList(); //коллбек запроса
});
</script>

<style></style>
