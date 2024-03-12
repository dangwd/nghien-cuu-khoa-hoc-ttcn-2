<template>
  <div>
    <div class="w-full h-full">
      <HeaderView />
    </div>
    <div class="pt-24">
      <div class=" w-[900px] m-auto h-full">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>
<script setup>
import HeaderView from '@/components/HeaderView.vue';

</script>
<style></style>