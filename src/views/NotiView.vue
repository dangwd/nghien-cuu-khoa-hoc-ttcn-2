<template>
  <AsideView></AsideView>
  <div class="max-w-4xl mx-auto">
    <div class="py-4">
      <div role="alert" class="alert bg-gray-50 border-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class="text-gray-700 font-bold">Kênh thông báo chính thức của Học Viện Nông Nghiệp Việt Nam</span>
      </div>
    </div>
    <div v-for="(info, index) in listInfos" :key="index"
      class="card my-4 w-full bg-gray-50 shadow-xl hover:text-green-600 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-150 hover:bg-gray-100 hover:shadow-lg">
      <div class="card-body">
        <h2 class="card-title">{{ info.title }}</h2>
        <p class="text-sm italic text-center my-2">Bấm vào để xem chi tiết!</p>
      </div>
    </div>
  </div>
</template>
<script setup>
const listInfos = [
  {
    title: "Thông báo đăng ký học phần trong thời gian hè năm học 2023-2024 (04 /05 / 2024)"
  },
  {
    title: "Thông báo đăng ký học phần trong thời gian hè năm học 2023-2024 (04 /05 / 2024)"
  },
  {
    title: "Thông báo đăng ký học phần trong thời gian hè năm học 2023-2024 (04 /05 / 2024)"
  },
  {
    title: "Thông báo đăng ký học phần trong thời gian hè năm học 2023-2024 (04 /05 / 2024)"
  },
  {
    title: "Thông báo đăng ký học phần trong thời gian hè năm học 2023-2024 (04 /05 / 2024)"
  },
  {
    title: "Thông báo đăng ký học phần trong thời gian hè năm học 2023-2024 (04 /05 / 2024)"
  },
]
</script>
<style></style>