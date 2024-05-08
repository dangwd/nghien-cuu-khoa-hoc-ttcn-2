<template>
  <div v-if="isLoading">
    <div class="flex items-center justify-center h-screen">
      <div class="rounded-md h-12 w-12 border-4 border-t-4 border-green-500 animate-spin absolute"></div>
    </div>
  </div>
  <div v-else>
    <AsideView></AsideView>
    <div class="max-w-3xl mx-auto">
      <h1 class="text-base font-medium">Kết quả tìm kiếm liên quan đến: <span class="font-semibold italic">{{
        $route.query.q }}</span>
      </h1>
      <div>
        ND tim kiem dc
      </div>
    </div>
    <AsideRight />
  </div>
</template>
<script setup>
import { ref } from 'vue';
const isLoading = ref(false)
</script>
<style></style>