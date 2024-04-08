<template>
  <div class="max-w-4xl mx-auto">
    <h1>Thông báo</h1>
    <ImageModal>
      <template #image>
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrLdTpZ2JvdpKOyrwYPfgkrSVyCNmzT7zhK1NG2U72gg&s"
            alt="">
        </div>
      </template>
      <template #detail>
        <div class="max-w-4xl">
          <img class="w-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrLdTpZ2JvdpKOyrwYPfgkrSVyCNmzT7zhK1NG2U72gg&s"
            alt="">
        </div>
      </template>
    </ImageModal>
  </div>
</template>
<script setup>
import ImageModal from "@/components/Modal/ImageModal.vue";
</script>
<style></style>