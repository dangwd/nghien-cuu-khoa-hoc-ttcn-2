<template>
  <div>
    <div v-show="!isSidebarOpen">
      <button @click="toggleSidebar" class="fixed top-24 left-1 z-50">
        <i class='bx bx-chevron-right text-2xl font-bold'></i>
      </button>
    </div>
    <aside id="default-sidebar" class="fixed top-16 left-0 z-40 border-r w-80 h-screen transition-transform"
      :class="{ '-translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen }" aria-label="Sidebar">
      <div class="h-full px-3 py-4 overflow-y-auto bg-white shadow-lg">
        <div class="flex justify-between items-center py-3 hover:bg-gray-100 px-2 rounded-lg">
          <div>
            <router-link class="flex items-center gap-2" to="/user-info">
              <img class="w-10 h-10 rounded-full" :src="user.avatar" alt="">
              <h1 class="text-sm font-semibold text-gray-700">{{ user.fullName }}</h1>
            </router-link>
          </div>
          <div v-show="isSidebarOpen">
            <button @click="toggleSidebar">
              <i class='bx bx-chevron-left text-2xl font-bold'></i>
            </button>
          </div>
        </div>
        <ul v-for="(item, index) in menuList" :key="index" class="space-y-2 font-medium">
          <li>
            <router-link :to="item.url" :class="{ 'bg-green-600 text-white hover:bg-green-700 ': isSelected(item) }"
              class="flex items-center p-2 text-gray-700 rounded-lg hover:text-gray-800 hover:bg-gray-100 group">
              <span><i :class='item.icon'></i></span>
              <span class="flex-1 ms-3 whitespace-nowrap">{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
        <div class="pt-4">
          <h1 class="text-sm font-semibold text-gray-700">Danh mục</h1>
        </div>
        <ul v-for="(item, index) in cateSide" :key="index" class="space-y-2 font-medium">
          <li>
            <router-link @click="fetchPostByCateId(item.id)" :to="'/detail-cate/' + item.id"
              class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <span><i class='bx bx-category text-lg font-semibold'></i></span>
              <span class="flex-1 ms-3 whitespace-nowrap">{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>
<script>
import { sendGetApi } from '@/api/auth/api';
import store from '@/store';
export default {
  data() {
    return {
      isSidebarOpen: true,
      selectedMenuItem: null,
      menuList: [
        {
          name: "Trang chủ",
          url: "/homepage",
          icon: "bx bx-home-alt-2 text-lg font-semibold"
        },
        {
          name: "Tài liệu",
          url: "/document",
          icon: "bx bx-file text-lg font-semibold"
        },
        {
          name: "Danh mục",
          url: "/news",
          icon: "bx bx-list-ol text-lg font-semibold"
        },
        {
          name: "Thông báo",
          url: "/notification",
          icon: "bx bx-bell text-lg font-semibold"
        },
        {
          name: "Giới thiệu chung",
          url: "/introduce",
          icon: "bx bx-news text-lg font-semibold"
        }
      ],
      cateSide: []
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },

  },
  mounted() {
    this.fetchAllCategory()
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    async fetchAllCategory() {
      try {
        await sendGetApi(`/category/public/get-Top5-category?size=5`).then((res) => {
          this.cateSide = res.data.content
          console.log(this.cateSide)
        })
      } catch (err) {
        console.log(err)
      }
    },
    isSelected(item) {
      return item.url === '/' && this.$route.path === '/' || item.url !== '/' && this.$route.path.startsWith(item.url);
    },
    fetchPostByCateId(id) {
      store.dispatch('fetchPostByCateId', id)
    }
  },
}
</script>
<style></style>