<template>
  <AsideView></AsideView>

  <div class="max-w-3xl mx-auto">
    <div v-if="state == 'default'">
      <div class="py-4">
        <div role="alert" class="alert bg-gray-50 border-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            class="stroke-current shrink-0 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="text-gray-700 font-bold">Kênh thông báo chính thức của Học Viện Nông Nghiệp Việt Nam</span>
        </div>
      </div>
      <div @click="viewDetail(info.id)" v-for="(info, index) in listInfos" :key="index"
        class="card my-4 w-full bg-gray-50 shadow-xl hover:text-green-600 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-150 hover:bg-gray-100 hover:shadow-lg">
        <div class="card-body">
          <h2 class="card-title">{{ info.title }}</h2>
          <p class="text-sm italic text-center my-2">Bấm vào để xem chi tiết!</p>
        </div>
      </div>
    </div>
    <div v-if="state == 'detail'">
      <div class="py-4 flex justify-between">
        <h1 class="text-base font-semibold text-gray-700">Chi tiết thông báo</h1>
        <button @click="back()" id="scroll-button"
          class="w-10 h-10 text-white transition ease-in-out hover:scale-105 duration-150 bg-green-600 hover:bg-green-700 rounded-full">
          <i class='bx bx-chevron-left text-2xl font-semibold '></i>
        </button>
      </div>
      <div>
        <h1>Thời gian đăng: <span class="font-semibold text-gray-700">{{ notiDetail.createdTime }}</span></h1>
        <h1>Người đăng: <span class="font-semibold text-gray-700">Quản trị viên</span></h1>
      </div>
      <img :src="notiDetail.image" alt="">
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { getAllNotification, getNotiById } from '@/api/auth/api';
const listInfos = ref([])
const notiDetail = ref({})
const state = ref("default");

onMounted(() => {
  fetchAllNoti()
})
const fetchAllNoti = async () => {
  try {
    await getAllNotification().then((res) => {
      listInfos.value = res.data.content
    })
  } catch (err) {
    console.log(err)
  }
}

const viewDetail = async (value) => {
  state.value = "detail"
  try {
    await getNotiById(value).then((res) => {
      notiDetail.value = res.data

    })
  } catch (err) {
    console.log(err)
  }
}
const back = () => {
  state.value = "default"
}
window.addEventListener('scroll', () => {
  const scrollButton = document.getElementById('scroll-button');
  if (scrollButton) {
    if (window.scrollY > 100) {
      scrollButton.classList.add('sticky');
    } else {
      scrollButton.classList.remove('sticky');
    }
  }
});
</script>
<style>
#scroll-button.sticky {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>