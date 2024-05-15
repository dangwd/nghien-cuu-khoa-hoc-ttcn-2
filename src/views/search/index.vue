<template>
  <div v-if="isLoading">
    <div class="flex items-center justify-center h-screen">
      <div class="rounded-md h-12 w-12 border-4 border-t-4 border-green-500 animate-spin absolute"></div>
    </div>
  </div>
  <div v-else>
    <AsideView></AsideView>
    <div class="max-w-3xl mx-auto">
      <h1 class="text-base font-medium">Có {{ posts.length }} kết quả tìm kiếm liên quan đến: <span
          class="font-semibold italic">{{
            $route.query.q }}</span>
      </h1>
      <div>
        <div v-for="(post, index) in posts" :key="index" class="mt-3 flex flex-col">
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
              <button @click="increaseLike(post.id)"
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
      </div>
      <div v-if="posts.length" v-observe-visibility="handleScroll">
      </div>
    </div>
    <AsideRight />
  </div>
</template>
<script setup>
import { getAllPostPublic, likePost, sendGetApi } from '@/api/auth/api';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const isLoading = ref(false)
const posts = ref([])
const currentPage = ref(0)
const route = useRoute()

onMounted(() => {
  fetchData()
})
const fetchData = async () => {
  try {
    await sendGetApi(`blog/public/get-all-active?page=${currentPage.value}&size=5&keywords=${route.query.q}`).then((res) => {
      posts.value.push(...res.data.content)
    })
  } catch (err) {
    console.log(err)
  }
}
const handleScroll = () => {
  currentPage.value++
  console.log(currentPage.value)
  fetchData()
}
const increaseLike = async (id) => {
  await likePost(id)
  const res = await getAllPostPublic(currentPage.value);
  posts.value = []
  res.data.content.forEach(post => {
    posts.value.push(post);
  });
}
</script>
<style></style>