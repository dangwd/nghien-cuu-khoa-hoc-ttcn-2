<template>
  <div v-if="isLoading">
    <div class="flex items-center justify-center h-screen">
      <div class="rounded-md h-12 w-12 border-4 border-t-4 border-green-500 animate-spin absolute"></div>
    </div>
  </div>
  <div v-else>
    <AsideView></AsideView>
    <div class="mx-auto max-w-3xl">
      <div>
        <div class="py-4 flex justify-between items-center">
          <h1 class="text-base text-gray-700 font-semibold uppercase">Bộ môn {{ documentItem.nameSubject }}</h1>
          <router-link to="/document">
            <button
              class="w-10 h-10 text-white transition ease-in-out hover:scale-105 duration-150 bg-green-600 hover:bg-green-700 rounded-full">
              <i class='bx bx-chevron-left text-2xl font-semibold '></i>
            </button>
          </router-link>
        </div>

      </div>
      <div class="w-full  bg-white shadow rounded-xl">
        <div class="flex p-3 gap-2">
          <div>
            <img class="w-60 h-auto rounded-lg"
              src="https://firebasestorage.googleapis.com/v0/b/vnua-forums-upload.appspot.com/o/image%2Fthumbnail.jpg?alt=media&token=f6ebcd08-56af-42a3-9ddf-1372f5e95218">
          </div>
          <div>
            <div class="text-left px-2">
              <h2 class="card-title text-lg">{{ documentItem.name }}</h2>
              <div class="pt-2 flex gap-2">
                <p class="text-sm ">Người đăng: {{ username }}</p>
                <p class="text-sm">Mô tả: {{ documentItem.description }} </p>
                <p class="text-sm">Ngày đăng: {{ documentItem.createdDate }}</p>
              </div>
            </div>
            <div class="px-2 pt-2 flex justify-between gap-3 items-center">
              <div>
                <button class="text-white border border-green-700 text-sm bg-green-700 p-1.5 rounded-lg"><a
                    target="_blank" :href="documentItem.linkFile">Tải
                    xuống</a></button>
              </div>
              <div>
                <i class='bx bx-bookmark text-xl font-semibold hover:text-green-700'></i>
                <!-- <i class='bx bxs-bookmark text-xl font-semibold text-green-700'></i> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AsideRight></AsideRight>
  </div>
</template>
<script setup>
import { getDocById } from '@/api/auth/api';
import 'firebase/compat/storage';
import { useRoute } from 'vue-router';
const route = useRoute()
const isLoading = ref(true)
import { onMounted, ref } from 'vue';
const username = ref("")
const documentItem = ref({})
onMounted(() => {
  fetchDetailDoc().then(() => {
    setTimeout(() => {
      isLoading.value = false
    }, 700)
  })
})
const fetchDetailDoc = async () => {
  try {
    await getDocById(route.params.id).then((res) => {
      documentItem.value = res.data
      username.value = res.data.user.fullName
    })
  } catch (err) {
    console.log(err)
  }
}

</script>
<style></style>