<template >
  <div>
    <ModalComp :modalIdProps="'noti-modal'">
      <template #btn>
        <div>
          Noti
        </div>
      </template>
      <template #header>
        <div>
          Header
        </div>
      </template>
      <template #content>
        <div>
          ND
        </div>
      </template>
    </ModalComp>
  </div>
</template>
<script setup>
import ModalComp from '../components/Modal/ModalComp.vue'
</script>
<style></style>