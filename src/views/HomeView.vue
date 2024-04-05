<template>
  <div v-if="isLoading">
    <div class="flex items-center justify-center h-screen">
      <div class="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
    </div>
  </div>
  <div v-else class="w-full flex flex-row flex-wrap max-w-5xl mx-auto">
    <div class="w-full  h-screen flex flex-row flex-wrap justify-center ">
      <div class="w-full md:w-3/4 lg:w-4/5 p-5 md:px-12 lg:24 h-full antialiased">
        <div class="bg-white w-full shadow rounded-lg p-5">
          <h1>Dang bai</h1>
        </div>
        <div class="pt-5 flex justify-end">
          <Pagination :currentPage="paginationData.currentPage" :totalPages="paginationData.totalPages"
            @update:currentPage="fetchAllPostPub($event)"></Pagination>
        </div>
        <div v-for="(post, index) in posts" :key="index" class="mt-3 flex flex-col">
          <div class="bg-white mt-3  hover:shadow-lg">
            <router-link :to="'/detail-post/' + post.id">
              <img class="border rounded-t-xl shadow-xl w-full" :src="post.image">

              <div class="bg-white border-b border-1 shadow p-5 text-xl text-gray-700 font-semibold">
                <div class="flex items-center gap-4">
                  <img class="w-10 h-10 rounded-full" :src="post.user.avatar" alt="">
                  <div class="font-medium dark:text-white">
                    <div class="font-semibold">{{ post.user.fullName }} <span
                        v-show="post.user.role === 'ROLE_ADMIN'"><i
                          class='bx bxs-check-shield text-blue-500'></i></span></div>
                    <div class="text-sm text-gray-500 dark:text-gray-400 underline">Ngày đăng: {{ post.createdDate }}
                      <i class='bx bx-check text-green-500 text-lg'></i>
                    </div>
                  </div>
                </div>
                <div class="py-5">
                  <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span
                      class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                      {{ post.title }}</span></h1>
                </div>
                <!-- Reaction -->
                <div>
                  <div class="flex gap-5">
                    <h1><i class='bx bx-like text-blue-600'></i> <span class="text-gray-700">{{ like }}</span></h1>
                    <h1><i class='bx bx-message-square-dots text-red-600'></i> <span class="text-gray-700">10</span>
                    </h1>
                  </div>
                </div>
              </div>
            </router-link>
            <div class="bg-white p-1 shadow flex flex-row flex-wrap rounded-b-xl">
              <div @click="increaseLike()"
                class="w-1/3 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-150 hover:bg-blue-500 hover:shadow-lg text-center text-xl rounded-xl text-gray-700 hover:text-white font-semibold">
                Like</div>
              <router-link :to="'/detail-post/' + post.id"
                class="w-1/3 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-150 hover:bg-red-500 hover:text-white hover:shadow-lg rounded-xl text-center text-xl text-gray-700 font-semibold">
                Comment
              </router-link>
              <div
                class="w-1/3 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-150 hover:bg-green-500 hover:text-white hover:shadow-lg rounded-xl text-center text-xl text-gray-700 font-semibold">
                Share</div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAllPostPublic } from '@/api/auth/api'
export default {
  data() {
    return {
      like: 0,
      paginationData: {
        currentPage: 1,
        totalPages: 0,
      },
      isLoading: true,
      posts: []
    }
  },
  mounted() {
    this.fetchAllPostPub(this.paginationData.currentPage)
      .then(() => {
        setTimeout(() => {
          this.isLoading = false
        }, 700)
      })
  },
  methods: {
    increaseLike() {
      this.like++
    },
    async fetchAllPostPub(page) {
      try {
        await getAllPostPublic(page).then((res) => {
          this.posts = res.data.content
          this.paginationData.totalPages = res.data.totalPages
        })
      } catch (err) {
        console.log(err)
      }
    }

  }
}
</script>
<style>
.round {
  border-radius: 50%;
}
</style>