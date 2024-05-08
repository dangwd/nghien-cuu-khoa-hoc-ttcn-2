<template>
  <aside class="bg-white border-l shadow-lg z-10 fixed h-full right-0 top-16 w-80">
    <div class="pt-2">
      <div class="p-2 m-2 border-2 border-green-600 rounded-xl">
        <div class="p-2">
          <h1 class="text-base font-semibold text-gray-700">Trang web chính thức:</h1>
          <button
            class="text-sm border-2 mb-2 border-green-700 bg-green-600 text-white hover:bg-white hover:text-green-700 font-semibold p-2 rounded-lg w-full">
            <a href="https://vnua.edu.vn/">VNUA</a>
          </button>
          <button
            class="text-sm border-2 border-green-700 bg-white text-green-700 hover:bg-green-700 hover:text-white font-semibold p-2 rounded-lg w-full">
            <a href="https://fita.vnua.edu.vn/">FITA</a>
          </button>
        </div>
      </div>
      <div class="p-2 m-2 border-2 border-green-600 rounded-xl">
        <div class="p-2">
          <h1 class="text-base font-semibold text-gray-700 pb-2">Có thể bạn sẽ thích!</h1>
          <ul v-for="(item, index) in itemsSide" :key="index" class="space-y-2 font-medium">
            <li>
              <a href="#"
                class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span><i class='bx bx-message-square-dots text-sm font-semibold'></i></span>
                <span class="flex-1 ms-3 whitespace-nowrap">{{ shortenText(item.name, 25) }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <footer class="fixed bottom-2 right-4">
        <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href=""
              class="hover:underline">NMD™</a>. All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  </aside>
</template>
<script setup>
import { computed, ref } from "vue";
const shortenText = computed(() => {
  return (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    } else {
      return description.slice(0, maxLength) + "...";
    }
  };
})
const itemsSide = ref([
  {
    name: "MediaTek Dimensity 6300: Tăng 50% hiệu năng GPU cho những chiếc điện thoại bình dân"
  },
  {
    name: "Trải nghiệm tai nghe fullsize chuyên cho dân làm âm thanh: Sennheiser HD 490 Pro"
  },
  {
    name: "Trải nghiệm tính năng Photo Remaster trên Galaxy A35 5G: Chỉnh sửa ảnh tự động, nhanh và tiện lợi"
  },
  {
    name: "Google sẽ ngưng tiện ích Google One VPN từ cuối năm nay"
  },
  {
    name: "Một thị trường Apple Vision Pro đang âm thầm chiếm lĩnh: Bảo trì và lắp ráp động cơ hàng không"
  },
  {
    name: "Google sẽ mang công cụ chỉnh sửa ảnh AI lên iPhone vào ngày 15/5 tới, không cần trả phí"
  },
  {
    name: "Apple cho phép những trình giả lập game cũ phân phối trên App Store"
  },
  {
    name: "Hướng nghiệp CNTT – Định hướng nghề nghiệp cho các bạn trẻ"
  },
  {
    name: "Nông nghiệp phát triển"
  }, {
    name: "Ngành thiết kế website còn hot không ?"
  },

])
</script>