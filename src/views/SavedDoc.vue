<template>
  <AsideView></AsideView>
  <div class="max-w-3xl mx-auto">
    <div class="pt-4 pb-2 flex justify-between items-center">
      <h1 class="text-base font-semibold text-gray-700">Tất cả bài viết đã lưu</h1>
      <div class="flex gap-2 items-center">
        <InputField type="custom-input"
          customClass="shadow-sm border border-gray-200 text-gray-700 text-sm rounded-xl focus:outline-none focus:ring-green-700 focus:border-green-700 focus:ring-1 transition ease-in-out duration-150 focus:text-green-700  block w-[300px] p-2 my-2"
          placeholder="Tìm kiếm">
        </InputField>
        <Button btnIcon="icon" iconBtnClass="bx bx-search" btnClass="bg-green-600 text-white hover:bg-green-700"
          :config="{ click: () => search() }"></Button>
      </div>
    </div>
    <div>
      <div v-for="(item, index) in docSaved" :key="index" class="w-full bg-white shadow rounded-xl my-2">
        <div class="flex p-3 gap-2">
          <div>
            <img class="w-60 h-auto rounded-lg"
              src="https://nativex.edu.vn/wp-content/uploads/2023/11/tai-lieu-mien-phi-ielts-simon-thumbnail.jpg">
          </div>
          <div>
            <div class="text-left px-2">
              <h2 class="card-title text-lg">{{ item.docTitle }}</h2>
              <div class="pt-2 flex gap-2">
                <p class="text-sm">Ngày đăng: {{ item.date }}</p>
                <p class="text-sm">Mô tả: {{ item.desc }} </p>
                <p class="text-sm ">Người đăng: {{ item.postBy }}</p>
              </div>
            </div>
            <div class="px-2 pt-2 flex gap-3 items-center">
              <button class="text-white text-sm bg-green-700 hover:bg-green-600 p-2 rounded-lg"><a target="_blank"
                  :href="urlDownload">Tải
                  xuống</a></button>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  <aside-right />
</template>
<script setup>
import { ref } from 'vue';
const docSaved = ref([
  {
    docTitle: "Tài liệu bộ môn Vuejs",
    date: "8/5/2024",
    desc: "Slide bài giảng ngày 8/5/2024",
    postBy: "Nguyễn Minh Đăng"
  },
  {
    docTitle: "Tài liệu bộ môn Vuejs",
    date: "8/5/2024",
    desc: "Slide bài giảng ngày 8/5/2024",
    postBy: "Nguyễn Minh Đăng"
  },
  {
    docTitle: "Tài liệu bộ môn Vuejs",
    date: "8/5/2024",
    desc: "Slide bài giảng ngày 8/5/2024",
    postBy: "Nguyễn Minh Đăng"
  }
])
</script>
<style>

</style>