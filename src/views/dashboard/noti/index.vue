<template>
  <Toast />
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
            <Button text rounded icon="pi pi-trash" severity="warning" @click="removeNoti(slotProps.data.id)"></Button>
          </div>
        </template>
      </Column>
    </DataTable>
    <!-- Create -->
    <Dialog v-model:visible="createModal" modal header="Viết thông báo" :style="{ width: '700px' }">
      <div class="grid">
        <div class="flex flex-col gap-2 w-full">
          <label class="text-sm font-semibold" for="username">Tiêu đề</label>
          <InputText v-model="title" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text" size="small" />
        </div>
        <div class="flex flex-col gap-2 w-full mt-2">
          <progress class="progress progress-success w-full" :value="progressUpload" max="100"></progress>
          <InputField :value="image" @input-file="setImage" type="file-input"></InputField>
        </div>
        <div class="flex flex-col gap-2 w-full">
          <label class="text-sm font-semibold" for="username">Nội dung</label>
          <InputField @input-change="setContent" :value="content" type="ckeditor"></InputField>
        </div>

      </div>
      <div class="pt-4 flex justify-end">
        <Button class="text-white bg-green-600 hover:bg-green-700 p-1 text-sm border-none" label="Tạo mới"
          @click="createNoti()" />
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
          <InputField :value="contentView" @input-change="setContentChange" type="ckeditor"></InputField>
          <div v-html="contentView"></div>
        </div>
        <div class="flex flex-col gap-2 items-center">
          <Image :src="imageView" alt="Image" width="350" preview />
          <!-- <img :src="imageView" alt=""> -->
        </div>
      </div>
      <div class="pt-4 flex justify-end">
        <Button class="text-white bg-green-600 hover:bg-green-700 p-1 text-sm border-none" label="Cập nhật"
          @click="updateNoti()" />
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { onMounted, ref, } from 'vue';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { sendGetApi, sendPostApi, sendDeleteApi, sendPutApi } from '@/api/auth/api';

const toast = useToast()
const createModal = ref(false)
const viewModal = ref(false)
const progressUpload = ref(0)
const notiId = ref("")
const title = ref("")
const image = ref("")
const content = ref("")
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
const showSuccess = (res) => {
  toast.add({ severity: 'success', summary: 'Sucess!', detail: res || 'Thao tác thành công', life: 3000 });
};
const showError = (e) => {
  toast.add({ severity: 'error', summary: 'Error!', detail: e || 'Có lỗi xảy ra', life: 3000 });
};
const setContent = (value) => {
  content.value = value
}
const setContentChange = (value) => {
  contentView.value = value
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
const fetchAllNoti = async () => {
  try {
    await sendGetApi(`notification/all/get-all-notification`).then((res) => {
      Notifications.value = res.data.content
    })
  } catch (err) {
    console.log(err)
  }
}
const createNoti = async () => {
  try {
    const res = await sendPostApi("/notification/admin/add-and-update-notification", {
      title: title.value,
      image: image.value,
      content: content.value,
      linkFiles: []
    }).then((res) => {
      showSuccess(`Tạo thành công thông báo ${res.data.title}`)
      fetchAllNoti()
      createModal.value = false
    })
  } catch (err) {
    console.log(err)
  }
}
const viewDetail = async (id) => {
  viewModal.value = true
  notiId.value = id
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
const updateNoti = async () => {
  try {
    const res = await sendPostApi("/notification/admin/add-and-update-notification", {
      id: notiId.value,
      title: titleView.value,
      image: imageView.value,
      content: contentView.value,
      linkFiles: []
    }).then((res) => {
      showSuccess(`Cập nhật ${res.data.title} thành công!`)
      fetchAllNoti()
      viewModal.value = false
    })
  } catch (err) {
    console.log(err)
  }
}
const removeNoti = async (id) => {
  try {
    const res = await sendDeleteApi(`/notification/admin/delete-notification?notificationId=${id}`).then((res) => {
      showSuccess(res.data)
      fetchAllNoti()
    })
  } catch (err) {
    console.log(err)
  }
}

</script>
