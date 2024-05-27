<template>
  <AsideView></AsideView>
  <div class="max-w-3xl mx-auto">
    <div class="mt-2 bg-white rounded-xl border">
      <h1 class="text-base font-semibold mx-4 mt-4">Danh mục bài viết</h1>
      <div class="p-3 ">
        <div class="flex gap-3 flex-wrap mx-auto">
          <div v-for="(item, index) in listCategory" :key="index">
            <button @click="fetchPostByCateId(item.id)"
              class="p-2 text-sm text-green-700 bg-white rounded-full border-2 border-green-700 hover:text-white hover:bg-green-600 hover:border-green-600">
              #{{ item.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full antialiased">
      <div>
        <div v-for="(post, index) in Posts" :key="index" class="mt-3 flex flex-col">
          <div class="bg-white mt-3 rounded-lg">
            <img class="border rounded-t-xl shadow-xl w-full" :src="post.image">
            <div class="bg-white border-b border-1 shadow p-5 text-xl text-gray-700 font-semibold">
              <div class="flex items-center gap-4">
                <img class="w-10 h-10 rounded-full" :src="post.user.avatar" alt="">
                <div class="font-medium">
                  <div class="font-semibold text-base">{{ post.user.fullName }} <span
                      v-show="post.user.role === 'ROLE_ADMIN'"><i class='bx bxs-check-shield text-blue-500'></i></span>
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
                  <h1><i class='bx bxs-heart text-green-600 font-semibold'></i> <span class="text-gray-700 text-base">{{
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

            <div class="bg-white p-1 shadow flex flex-row flex-wrap rounded-b-xl">
              <button @click="increaseLike(post.id)" :class="{ 'text-green-600': statusLike }"
                class="w-1/3 text-center text-base rounded-xl text-gray-700 hover:text-green-600 font-semibold">
                <i class='bx bxs-heart text-lg'></i> Like
              </button>

              <router-link :to="'/detail-post/' + post.id"
                class="w-1/3 text-center text-base rounded-xl text-gray-700 hover:text-blue-600 font-semibold">
                <i class='bx bx bxs-message-square-dots text-lg'></i> Comment
              </router-link>
              <button @click="showMessage()"
                class="w-1/3 text-center text-base rounded-xl text-gray-700 hover:text-red-600 font-semibold">
                <i class='bx bxs-share'></i> Share
              </button>
            </div>
          </div>
        </div>
        <div v-if="Posts.length" v-observe-visibility="handleScroll">
        </div>
      </div>
      <AsideRight />
    </div>
  </div>
  <aside-right />
</template>
<script setup>
import { sendGetApi } from '@/api/auth/api';
import { onMounted, ref } from 'vue';


const statusLike = ref("")
const pageNum = ref(0)
const searchQuery = ref("")
onMounted(() => {
  fetchAllCategory()
})
const handleScroll = (isVisible) => {
  if (!isVisible) { return }
  pageNum.value++
  fetchPostByCateId()
}
const listCategory = ref([])
const Posts = ref([])

const fetchAllCategory = async () => {
  try {
    const res = await sendGetApi(`category/public/get-all-and-search-category?name=${searchQuery.value}&page=0`).then((res) => {
      listCategory.value = res.data.content
    })
  } catch (err) {
    console.log(err)
  }
}
const fetchPostByCateId = async (cateId) => {
  try {
    const res = await sendGetApi(`blog/public/get-blog-by-category?categoryId=${cateId}`).then((res) => {
      Posts.value = res.data.content
    })
  } catch (err) {
    console.log(err)
  }
}
</script>
<style></style>