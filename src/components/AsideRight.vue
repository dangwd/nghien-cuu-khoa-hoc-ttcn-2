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
          <h1 class="text-base font-semibold text-gray-700 pb-2">Top bài viết trong tuần qua!</h1>
          <ul v-for="(item, index) in itemsSide" :key="index" class="space-y-2 font-medium">
            <li>
              <router-link @click="getPost(item.id)" :to="'/detail-toptier/' + item.id"
                class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span class="badge text-xs font-semibold text-green-700"> {{ index + 1 }}</span>
                <span class="flex-1 ms-3 whitespace-nowrap">{{ shortenText(item.title, 25) }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href=""
            class="hover:underline">NMD™</a>. All Rights Reserved.
        </span>
      </div>
    </div>
  </aside>
</template>
<script setup>
import { getPostTopTier } from "@/api/auth/api";
import { computed, onMounted, ref } from "vue";
import store from '@/store';

const shortenText = computed(() => {
  return (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    } else {
      return description.slice(0, maxLength) + "...";
    }
  };
})
const itemsSide = ref([])
onMounted(() => {
  fetchPostTopTiers()
})
const fetchPostTopTiers = async () => {
  try {
    await getPostTopTier().then((res) => {
      itemsSide.value = res.data.content
    })
  } catch (err) {
    console.log(err)
  }
}
const getPost = (id) => {
  store.dispatch('fetchPostTopTierById', id)
}

</script>