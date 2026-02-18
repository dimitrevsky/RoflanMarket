<script setup lang="ts">
import type { ProductFilter } from "~/types/filter";
import type { SortOption } from "~/types/sort";

const props = defineProps<{
  filters: ProductFilter;
  sortBy: SortOption;
}>();

const emit = defineEmits<{
  (e: "update:filters", value: ProductFilter): void;
  (e: "update:sortBy", value: SortOption): void;
}>();

function updateFilters(partial: Partial<ProductFilter>) {
  emit("update:filters", {
    ...props.filters,
    ...partial,
  });
}

function onCategoryChange(event: Event) {
  updateFilters({
    category: (event.target as HTMLSelectElement).value || null,
  });
}

function onSortChange(event: Event) {
  emit("update:sortBy", (event.target as HTMLSelectElement).value as SortOption);
}
</script>

<template>
  <aside class="aside">
    <select class="genre-select" :value="filters.category ?? ''" @change="onCategoryChange">
      <option value="" selected="true">Все категории</option>
      <option value="beauty">Косметика</option>
      <option value="furniture">Мебель</option>
      <option value="groceries">Продукты</option>
    </select>

    <input class="price-input" type="number" placeholder="Мин. цена" v-model.number="filters.minPrice" />
    <input class="price-input" type="number" placeholder="Макс. цена" v-model.number="filters.maxPrice" />

    <select class="genre-select" :value="sortBy" @change="onSortChange">
      <option value="none">Без фильтрации</option>
      <option value="price-desc">Цена ↓</option>
      <option value="price-asc">Цена ↑</option>
      <option value="rating-desc">Рейтинг ↓</option>
      <option value="rating-asc">Рейтинг ↑</option>
    </select>
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

.genre-select {
  width: 100%;
  margin-bottom: 12px;
  padding: 3px 5px;
  border: none;
  border: 2px solid var(--border-color);
  border-radius: 8px;
}

.genre-select:focus-visible {
  border: none;
  border: 2px solid var(--border-color);
}

.price-input {
  width: 100%;
  padding: 3px 5px;
  border: 2px dashed var(--border-color);
  border-radius: 8px;
  margin-bottom: 3px;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  appearance: none;
}
</style>
