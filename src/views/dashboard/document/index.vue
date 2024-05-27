<template>
  <Toast />
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
                @click="openDeleteDialog(slotProps.data.id)"></Button>
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
      <div class="grid">
        <div class="grid grid-cols-2 gap-2">
          <div class="flex flex-col gap-2 w-full">
            <label class="text-sm font-semibold" for="username">Tên tài liệu</label>
            <InputText v-model="title" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
              size="small" />
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label class="text-sm font-semibold" for="username">Mô tả</label>
            <InputText v-model="description" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
              size="small" />
          </div>
        </div>
        <div class="grid grid-cols-1 gap-2 w-full pt-2">
          <Dropdown filter v-model="selectedDpt" @change="chooseDpt" :options="dptOpt" optionLabel="nameDepartment"
            placeholder="Khoa" class=" rounded-xl text-sm" />
          <Dropdown filter v-model="selectedMjr" @change="chooseMjr" :options="mjrOpt" optionLabel="nameSpecialize"
            placeholder="Ngành" class=" rounded-xl text-sm" />
          <Dropdown filter v-model="selectedSbj" @change="chooserSbj" :options="sbjOpt" optionLabel="nameSubject"
            placeholder="Bộ môn" class=" rounded-xl text-sm" />
        </div>
        <div class="grid gap-2 pt-2">
          <div class="flex flex-col gap-2 w-full">
            <InputField @input-file="setDocument" :value="docLink" title="File" type="file-input"></InputField>
            <progress class="progress progress-success w-full" :value="progressUpload" max="100"></progress>
          </div>
        </div>
      </div>
      <div class="flex justify-end pt-2">
        <Button class="text-white bg-green-600 hover:bg-green-700 text-sm border-none" label="Đăng tải"
          @click="createPost()" />
      </div>
    </Dialog>
    <!-- View -->
    <Dialog v-model:visible="viewModal" modal header="Chi tiết" :style="{ width: '1094px' }">
      <div class="grid">
        <div class="grid grid-cols-2 gap-2">
          <div class="flex flex-col gap-2 w-full">
            <label class="text-sm font-semibold" for="username">Tên tài liệu</label>
            <InputText v-model="titleView" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
              size="small" />
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label class="text-sm font-semibold" for="username">Mô tả</label>
            <InputText v-model="descriptionView" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
              size="small" />
          </div>
        </div>
        <div class="grid grid-cols-1 gap-2 w-full pt-2">
          <Dropdown filter v-model="selectedDpt" @change="chooseDpt" :options="dptOpt" optionLabel="nameDepartment"
            placeholder="Khoa" class=" rounded-xl text-sm" />
          <Dropdown filter v-model="selectedMjr" @change="chooseMjr" :options="mjrOpt" optionLabel="nameSpecialize"
            placeholder="Ngành" class=" rounded-xl text-sm" />
          <Dropdown filter v-model="selectedSbjView" @change="chooserSbj" :options="sbjOpt" optionLabel="nameSubject"
            :placeholder="selectedSbjView" class=" rounded-xl text-sm" />
        </div>
        <div class="grid gap-2 pt-2">
          <label class="text-sm font-semibold" for="username">Tài liệu</label>
          <a :href="linkFileView"><span class="text-sm text-blue-600 font-semibold underline hover:text-blue-700">Xem
              truớc</span></a>
        </div>
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
          <Column class="text-sm" field="name" header="Tiêu đề bài viết" style="width: 20rem">
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
                  @click="removeDoc(slotProps.data.id)"></Button>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
      <div v-else>
        <h1 class="text-base font-semibold text-center">Hiện không có bài viết cần duyệt!</h1>
      </div>
    </Dialog>
    <Dialog v-model:visible="deleteModal" modal :header="'Xóa '" :style="{ width: '500px' }">
      <h1 class="text-sm font-semibold text-red-600">Sau khi xóa sẽ không thể khôi phục ?</h1>
      <div class="flex justify-end">
        <Button class="text-white bg-red-600 hover:bg-red-700 text-sm border-none" label="Xóa"
          @click="removeDoc(docId)" />
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
import { sendGetApi, sendPostApi, sendDeleteApi } from '@/api/auth/api';
const toast = useToast()
const createModal = ref(false)
const viewModal = ref(false)
const deleteModal = ref(false)
const checkedModal = ref(false)
const searchQuery = ref("")
const progressUpload = ref(0)
const title = ref("")
const description = ref("")
const docLink = ref("")
const titleView = ref("")
const descriptionView = ref("")
const selectedSbjView = ref("")
const selectedSbjIdView = ref("")
const linkFileView = ref("")
const docId = ref("")
const statusView = ref("")
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
  selectedSbjIdView.value = data.value.id
  fetchAllDocuments()
  fetchAllUncDoc()
}
const checkedDialog = () => {
  checkedModal.value = true
}
const openDialog = () => {
  createModal.value = true
}
const Documents = ref([])
const CheckedPosts = ref([])
onMounted(() => {
  fetchAllDpt()
})
const showSuccess = (res) => {
  toast.add({ severity: 'success', summary: 'Sucess!', detail: res || 'Thao tác thành công', life: 3000 });
};
const showError = (e) => {
  toast.add({ severity: 'error', summary: 'Error!', detail: e || 'Có lỗi xảy ra', life: 3000 });
};
const openDeleteDialog = (id) => {
  deleteModal.value = true
  docId.value = id
}
const setDocument = (file) => {
  docLink.value = file
  var storageRef = firebase.storage().ref('documents/' + file.name)
  let uploadTask = storageRef.put(file)
  uploadTask.on('stage_changed', (snapshot) => {
    progressUpload.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  }, (error) => {
    console.log(error)
  }, () => {
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      docLink.value = downloadURL
      console.log(downloadURL)
    })
  })
}


