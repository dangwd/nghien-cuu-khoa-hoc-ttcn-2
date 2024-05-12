<template>
  <div>
    <div v-if="isLoading">
      <div class="flex items-center justify-center h-screen">
        <div class="rounded-md h-12 w-12 border-4 border-t-4 border-green-500 animate-spin absolute"></div>
      </div>
    </div>
    <div v-else class="w-full flex flex-row flex-wrap mx-auto">
      <div class="navbar bg-white fixed z-50">
        <div class="navbar-start flex gap-2 items-center">
          <router-link to="/"><img class="w-14 h-auto" src="../../assets/img/vnua-logo.jpg" alt="" />
          </router-link>
          <h1 class="gap-2 font-bold text-xl text-green-700">VNUA Forums</h1>
        </div>
        <div class="navbar-center mx-auto hidden lg:flex">
          <div class="flex items-center gap-2">
            <InputField :value="searchQuery" @input-change="setSearch" type="custom-input"
              customClass="shadow-sm bg-gray-100 border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-[670px] p-2 my-2"
              placeholder="Tìm kiếm...">
            </InputField>
            <Button btnIcon="icon" iconBtnClass="bx bx-search" btnClass="bg-green-600 text-white hover:bg-green-700"
              :config="{ click: () => showInfo() }"></Button>
          </div>
        </div>
        <div class="navbar-end">
          <router-link to="/login" class="px-2.5 flex items-center justify-between">
            <button type="button"
              class="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Quay
              lại
              trang đăng nhập</button>
          </router-link>
        </div>
      </div>
      <div class="w-full h-screen flex flex-row flex-wrap justify-center">
        <div>
          <div v-show="!isSidebarOpen">
            <button @click="toggleSidebar" class="fixed top-24 left-1 z-50">
              <i class='bx bx-chevron-right text-2xl font-bold'></i>
            </button>
          </div>
          <aside id="default-sidebar" class="fixed top-16 left-0 z-40 lg:w-72 h-screen transition-transform"
            :class="{ '-translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen }" aria-label="Sidebar">
            <div class="h-full px-3 py-4 overflow-y-auto bg-white shadow-lg">
              <div class="flex justify-between items-center py-3 hover:bg-gray-100 px-2 rounded-lg">
                <div>
                  <button @click="showInfo" class="flex items-center gap-2">
                    <img class="w-10 h-10 rounded-full"
                      src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt="">
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
              <div class="bg-green-600 rounded-lg w-full h-80 p-4">
                <div class="text-white font-semibold text-base">
                  <h1 class="pb-2">Ủng hộ chúng tớ tại:</h1>
                  <!-- <img src="../../../src/assets/img/donate.jpg" alt=""> -->
                </div>
              </div>
            </div>
          </aside>
        </div>
        <div class="w-full md:w-3/4 lg:w-4/5 p-5 md:px-12 lg:24 h-full pt-20 max-w-3xl antialiased">
          <div class="bg-white w-full shadow rounded-xl p-5">
            <div class="flex gap-2">
              <img class="w-10 h-10 rounded-full"
                src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt="">
              <input type="text"
                class="w-full p-2 text-gray-700 border border-gray-200 rounded-full bg-gray-50 text-sm italic" disabled>
            </div>
            <h1 class="italic text-base text-center pt-2">Chức năng đăng bài sẽ hiển thị khi bạn đăng nhập!</h1>
          </div>
          <div v-for="(post, index) in posts" :key="index" class="mt-3 flex flex-col">
            <div class="bg-white mt-3 rounded-lg">
              <img class="border rounded-t-xl shadow-xl w-full" :src="post.image">
              <div class="bg-white border-b border-1 shadow p-5 text-xl text-gray-700 font-semibold">
                <div class="flex items-center gap-4">
                  <img class="w-10 h-10 rounded-full" :src="post.user.avatar" alt="">
                  <div class="font-medium">
                    <div class="font-semibold text-base">{{ post.user.fullName }} <span
                        v-show="post.user.role === 'ROLE_ADMIN'"><i
                          class='bx bxs-check-shield text-blue-500'></i></span>
                    </div>
                    <div class="flex gap-2">
                      <h1 class="text-xs text-gray-500">{{ post.createdTime }} /</h1>
                      <h1 class="text-xs text-gray-500">{{ post.createdDate }}</h1>
                      <i class='bx bxs-planet text-xs text-gray-500'></i>
                    </div>
                  </div>
                </div>
                <div class="py-5">
                  <h1 class="mb-4 text-lg font-extrabold text-gray-700"><span
                      class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                      {{ post.title }}</span></h1>
                  <div class="text-base font-medium" v-html="post.content"></div>
                </div>
                <!-- Reaction -->
                <div>
                  <div class="flex gap-5">
                    <h1><i class='bx bxs-heart text-green-600 font-semibold'></i> <span
                        class="text-gray-700 text-base">{{
                          post.numLike
                        }}</span>
                    </h1>
                    <h1><i class='bx bxs-message-square-dots text-blue-600 font-semibold'></i> <span
                        class="text-gray-700 text-base">{{
                          post.numComment
                        }}</span>
                    </h1>
                  </div>
                </div>
              </div>
              <div class="bg-white p-1 shadow flex rounded-b-xl justify-center">
                <h1 class="text-sm text-center font-medium italic">Bạn cần đăng nhập để tương tác!</h1>

              </div>
            </div>
          </div>
        </div>
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
                <h1 class="text-base font-semibold text-gray-700 pb-2">Các danh mục khác!</h1>
                <ul v-for="(item, index) in itemsSide" :key="index" class="space-y-2 font-medium">
                  <li>
                    <a target="_blank" :href="item.url"
                      class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      <span class="flex-1 ms-3 whitespace-nowrap">{{ item.title }}</span>
                    </a>
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
import AsideRight from '@/components/AsideRight.vue';
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
          url: "/no-login",
          icon: "bx bx-home-alt-2 text-lg font-semibold"
        },
        {
          name: "Thông tin tuyển sinh",
          url: "/admissions",
          icon: "bx bx-file text-lg font-semibold"
        },
        {
          name: "Thông tin quảng bá ",
          url: "/admissions",
          icon: "bx bx-file text-lg font-semibold"
        },
        {
          name: "Giới thiệu chung",
          url: "introduce",
          icon: "bx bx-news text-lg font-semibold"
        }
      ],
      itemsSide: [
        {
          title: "Thông tin tuyển sinh",
          url: "https://tuyensinh.vnua.edu.vn/"
        },
        {
          title: "Thông tin quảng bá",
          url: "https://tuyensinh.vnua.edu.vn/"
        },
      ]
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
        await getAllPostPublic(1).then((res) => {
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