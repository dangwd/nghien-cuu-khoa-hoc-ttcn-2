<template>
  <div class="card py-2">
    <div class="flex justify-between mb-2">
      <div class="flex">
        <InputText v-model="searchQuery" placeholder="Tìm kiếm" size="small" class="border-gray-300 rounded-none">
        </InputText>
        <Button icon="pi pi-search"
          class="text-white bg-green-600 hover:bg-green-700 text-sm border-none rounded-none rounded-r-lg"
          @click="fetchAllPosts()" />
      </div>
      <div class="flex gap-2">
        <Button icon="pi pi-clock" class="text-white bg-blue-600 hover:bg-blue-700 text-sm border-none"
          label="Bài viết chờ duyệt" @click="checkedDialog" />
        <Button icon="pi pi-plus" class="text-white bg-green-600 hover:bg-green-700 text-sm border-none"
          label="Viết bài" @click="openDialog" />
      </div>
    </div>
    <DataTable class="text-sm" size="small" showGridlines :value="Posts" paginator :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
      <Column field="name" header="STT" style="width: 5rem">
        <template #body="{ index }">
          {{ index + 1 }}
        </template>
      </Column>
      <Column class="text-sm" field="id" header="ID" style="width: 5rem"></Column>
      <Column class="text-sm" field="title" header="Tiêu đề bài viết" style="width: 20rem">
      </Column>
      <Column class="text-sm" field="image" header="Ảnh" style="width: 10rem">
        <template #body="slotProps">
          <img class="w-24 h-auto rounded-lg" :src="slotProps.data.image" alt="">
        </template>
      </Column>
      <Column class="text-sm" field="description" header="Mô tả" style="width: 10rem">
      </Column>
      <Column class="text-sm" field="user.fullName" header="Người đăng" style="width: 10rem">
      </Column>
      <Column class="text-sm" field="actived" header="Trạng thái" style="width: 10rem">
        <template #body="slotProps">
          {{ formatStatus(slotProps.data.actived) }}
        </template>
      </Column>
      <Column class="text-sm" field="createdDate" header="Ngày tạo" style="width: 10rem"></Column>
      <Column class="text-sm" field="" header="Thao tác" style="width: 15rem">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button text rounded icon="pi pi-eye" @click="viewDetail(slotProps.data.id)"></Button>
            <Button text rounded icon="pi pi-trash" severity="warning" @click="removePost(slotProps.data.id)"></Button>
          </div>
        </template>
      </Column>
    </DataTable>
    <!-- Create -->
    <Dialog v-model:visible="createModal" modal header="Viết bài" :style="{ width: '1094px' }">
      <div>
        <div>

        </div>
      </div>
    </Dialog>
    <!-- View -->
    <Dialog v-model:visible="viewModal" modal header="Chi tiết" :style="{ width: '1094px' }">
      <div class="w-full">
        <div class="flex flex-col gap-2 w-full">
          <label class="text-sm font-semibold" for="username">Tiêu đề bài viết</label>
          <InputText v-model="titleView" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
            size="small" />
        </div>
        <div class="flex flex-col gap-2 w-full">
          <label class="text-sm font-semibold" for="username">Mô tả</label>
          <InputText v-model="descriptionView" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
            size="small" />
        </div>
      </div>
      <div class="flex gap-3">
        <div class="flex flex-col gap-2 w-full">
          <label class="text-sm font-semibold" for="username">Trạng thái</label>
          <InputText v-model="statusView" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
            size="small" />
        </div>
        <div class="flex flex-col gap-2 w-full">
          <label class="text-sm font-semibold" for="username">Danh mục</label>
          <InputText v-model="categoryView" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
            size="small" />
        </div>
      </div>
      <div class="w-full py-2">
        <Textarea class="w-full" v-model="contentView" rows="10" cols="30" />
        <img class="rounded-lg" :src="imageView" alt="">
      </div>
      <div class="pt-4 flex justify-end">
        <Button class="text-white bg-green-600 hover:bg-green-700 p-1 text-sm border-none" label="Cập nhật"
          @click="updatePost()" />
        <div class="flex gap-2 pl-2" v-show="statusView == false">
          <Button class="text-white bg-blue-600 hover:bg-blue-700 p-1 text-sm border-none" label="Duyệt bài"
            @click="approvePost()" />
          <Button class="text-white bg-red-600 hover:bg-red-700 p-1 text-sm border-none" label="Xóa"
            @click="deletePost()" />
        </div>
      </div>
    </Dialog>
    <!-- Bai viet cho duyet -->
    <Dialog v-model:visible="checkedModal" maximizable modal header="Danh sách bài viết chờ duyệt"
      :style="{ width: '1094px' }">
      <div v-if="CheckedPosts.length > 0">
        <DataTable class="text-sm" size="small" showGridlines :value="CheckedPosts" paginator :rows="5"
          :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
          <Column field="name" header="STT" style="width: 5rem">
            <template #body="{ index }">
              {{ index + 1 }}
            </template>
          </Column>
          <Column class="text-sm" field="id" header="ID" style="width: 5rem"></Column>
          <Column class="text-sm" field="title" header="Tiêu đề bài viết" style="width: 20rem">
          </Column>
          <Column class="text-sm" field="image" header="Ảnh" style="width: 10rem">
            <template #body="slotProps">
              <img class="w-24 h-auto rounded-lg" :src="slotProps.data.image" alt="">
            </template>
          </Column>
          <Column class="text-sm" field="description" header="Mô tả" style="width: 10rem">
          </Column>
          <Column class="text-sm" field="user.fullName" header="Người đăng" style="width: 10rem">
          </Column>
          <Column class="text-sm" field="actived" header="Trạng thái" style="width: 10rem">
            <template #body="slotProps">
              {{ formatStatus(slotProps.data.actived) }}
            </template>
          </Column>
          <Column class="text-sm" field="createdDate" header="Ngày tạo" style="width: 10rem"></Column>
          <Column class="text-sm" field="" header="Thao tác" style="width: 15rem">
            <template #body="slotProps">
              <div class="flex gap-2">
                <Button text rounded icon="pi pi-eye" @click="viewDetail(slotProps.data.id)"></Button>
                <Button text rounded icon="pi pi-trash" severity="warning"
                  @click="removePost(slotProps.data.id)"></Button>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
      <div v-else>
        <h1 class="text-base font-semibold text-center">Hiện không có bài viết cần duyệt!</h1>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { onMounted, ref, } from 'vue';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import { sendGetApi, sendPostApi, sendDeleteApi, sendPutApi } from '@/api/auth/api';

