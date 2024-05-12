<template>
  <AsideView></AsideView>
  <div class="max-w-3xl mx-auto">
    <div class="mt-2 bg-white rounded-xl border">
      <h1 class="text-base font-semibold mx-4 mt-4">Danh mục bài viết</h1>
      <div class="p-3 ">
        <div class="flex gap-3 flex-wrap mx-auto">
          <div v-for="(item, index) in listCategory" :key="index">
            <button
              class="p-2 text-sm text-green-700 bg-white rounded-full border-2 border-green-700 hover:text-white hover:bg-green-600 hover:border-green-600">
              #{{ item.name }}
            </button>

          </div>
        </div>
      </div>
    </div>
  </div>
  <aside-right />
</template>
<script setup>
import { ref } from 'vue';

const listCategory = ref([
  {
    name: "CNTT"
  },
  {
    name: "Cơ hội học bổng"
  },
  {
    name: "Chăn nuôi"
  },
  {
    name: "KHMT"
  },
  {
    name: "MMT"
  },
  {
    name: "Việc làm"
  },
])
</script>
<style></style>