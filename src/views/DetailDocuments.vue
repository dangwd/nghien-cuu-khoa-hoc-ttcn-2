<template>
  <AsideView></AsideView>
  <div class="mx-auto max-w-3xl">
    <div>
      <div class="py-4 flex justify-end items-center">
        <router-link to="/document">
          <button
            class="w-10 h-10 text-white transition ease-in-out hover:scale-105 duration-150 bg-green-600 hover:bg-green-700 rounded-full">
            <i class='bx bx-chevron-left text-2xl font-semibold '></i>
          </button>
        </router-link>
      </div>

    </div>
    <div class="w-full  bg-white shadow rounded-xl">
      <div class="flex p-3 gap-2">
        <div>
          <img class="w-60 h-auto rounded-lg"
            src="https://nativex.edu.vn/wp-content/uploads/2023/11/tai-lieu-mien-phi-ielts-simon-thumbnail.jpg">
        </div>
        <div>
          <div class="text-left px-2">
            <h2 class="card-title text-lg">Tài liệu bộ môn Vuejs</h2>
            <div class="pt-2 flex gap-2">
              <p class="text-sm">Ngày đăng: 8/5/2024</p>
              <p class="text-sm">Mô tả: Slide bài giảng ngày 8/5/2024 </p>
              <p class="text-sm ">Tác giả: Nguyễn Minh Đăng</p>
            </div>
          </div>
          <div class="px-2 pt-2 flex gap-3 items-center">
            <Button :config="{ label: 'Lấy link tải', click: () => downloadResumePdf() }"></Button>
            <a class="text-sm hover:text-green-700 underline" v-if="urlDownload" :href="urlDownload">Bấm vào đây để tải
              xuống</a>
          </div>
        </div>
      </div>
    </div>
    <button></button>
  </div>
  <AsideRight></AsideRight>
</template>
<script setup>
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { ref } from 'vue';
const urlDownload = ref("")
const urlFile = ref("")
const downloadResumePdf = () => {
  const resumeRef = firebase.storage()
    .ref('documents/1.Nhung_van_de_co_ban_cua_QT.pdf');
  resumeRef.getDownloadURL().then((url) => {
    urlDownload.value = url

  }).catch((error) => {
    console.log(error)
  });
}
</script>
<style></style>