const createModal = ref(false)
const viewModal = ref(false)
const checkedModal = ref(false)
const searchQuery = ref("")
const imageView = ref("")
const titleView = ref("")
const descriptionView = ref("")
const statusView = ref("")
const contentView = ref("")
const categoryView = ref("")
const pageNum = ref(0)
const postId = ref("")
const checkedDialog = () => {
  checkedModal.value = true
  fetchCheckedPosts()
}
const openDialog = () => {
  createModal.value = true
}
const Posts = ref([])
const CheckedPosts = ref([])
onMounted(() => {
  fetchAllPosts()
})
const fetchAllPosts = async () => {
  try {
    await sendGetApi(`/blog/blog-manager/admin-find-all-blog?keywords&page=${pageNum.value}&size=20`).then((res) => {
      Posts.value = res.data.content
    })
  } catch (err) {
    console.log(err)
  }
}
const fetchCheckedPosts = async () => {
  try {
    const res = await sendGetApi("blog/public/get-all-blog-unactived?page=0").then((res) => {
      CheckedPosts.value = res.data.content
      console.log(CheckedPosts.value)
    })
  } catch (err) {
    console.log(err)
  }
}
const viewDetail = async (id) => {
  viewModal.value = true
  postId.value = id
  try {
    const res = await sendGetApi(`/blog/all/get-blog-by-id?id=${id}`).then((res) => {

      titleView.value = res.data.title
      descriptionView.value = res.data.description
      statusView.value = res.data.actived
      contentView.value = res.data.content
      categoryView.value = res.data.blogCategories[0].category.name
      imageView.value = res.data.image
    })
  } catch (err) {
    console.log(err)
  }
}
const removePost = async (id) => {
  try {
    const res = await sendDeleteApi(`/admin/lock-user?id=${id}`).then((res) => {
      console.log(res)
      fetchAllPosts()
    })
  } catch (err) {
    console.log(err)
  }
}
const approvePost = async () => {
  try {
    const res = await sendPostApi(`blog/blog-manager/active-or-unacative?blogId=${postId.value}`).then((res) => {
      viewDetail.value = false
    })
  } catch (err) {
    console.log(err)
  }
}
const formatRole = (role) => {
  switch (role) {
    case 'ROLE_ADMIN':
      return 'Quản trị viên'
    case 'ROLE_USER':
      return 'Người dùng'
  }
}

const formatStatus = (value) => {
  switch (value) {
    case true:
      return 'Đã duyệt'
    case false:
      return 'Chờ duyệt'
  }
}
</script>
