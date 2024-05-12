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
            <div>
              <button class="text-white border border-green-700 text-sm bg-green-700 p-2 rounded-lg"><a target="_blank"
                  :href="urlDownload">Tải
                  xuống</a></button>
              <button
                class="text-green-700 border mx-2 border-green-700 text-sm bg-white py-2 px-4 rounded-lg">Lưu</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  <AsideRight></AsideRight>
</template>
<script setup>
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { ref } from 'vue';
const urlDownload = ref("https://firebasestorage.googleapis.com/v0/b/vnua-forums-upload.appspot.com/o/image%2F123.webp?alt=media&token=276894da-2b62-4c25-b8c1-42b9096cf8c4")
const showCountdown = ref(true)
const countdown = ref(10)
// const urlFile = ref("")
// const downloadResumePdf = () => {
//   const resumeRef = firebase.storage()
//     .ref('documents/TTCN2-NCKH-NguyenMinhDang.pptx');
//   resumeRef.getDownloadURL().then((url) => {
//     urlDownload.value = url
//     startCountdown()
//   }).catch((error) => {
//     console.log(error)
//   });
// }
// const startCountdown = () => {
//   setTimeout(() => {
//     showCountdown.value = false;
//   }, countdown.value * 1000);

//   // Bắt đầu đếm ngược
//   let timer = setInterval(() => {
//     countdown.value--;
//     if (countdown.value <= 0) {
//       clearInterval(timer);
//     }
//   }, 1000);
// }
</script>
<style></style>