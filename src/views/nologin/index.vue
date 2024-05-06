<template>
  <div v-if="isLoading">
    <div class="flex items-center justify-center h-screen">
      <div class="rounded-md h-12 w-12 border-4 border-t-4 border-green-500 animate-spin absolute"></div>
    </div>
  </div>
  <div v-else class="w-full flex flex-row flex-wrap max-w-3xl mx-auto">
    <div class="h-20 w-full pt-2">
      <router-link to="/login" class="px-2.5 flex items-center justify-between">
        <h1 class="text-base font-semibold">Đăng nhập để có trải nghiệm tốt nhất!</h1>
        <button type="button"
          class="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Quay
          lại
          trang đăng nhập</button>
      </router-link>
    </div>
    <div class="w-full  h-screen flex flex-row flex-wrap justify-center">
      <div>
        <div v-show="!isSidebarOpen">
          <button @click="toggleSidebar" class="fixed top-16 left-1 z-50">
            <i class='bx bx-chevron-right text-2xl font-bold'></i>
          </button>
        </div>
        <aside id="default-sidebar" class="fixed top-0 left-0 z-40 lg:w-72 h-screen transition-transform"
          :class="{ '-translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen }" aria-label="Sidebar">
          <div class="h-full px-3 py-4 overflow-y-auto bg-white shadow-lg">
            <div class="flex justify-between items-center py-3 hover:bg-gray-100 px-2 rounded-lg">
              <div>
                <button @click="showInfo" class="flex items-center gap-2">
                  <img class="w-10 h-10 rounded-full" src="../../assets/img/vnua-logo.jpg" alt="">
                  <h1 class="text-sm font-semibold text-gray-700">Khách</h1>
                </button>
              </div>
              <div v-show="isSidebarOpen">
                <button @click="toggleSidebar">
                  <i class='bx bx-chevron-left text-2xl font-bold'></i>
                </button>
              </div>
            </div>
            <ul @click="showInfo" v-for="(item, index) in menuList" :key="index" class="space-y-2 font-medium">
              <li>
                <router-link to="/login"
                  class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <span><i :class='item.icon'></i></span>
                  <span class="flex-1 ms-3 whitespace-nowrap">{{ item.name }}</span>
                </router-link>
              </li>
            </ul>
            <div class="pt-4">
              <h1 class="text-sm font-semibold text-gray-700">#HashTag</h1>
            </div>
            <ul v-for="(item, index) in itemsSide" :key="index" class="space-y-2 font-medium">
              <li>
                <a href="#"
                  class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <span><i class='bx bx-message-square-dots text-lg font-semibold'></i></span>
                  <span class="flex-1 ms-3 whitespace-nowrap">{{ item.name }}</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
      <div class="w-full md:w-3/4 lg:w-4/5 p-5 md:px-12 lg:24 h-full antialiased">
        <div v-for="(post, index) in posts" :key="index" class="mt-3 flex flex-col">
          <div class="bg-white mt-3  hover:shadow-lg">
            <img class="border rounded-t-xl shadow-xl w-full" :src="post.image">
            <div class="bg-white border-b border-1 shadow p-5 text-xl text-gray-700 font-semibold">
              <div class="flex items-center gap-4">
                <img class="w-10 h-10 rounded-full" :src="post.user.avatar" alt="">
                <div class="font-medium dark:text-white">
                  <div class="font-semibold">{{ post.user.fullName }} <span v-show="post.user.role === 'ROLE_ADMIN'"><i
                        class='bx bxs-check-shield text-blue-500'></i></span></div>
                  <div class="text-sm text-gray-500 dark:text-gray-400 italic">Ngày đăng: {{ post.createdDate }}
                    <i class='bx bx-check text-green-500 text-lg'></i>
                  </div>
                </div>
              </div>
              <div class="py-5">
                <h1 class="mb-4 text-3xl font-extrabold text-gray-700 md:text-5xl lg:text-6xl"><span
                    class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                    {{ post.title }}</span></h1>
              </div>
              <div v-html="post.content" class="py-5"></div>
              <!-- Reaction -->
              <div>
                <div class="flex gap-5">
                  <h1><i class='bx bx-like text-blue-600'></i> <span class="text-gray-700">{{ post.numLike }}</span>
                  </h1>
                  <h1><i class='bx bx-message-square-dots text-red-600'></i> <span class="text-gray-700">{{
                    post.numComment
                      }}</span>
                  </h1>
                </div>
              </div>
            </div>
            <div class="bg-white p-1 shadow flex flex-row flex-wrap rounded-b-xl justify-center">
              <h1 class="italic text-base">Thao tác sẽ hiển thị khi bạn đăng nhập!</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAllPostPublic } from '@/api/auth/api'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import AsideView from '@/components/AsideView.vue';
import 'firebase/compat/storage';
export default {
  components: {
    AsideView
  },
  data() {
    return {
      statusLike: false,
      comments: [],
      isLoading: true,
      posts: [],
      isSidebarOpen: true,
      menuList: [
        {
          name: "Trang chủ",
          url: "/",
          icon: "bx bx-home-alt-2 text-lg font-semibold"
        },
        {
          name: "Tài liệu",
          url: "/login",
          icon: "bx bx-file text-lg font-semibold"
        },
        {
          name: "Danh mục",
          url: "/login",
          icon: "bx bx-list-ol text-lg font-semibold"
        },
        {
          name: "Thông báo",
          url: "/login",
          icon: "bx bx-bell text-lg font-semibold"
        },
        {
          name: "Giới thiệu chung",
          url: "introduce",
          icon: "bx bx-news text-lg font-semibold"
        }
      ],
    }
  },

  mounted() {
    this.fetchAllPostPub()
      .then(() => {
        setTimeout(() => {
          this.isLoading = false
        }, 700)
      })
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    formatStatus(value) {
      switch (value) {
        case 'ROLE_USER':
          return 'Bài viết chờ duyệt'
        case 'ROLE_ADMIN':
          return 'Đã duyệt'
      }
    },
    showMessage() {
      toast("Chức năng đang được xây dựng", {
        "theme": "colored",
        "type": "info",
        "limit": 3,
        "dangerouslyHTMLString": true
      })
    },
    showInfo() {
      toast("Bạn cần đăng nhập để thực hiện thao tác này!", {
        "theme": "colored",
        "type": "info",
        "limit": 3,
        "dangerouslyHTMLString": true
      })
    },
    showSuccess() {
      toast("Thao tác thành công!", {
        "theme": "colored",
        "type": "success",
        "limit": 3,
        "dangerouslyHTMLString": true
      })
    },
    async fetchAllPostPub() {
      try {
        await getAllPostPublic().then((res) => {
          this.posts = res.data.content
        })
      } catch (err) {
        console.log(err)
      }
    },
  }
}
</script>
<style>
.round {
  border-radius: 50%;
}
</style>