<template>
  <div>
    <div class="w-full h-full">
      <HeaderView />
    </div>
    <div class="pt-20">
      <AsideView />

      <div class=" mx-auto h-full">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>
<script setup>
import AsideView from '@/components/AsideView.vue';
import HeaderView from '@/components/HeaderView.vue';
</script>
<style></style>