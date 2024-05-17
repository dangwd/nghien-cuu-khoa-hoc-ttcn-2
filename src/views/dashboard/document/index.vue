<template>
  <div class="card py-2">
    <div class="flex justify-between mb-2">
      <div class="flex">
        <InputText v-model="searchQuery" placeholder="Tìm kiếm" size="small" class="border-gray-300 rounded-none">
        </InputText>
        <Button icon="pi pi-search"
          class="text-white bg-green-600 hover:bg-green-700 text-sm border-none rounded-none rounded-r-lg"
          @click="fetchAllDocuments()" />
      </div>

      <div class="flex gap-2">
        <Button icon="pi pi-clock" class="text-white bg-blue-600 hover:bg-blue-700 text-sm border-none"
          label="Tài liệu chờ duyệt" :badge="CheckedPosts.length + ''" @click="checkedDialog" />
        <Button icon="pi pi-plus" class="text-white bg-green-600 hover:bg-green-700 text-sm border-none"
          label="Viết bài" @click="openDialog" />
      </div>
    </div>
    <div class="py-2">
      <div class="flex gap-2 items-center bg-white p-2 border">
        <div class="w-1/3">
          <Button icon="pi pi-filter" class="text-white bg-green-600 hover:bg-green-700 text-sm border-none"
            label="Bộ lọc" @click="openDialog" />
        </div>
        <Dropdown filter v-model="selectedDpt" @change="chooseDpt" :options="dptOpt" optionLabel="nameDepartment"
          placeholder="Khoa" class="w-1/4 rounded-xl text-sm" />
        <Dropdown filter v-model="selectedMjr" @change="chooseMjr" :options="mjrOpt" optionLabel="nameSpecialize"
          placeholder="Ngành" class="w-1/4 rounded-xl text-sm" />
        <Dropdown filter v-model="selectedSbj" @change="chooserSbj" :options="sbjOpt" optionLabel="nameSubject"
          placeholder="Bộ môn" class="w-1/4 rounded-xl text-sm" />
      </div>
    </div>
    <div v-if="Documents.length > 0">
      <DataTable class="text-sm" size="small" showGridlines :value="Documents" paginator :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
        <Column field="name" header="STT" style="width: 5rem">
          <template #body="{ index }">
            {{ index + 1 }}
          </template>
        </Column>
        <Column class="text-sm" field="id" header="ID" style="width: 5rem"></Column>
        <Column class="text-sm" field="name" header="Tên tài liệu" style="width: 20rem">
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
        <Column class="text-sm" field="linkFile" header="Tài liệu" style="width: 10rem">
          <template #body="slotProps">
            <a target="_blank" class="text-sm text-blue-600 hover:text-blue-700 underline"
              :href="slotProps.data.linkFile">Tải xuống</a>
          </template>
      </Column>
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
      <div></div>
    </div>
    <!-- Create -->
    <Dialog v-model:visible="createModal" modal header="Viết bài" :style="{ width: '1094px' }">

      <div class="flex justify-end pt-2">
        <Button class="text-white bg-green-600 hover:bg-green-700 text-sm border-none" label="Viết bài"
          @click="createPost()" />
      </div>
    </Dialog>
    <!-- View -->
    <Dialog v-model:visible="viewModal" modal header="Chi tiết" :style="{ width: '1094px' }">

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
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import Button from 'primevue/button';
import { sendGetApi, sendPostApi, sendDeleteApi } from '@/api/auth/api';

const createModal = ref(false)
const viewModal = ref(false)
const checkedModal = ref(false)
const searchQuery = ref("")
const progressUpload = ref(0)

const content = ref("")
const image = ref("")

const statusOpt = ref([
  {
    name: 'Đã duyệt',
    value: true
  },
  {
    name: 'Chờ duyệt',
    value: false
  }])

const selectedDpt = ref("")
const dptOpt = ref([])
const selectedMjr = ref("")
const mjrOpt = ref([])
const selectedSbj = ref("")
const sbjOpt = ref([])
const chooseDpt = (data) => {
  selectedDpt.value = data.value.id
  fetchAllMajor()
}
const chooseMjr = (data) => {
  selectedMjr.value = data.value.id
  fetchAllSubject()
}
const chooserSbj = (data) => {
  selectedSbj.value = data.value.id
  fetchAllDocuments()
}
const checkedDialog = () => {
  checkedModal.value = true
}
const openDialog = () => {
  createModal.value = true
  fetchCategory()
}
const Documents = ref([])
const CheckedPosts = ref([])
onMounted(() => {
  fetchAllDpt()
})


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
const setContent = (value) => {
  content.value = value
}

const fetchAllDocuments = async () => {
  try {
    await sendGetApi(`/document/public/get-all-active?keywords=${""}&subjectId=${selectedSbj.value}&userId=${""}&page=0`).then((res) => {
      Documents.value = res.data.content
      console.log(res.data.content)
    })
  } catch (err) {
    console.log(err)
  }
}
const fetchAllDpt = async () => {
  try {
    const res = await sendGetApi("/department/public/get-all-department").then((res) => {
      dptOpt.value = res.data
      console.log(res.data)
    })
  } catch (err) {
    console.log(err)
  }
}
const fetchAllMajor = async () => {
  try {
    const res = await sendGetApi(`/specialize/public/get-specialize-by-department?departmentId=${selectedDpt.value}
`).then((res) => {
      mjrOpt.value = res.data
    })
  } catch (err) {
    console.log(err)
  }
}
const fetchAllSubject = async () => {
  try {
    const res = await sendGetApi(`/subject/public/get-all-subject?keywords=${""}&departmentId=${selectedDpt.value}&specializeId=${selectedMjr.value}`).then((res) => {
      sbjOpt.value = res.data.content
    })
  } catch (err) {
    console.log(err)
  }
}
const viewDetail = async (id) => {

  try {
    const res = await sendGetApi(`/blog/all/get-blog-by-id?id=${id}`).then((res) => {

    })
    fetchCategory()
  } catch (err) {
    console.log(err)
  }
  viewModal.value = true
}
const removePost = async (id) => {

}
const approvePost = async () => {
}

const createPost = async () => {

}
const updatePost = async () => {
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