const fetchAllDocuments = async () => {
  try {
    await sendGetApi(`/document/public/get-all-active?keywords=${""}&subjectId=${selectedSbj.value}&userId=${""}&page=0`).then((res) => {
      Documents.value = res.data.content
    })
  } catch (err) {
    console.log(err)
  }
}
const fetchAllUncDoc = async () => {
  try {
    const res = await sendGetApi(`/document/public/get-all-unactive?keywords=${""}&subjectId=${selectedSbj.value}`).then((res) => {
      CheckedPosts.value = res.data.content

    })
  } catch (err) {
    showError(err)
  }
}
const fetchAllDpt = async () => {
  try {
    const res = await sendGetApi("/department/public/get-all-department").then((res) => {
      dptOpt.value = res.data
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
  docId.value = id
  try {
    const res = await sendGetApi(`/document/public/findbyid?id=${id}`).then((res) => {
      titleView.value = res.data.name
      descriptionView.value = res.data.description
      selectedSbjView.value = res.data.nameSubject
      linkFileView.value = res.data.linkFile
      statusView.value = res.data.actived
    })

  } catch (err) {
    console.log(err)
  }
  viewModal.value = true
}
const removeDoc = async () => {
  try {
    const res = await sendDeleteApi(`/document/all/delete?documentId=${docId.value}`).then((res) => {
      showSuccess(`Xoá thành công tài liệu ${docId.value}`)
      fetchAllDocuments()
      deleteModal.value = false
    })
  } catch (err) {

  }
}
const approvePost = async () => {
}

const createPost = async () => {
  try {
    if (title.value !== "" && description.value !== "") {
      const res = await sendPostApi("/document/all/save-update", {
        name: title.value,
        image: "https://firebasestorage.googleapis.com/v0/b/vnua-forums-upload.appspot.com/o/image%2Fthumbnail.jpg?alt=media&token=f6ebcd08-56af-42a3-9ddf-1372f5e95218",
        description: description.value,
        linkFile: docLink.value,
        subjectId: selectedSbj.value
      }).then((res) => {
        showSuccess(`Tạo thành công ${res.data.name}`)
        console.log(res)
        fetchAllDocuments()
        createModal.value = false
        title.value = ""
        description.value = ""
        docLink.value = ""
        selectedSbj.value = ""
        progressUpload.value = 0
      })
    } else {
      showError("Trường nhập thiếu, vui lòng điền đủ!")
    }
  } catch (err) {
    console.log(err)
  }
}
const updatePost = async () => {
  try {
    const res = await sendPostApi("/document/all/save-update", {
      id: docId.value,
      name: titleView.value,
      image: "https://firebasestorage.googleapis.com/v0/b/vnua-forums-upload.appspot.com/o/image%2Fthumbnail.jpg?alt=media&token=f6ebcd08-56af-42a3-9ddf-1372f5e95218",
      description: descriptionView.value,
      linkFile: linkFileView.value,
      subjectId: selectedSbjIdView.value
    }).then((res) => {
      showSuccess(`Cập nhật ${res.data.name} thành công!`)
      fetchAllDocuments()
      viewModal.value = false
    })
  } catch (err) {
    console.log(err)
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
