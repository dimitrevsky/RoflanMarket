<script lang="ts" setup>
import ParentComponent from "~/components/ParentComponent.vue";
</script>

<template>
  <Haeder />

  <main>
    <ParentComponent />
  </main>
</template>

<style scoped>
main {
  display: flex;
  width: 100%;
  gap: 20px;
}
</style>
