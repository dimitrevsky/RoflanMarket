<script setup lang="ts">
import type { ProductFilter } from "~/types/filter";

const props = defineProps<{ filters: ProductFilter }>();
const emit = defineEmits<{ (e: "update:filters", value: ProductFilter): void }>();

function updateFilters(partial: Partial<ProductFilter>) {
  emit("update:filters", { ...props.filters, ...partial });
}

function onCategoryChange(event: Event) {
  updateFilters({ category: (event.target as HTMLSelectElement).value || null });
}
</script>

<template>
  <aside class="aside">
    <select :value="filters.category ?? ''" @change="onCategoryChange">
      <option value="" selected="true">Все категории</option>
      <option value="beauty">Косметика</option>
      <option value="furniture">Мебель</option>
      <option value="groceries">Продукты</option>
    </select>

    <input type="number" placeholder="Мин. цена" v-model.number="filters.minPrice" />
    <input type="number" placeholder="Макс. цена" v-model.number="filters.maxPrice" />
  </aside>
</template>

<style scoped>
.aside {
  width: 296px;
  height: 296px;
  padding: 24px;
  margin-top: 39px;
  border: 3px solid var(--border-color);
  position: sticky;
  top: 10px;
  border-radius: 32px;
}
</style>
