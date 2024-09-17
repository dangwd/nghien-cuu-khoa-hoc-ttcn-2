<template>
  <div v-if="isLoading">
    <div class="flex items-center justify-center h-screen">
      <div class="rounded-md h-12 w-12 border-4 border-t-4 border-green-500 animate-spin absolute"></div>
    </div>
  </div>
  <div v-else>
    <AsideView></AsideView>
    <div class="max-w-3xl mx-auto">
      <div class="bg-white w-full shadow rounded-xl p-5">
        <div class="flex gap-2">
          <img class="w-10 h-10 rounded-full" :src="user.avatar" alt="">
          <input type="text" :placeholder="'Bạn đang nghĩ gì thế ' + user.fullName + ' ?'"
            class="w-full p-2 text-gray-700 border border-gray-200 rounded-full bg-gray-50 text-sm italic" disabled>
        </div>
        <div class="flex justify-end pt-3">
          <ModalComp labelBtn="Đăng bài" modalIdProps="createPost" size="4xl"
            customClass="bg-green-600 text-white p-2 rounded-lg text-sm font-semibold">
            <template #header>
              <div class="flex justify-center border-b">
                <h1 class="text-lg font-semibold pb-2">Tạo bài viết</h1>
              </div>
            </template>
            <template #content>
              <div class="flex items-center gap-4 pb-4">
                <img class="w-10 h-10 rounded-full" :src="user.avatar" alt="">
                <div class="font-medium dark:text-white">
                  <div>{{ user.fullName }}</div>
                  <span
                    class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{{
                      formatStatus(user.role) }}</span>
                </div>
              </div>
              <InputField @input-change="setTitle" :value="title" labelField="title" title="Tiêu đề bài viết">
              </InputField>
              <InputField @input-change="setDescription" :value="description" labelField="description"
                title="Mô tả bài viết"></InputField>
              <InputField styleClass="py-2" @input-change="setContent" :value="contentPost" type="ckeditor">
              </InputField>
              <progress class="progress progress-success w-full" :value="progressUpload" max="100"></progress>
              <InputField @input-file="setImage" :value="image" type="file-input"></InputField>
            </template>
            <template #footer>
              <div class="flex justify-end">
                <Button :config="{ label: 'Tạo', click: () => createPost() }"></Button>
              </div>
            </template>
          </ModalComp>
        </div>
      </div>

      <!-- <div class="mt-2 bg-white rounded-xl border">
        <h1 class="text-base font-semibold mx-4 mt-4">Bộ lọc</h1>
        <div class="p-2">
          <div class="grid grid-cols-3 gap-2 px-4 pt-4 pb-3">
            <InputField type="select" title="Tên" :options="[]"></InputField>
            <InputField type="select" title="Người đăng" :options="[]"></InputField>
            <InputField type="select" title="Ngày đăng" :options="[]">
            </InputField>
          </div>
          <div class="flex justify-end">
            <Button btnClass="bg-green-600 hover:bg-green-700 text-white mx-3 text-sm font-semibold mb-2"
              :config="{ label: 'Xác nhận', click: () => fetchAllSubject() }"></Button>
          </div>
        </div>
      </div> -->
      <div v-if="postData.data.content.length > 0">
        <div class="p-2">
          <h1 class="text-base font-semibold">Danh mục bạn chọn có: {{ postData.data.content.length }} bài viết</h1>
        </div>
        <div v-for="(post, index) in postData.data.content" :key="index">
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
      <div v-else>
        <div class="flex justify-center items-center">
          <span>
            <div class="px-24"><i class='bx bxs-inbox text-9xl text-gray-700'></i></div>
            <h1 class="font-bold text-xl text-gray-700">Danh mục này chưa có bài viết nào </h1>
          </span>
        </div>
      </div>
    </div>
    <aside-right />
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import { likePost, sendPostApi } from '@/api/auth/api';
import firebase from 'firebase/compat/app';
import { useRoute } from 'vue-router';
const route = useRoute()
import 'firebase/compat/storage';

import { useStore } from 'vuex'
const isLoading = ref(false)
const store = useStore()


const title = ref("")
const description = ref("")
const image = ref("")
const cateId = ref(Number(route.params.id))
const contentPost = ref("")
const progressUpload = ref(0)
const postData = computed(() => store.state.postData)
const user = computed(() => {
  return store.state.user
})
const setTitle = (value) => {
  title.value = value
}
const setContent = (value) => {
  contentPost.value = value
}
const setDescription = (value) => {
  description.value = value
}
const setImage = (file) => {
  image.value = file
  var storageRef = firebase.storage().ref('image/' + file.name)
  let uploadTask = storageRef.put(file)
  uploadTask.on('stage_changed', (snapshot) => {
    progressUpload.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  }, (error) => {
    console.log(error)
  }, () => {
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      image.value = downloadURL
      console.log(downloadURL)
    })
  })
}
const createPost = async () => {
  const data = {
    title: title.value,
    description: description.value,
    image: image.value,
    content: contentPost.value,
    listCategoryId: [cateId.value]
  }
  const res = await sendPostApi("/blog/all/save-update", data).then((res) => {
    console.log(res)
  })
}
const increaseLike = async (id) => {
  await likePost(id).then((res) => {
    fetchData()
  })
}
const formatStatus = (value) => {
  switch (value) {
    case 'ROLE_USER':
      return 'Bài viết chờ duyệt'
    case 'ROLE_ADMIN':
      return 'Đã duyệt'
  }
}
</script>
<style></style>