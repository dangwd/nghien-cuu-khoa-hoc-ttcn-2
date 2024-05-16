<template>
  <div class="card py-2">
    <div class="flex justify-between mb-2">
      <div class="flex">
        <InputText v-model="searchQuery" placeholder="Tìm kiếm" size="small" class="border-gray-300 rounded-none">
        </InputText>
        <Button icon="pi pi-search"
          class="text-white bg-green-600 hover:bg-green-700 text-sm border-none rounded-none rounded-r-lg"
          @click="fetchAllNoti()" />
      </div>
      <Button icon="pi pi-plus" class="text-white bg-green-600 hover:bg-green-700 text-sm border-none"
        label="Viết thông báo" @click="openDialog" />
    </div>
    <DataTable class="text-sm" size="small" showGridlines :value="Notifications" paginator :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
      <Column field="name" header="STT" style="width: 5rem">
        <template #body="{ index }">
          {{ index + 1 }}
        </template>
      </Column>
      <Column class="text-sm" field="title" header="Tiêu đề" style="width: 25%"></Column>
      <Column class="text-sm" field="content" header="ND báo cáo" style="width: 25%">
        <template #body="slotProps">
          <div v-html="slotProps.data.content"></div>
        </template>
      </Column>
      <Column class="text-sm" field="image" header="Ảnh" style="width: 17rem">
        <template #body="slotProps">
          <img class="w-24 h-auto" :src="slotProps.data.image" alt="">
        </template>
      </Column>
      <Column class="text-sm" field="createdDate" header="Ngày tạo" style="width: 25%"></Column>
      <Column class="text-sm" field="" header="Thao tác" style="width: 15rem">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button text rounded icon="pi pi-eye" @click="viewDetail(slotProps.data.id)"></Button>
            <Button text rounded :icon="slotProps.data.actived ? 'pi pi-lock-open' : 'pi pi-lock'" severity="warning"
              @click="removeNoti(slotProps.data.id)"></Button>
          </div>
        </template>
      </Column>
    </DataTable>
    <!-- Create -->
    <Dialog v-model:visible="createModal" modal header="Tạo mới tài khoản" :style="{ width: '700px' }">
      <div class="grid gap-4">
        <div class="flex gap-2">
          <div class="flex flex-col gap-2 w-full">
            <label class="text-sm font-semibold" for="username">Tên người dùng</label>
            <InputText v-model="fullName" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
              size="small" placeholder="Nguyen Van A" />
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label class="text-sm font-semibold" for="username">Tài khoản</label>
            <InputText v-model="username" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
              size="small" placeholder="abc@gmail.com" />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold" for="username">Mật khẩu</label>
          <InputText v-model="passCheck" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
            size="small" placeholder="**********" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold" for="username">Nhập lại mật khẩu</label>
          <InputText v-model="password" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text" size="small"
            placeholder="**********" />
        </div>
        <div>
          <label class="text-sm font-semibold" for="username">Trạng thái</label>
          <Dropdown v-model="selectedStatus" @change="chooseStatus" :options="statusOpt" optionLabel="name"
            placeholder="Trạng thái" class="w-full md:w-[14rem] rounded-xl text-sm" />
        </div>
      </div>
      <div class="pt-4 flex justify-end">
        <Button class="text-white bg-green-600 hover:bg-green-700 p-1 text-sm border-none" label="Tạo mới"
          @click="createAccount()" />
      </div>
    </Dialog>

    <!-- View -->
    <Dialog v-model:visible="viewModal" modal header="Chi tiết" :style="{ width: '700px' }">
      <div class="grid">
        <div class="flex flex-col gap-2 w-full">
          <label class="text-sm font-semibold" for="username">Tiêu đề</label>
          <InputText v-model="titleView" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
            size="small" />
        </div>
        <div class="flex flex-col gap-2 w-full">
          <label class="text-sm font-semibold" for="username">Nội dung</label>
          <InputText v-model="contentView" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
            size="small" />
          <div v-html="contentView"></div>
        </div>
        <div class="flex flex-col gap-2 w-full">
          <img :src="imageView" alt="">
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { onMounted, ref, } from 'vue';

import Button from 'primevue/button';
import { sendGetApi, sendPostApi, sendDeleteApi, sendPutApi } from '@/api/auth/api';

const selectedStatus = ref("")
const createModal = ref(false)
const viewModal = ref(false)
const deleteModal = ref(false)
const searchQuery = ref("")
const titleView = ref("")
const contentView = ref("")
const imageView = ref("")
const openDialog = () => {
  createModal.value = true
}
const Notifications = ref([])

onMounted(() => {
  fetchAllNoti()
})
const fetchAllNoti = async () => {
  try {
    await sendGetApi(`notification/all/get-all-notification`).then((res) => {
      Notifications.value = res.data.content
    })
  } catch (err) {
    console.log(err)
  }
}
const createAccount = async () => {
  try {
    if (passCheck.value == password.value) {
      const res = await sendPostApi("/admin/create-by-admin", {
        username: username.value,
        password: password.value,
        fullName: fullName.value,
        avatar: "",
        role: "ROLE_USER",
      }).then(() => {
        fetchAllNoti()
        createModal.value = false
      })
    } else {
      console.log("Pass sai!")
    }
  } catch (err) {
    console.log(err)
  }
}
const viewDetail = async (id) => {
  viewModal.value = true
  try {
    const res = await sendGetApi(`/notification/all/get-notification-by-id?id=${id}`).then((res) => {
      titleView.value = res.data.title
      contentView.value = res.data.content
      imageView.value = res.data.image
    })
  } catch (err) {
    console.log(err)
  }
}
const updateAccount = async () => {
  try {
    const res = await sendPutApi("/admin/update-by-admin", {
      id: userId.value,
      username: usernameView.value,
      password: passwordView.value,
      fullName: fullNameView.value,
      actived: true,
      avatar: imageView.value,
      role: "ROLE_USER",
    })
  } catch (err) {
    console.log(err)
  }
}
const removeNoti = async (id) => {
  try {
    const res = await sendDeleteApi(`/notification/admin/delete-notification?notificationId=${id}`).then((res) => {
      console.log(res)
      fetchAllNoti()
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
const chooseStatus = (data) => {
  statusView.value = data.value.value
}
const chooseRole = (data) => {
  roleView.value = data.value.value
}
const formatStatus = (value) => {
  switch (value) {
    case true:
      return 'Đã kích hoạt'
    case false:
      return 'Đã khóa'
  }
}
</script>
