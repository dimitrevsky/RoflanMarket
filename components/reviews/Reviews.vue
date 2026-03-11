<script setup lang="ts">
import ReviewCard from "./ReviewCard.vue";

const props = defineProps<{ reviews?: Array<any> }>();
</script>

<template>
  <div>
    <ReviewCard v-for="(rev, i) in props.reviews || []" :key="i" :review="rev" />
  </div>
</template>
