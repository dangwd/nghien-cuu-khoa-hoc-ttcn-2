<template>
  <div>

    <div class="mx-96">
      <div class="pb-5">
        <new-post-view />
      </div>
      <div class="post">
        <ul>
          <li v-for="(post, index) in postList" :key="index">
            <router-link :to="'/detail-post/' + post.id" data-aos="fade-right"
              class="card card-side bg-base-100 shadow-xl my-4 hover:bg-gray-100 hover:shadow-lg">
              <div class="card-body p-10">
                <div class="flex gap-6">
                  <h2 class="card-title">{{ post.title }}</h2>
                  <div class="font-semibold">
                    <div class="badge badge-lg badge-primary">#{{ post.tag }}</div>
                    <div class="badge badge-lg badge-accent">#{{ post.subtag }}</div>
                  </div>
                </div>
                <p class="italic flex justify-center">Bấm vào để xem chi tiết bài viết</p>
                <!-- <div class="card-actions justify-end">
                <router-link :to="'/detail-post/' + post.id"><button
                    class="btn btn-primary rounded-full">Xem</button></router-link>
              </div> -->
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- <div v-else>
      <h1>Loading...</h1>
      <span class="loading loading-bars loading-lg"></span>
    </div> -->
  </div>
</template>
<script setup>
import NewPostView from '@/components/NewPostView.vue';
import { onMounted } from 'vue';
import AOS from 'aos'
const postList = [
  {
    id: 1,
    title: "Best theme for VSCode...",
    tag: "code",
    subtag: "vscode"
  },
  {
    id: 2,
    title: "How to using router in vue",
    tag: "code",
    subtag: "vue3"
  },
  {
    id: 3,
    title: "Hard coding",
    tag: "code",
    subtag: "work"
  },
  {
    id: 4,
    title: "Best theme for VSCode...",
    tag: "code",
    subtag: "vscode"
  },
  {
    id: 5,
    title: "Best theme for VSCode...",
    tag: "code",
    subtag: "vscode"
  },
  {
    id: 6,
    title: "Best theme for VSCode...",
    tag: "code",
    subtag: "vscode"
  },
  {
    id: 7,
    title: "Best theme for VSCode...",
    tag: "code",
    subtag: "vscode"
  },
]
onMounted(async () => {
  AOS.init();
})
</script>
<style></style>