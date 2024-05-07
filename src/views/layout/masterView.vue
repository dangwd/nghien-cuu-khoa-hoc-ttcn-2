<template>
  <div class="flex flex-col h-screen">
    <div class="w-full">
      <HeaderView />
    </div>
    <div class="flex flex-row h-full ">
      <div class="flex-grow mx-auto h-full pt-20 ">
        <router-view></router-view>
      </div>

    </div>
  </div>
</template>
<script setup>
import AsideRight from '@/components/AsideRight.vue';
import HeaderView from '@/components/HeaderView.vue';
</script>
<style></style>