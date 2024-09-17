<template>
  <div v-if="isLoading">
    <div class="flex items-center justify-center h-screen">
      <div class="rounded-md h-12 w-12 border-4 border-t-4 border-green-500 animate-spin absolute"></div>
    </div>
  </div>
  <div v-else>
    <AsideView></AsideView>
    <div v-if="postTopTier.data" class="max-w-3xl mx-auto">
      <div class="py-5">
        <div class="bg-white mt-3">
          <img class="border rounded-t-xl shadow-xl w-full" :src="postTopTier.data.image">
          <div class="bg-white shadow p-5 text-xl text-gray-700 font-semibold">
            <div class="flex items-center gap-4" v-if="postTopTier.data && postTopTier.data.user">
              <img class="w-10 h-10 rounded-full" :src="postTopTier.data.user.avatar" alt="">
              <div class="font-medium dark:text-white">
                <div class="text-base font-semibold">{{ postTopTier.data.user.fullName }} <span
                    v-show="postTopTier.data.user.role === 'ROLE_ADMIN'"><i
                      class='bx bxs-check-shield text-blue-500'></i></span>
                </div>
                <div class="flex gap-2">
                  <h1 class="text-xs text-gray-500">{{ postTopTier.data.createdTime }} /</h1>
                  <h1 class="text-xs text-gray-500">{{ postTopTier.data.createdDate }}</h1>
                  <i class='bx bxs-planet text-xs text-gray-500'></i>
                </div>

              </div>
            </div>
            <div class="py-5">
              <h1 class="mb-4 text-xl font-extrabold text-gray-700 dark:text-white"><span
                  class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                  {{ postTopTier.data.title }}</span></h1>
            </div>
            <div class="text-base font-medium" v-html="postTopTier.data.content"></div>
            <div class="py-5" v-if="postTopTier.data.blogCategories[0]">
              <div class="badge bg-blue-600 gap-2 text-white text-xs">
                #{{ postTopTier.data.blogCategories[0].category.name }}
              </div>
            </div>
            <div>
              <div class="flex gap-5">
                <h1><i class='bx bxs-heart text-green-600 font-semibold'></i> <span class="text-gray-700 text-base">{{
                  postTopTier.data.numLike
                }}</span>
                </h1>
                <h1><i class='bx bxs-message-square-dots text-blue-600 font-semibold'></i> <span
                    class="text-gray-700 text-base">{{
                      postTopTier.data.numComment
                    }}</span>
                </h1>
              </div>
            </div>
          </div>
          <div class="bg-white p-1 shadow flex flex-row flex-wrap border-t rounded-b-xl">
            <button @click="increaseLike(postTopTier.data.id)"
              class="w-1/3 text-center text-base rounded-xl text-gray-700 hover:text-green-600 font-semibold">
              <i class='bx bxs-heart text-lg'></i> Like
            </button>

            <router-link :to="'/detail-post/' + postTopTier.data.id"
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
    <aside-right />
  </div>
</template>
<script setup>
import { computed, ref, watch, watchEffect } from 'vue';
import { toast } from 'vue3-toastify';
import { likePost } from '@/api/auth/api';

import { useStore } from 'vuex'
const isLoading = ref(true)
const store = useStore()
setTimeout(() => {
  isLoading.value = false
}, 700)

const postTopTier = computed(() =>
  store.state.postTopTier
)

const increaseLike = async (id) => {
  try {
    const res = await likePost(id);
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
}
watch(postTopTier, (newValue) => {
  postTopTier.value = newValue
})
</script>
<style></style>