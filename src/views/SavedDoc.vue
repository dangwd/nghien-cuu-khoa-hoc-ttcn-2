<template>
  <AsideView></AsideView>
  <div class="max-w-3xl mx-auto">
    <div class="pt-4 pb-2 flex justify-between items-center">
      <h1 class="text-base font-semibold text-gray-700">Tất cả bài viết đã lưu</h1>
      <div class="flex gap-2 items-center">
        <InputField @input-change="setSearch" :value="searchQuery" type="custom-input"
          customClass="shadow-sm border border-gray-200 text-gray-700 text-sm rounded-xl focus:outline-none focus:ring-green-700 focus:border-green-700 focus:ring-1 transition ease-in-out duration-150 focus:text-green-700  block w-[300px] p-2 my-2"
          placeholder="Tìm kiếm">
        </InputField>
        <Button btnIcon="icon" iconBtnClass="bx bx-search" btnClass="bg-green-600 text-white hover:bg-green-700"
          :config="{ click: () => fetchSavedDoc() }"></Button>
      </div>
    </div>
    <div>
      <div v-for="(item, index) in docSaved" :key="index" class="w-full bg-white shadow rounded-xl my-2">
        <div class="flex p-3 gap-2">
          <div>
            <img class="w-48 h-auto rounded-lg"
              src="https://firebasestorage.googleapis.com/v0/b/vnua-forums-upload.appspot.com/o/image%2Fthumbnail.jpg?alt=media&token=f6ebcd08-56af-42a3-9ddf-1372f5e95218">
          </div>
          <div>
            <div class="text-left px-2">
              <h2 class="card-title text-lg">{{ item.name }}</h2>
              <div class="pt-2 flex gap-2">
                <p class="text-sm">Ngày đăng: {{ item.createdDate }}</p>
                <p class="text-sm">Mô tả: {{ item.descrition }} </p>
                <p class="text-sm ">Người đăng: {{ item.user.fullName }}</p>
              </div>
            </div>
            <div class="px-2 pt-2 flex gap-3 items-center">
              <button class="text-white text-sm bg-green-700 hover:bg-green-600 p-2 rounded-lg"><a target="_blank"
                  :href="item.linkFile">Tải
                  xuống</a></button>
              <div>
                <button @click="saveDoc(item.id)"><i
                    class='bx bx-bookmark text-xl font-semibold text-green-700'></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <aside-right />
</template>
<script setup>
import { sendGetApi, sendPostApi } from '@/api/auth/api';
import { computed, onMounted, ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const docSaved = ref([])
const searchQuery = ref("")
const userId = computed(() => {
  const vuexData = JSON.parse(localStorage.getItem('vuex'))
  return vuexData.user.id
})
const setSearch = (value) => {
  searchQuery.value = value
}
onMounted(() => {
  fetchSavedDoc()
})
const showSuccess = (res) => {
  toast(res ? res : "Thao tác thành công!", {
    "theme": "colored",
    "type": "success",
    "limit": 3,
    "dangerouslyHTMLString": true
  })
}
const fetchSavedDoc = async () => {
  try {
    const res = await sendGetApi(`/document/public/get-all-active?keywords=${searchQuery.value}&subjectId=${""}&userId=${userId.value}`).then((res) => {
      docSaved.value = res.data.content
    })
  } catch (err) {
    console.log(err)
  }
}
const saveDoc = async (id) => {
  try {
    const res = await sendPostApi(`/document/all/save-or-unsave-document?documentId=${id}`).then((res) => {
      fetchSavedDoc()
      showSuccess(res.data)
    })
  } catch (err) {
    console.log(err)
  }
}
</script>
<style></style>