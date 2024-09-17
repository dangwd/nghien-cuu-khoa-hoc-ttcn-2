<template>
  <Toast />
  <div v-if="isLoading">
    <div class="flex items-center justify-center  w-full h-[100vh]">
      <div class="rounded-md h-12 w-12 border-4 border-t-4 border-green-500 animate-spin absolute"></div>
    </div>
  </div>
  <div v-else class="card py-2">
    <div class="flex justify-between mb-2">
      <div class="flex">
        <InputText v-model="searchQuery" placeholder="Tìm kiếm" size="small" class="border-gray-300 rounded-none">
        </InputText>
        <Button icon="pi pi-search"
          class="text-white bg-green-600 hover:bg-green-700 text-sm border-none rounded-none rounded-r-lg"
          @click="fetchAllPosts()" />
      </div>
      <div class="flex gap-2">
        <Button icon="pi pi-filter" class="text-white bg-green-600 hover:bg-green-700 text-sm border-none"
          label="Bộ lọc" @click="openFilter" />
        <Button icon="pi pi-clock" class="text-white bg-blue-600 hover:bg-blue-700 text-sm border-none"
          label="Bài viết chờ duyệt" :badge="CheckedPosts.length + ''" @click="checkedDialog" />
        <Button icon="pi pi-plus" class="text-white bg-green-600 hover:bg-green-700 text-sm border-none"
          label="Viết bài" @click="openDialog" />
      </div>
    </div>
    <DataTable class="text-sm" size="small" showGridlines :value="Posts" paginator lazy :rows="rows" :page="page"
      @page="onPageChange($event)" :totalRecords="totalRecords" :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem">
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
            <Button text rounded icon="pi pi-trash" severity="warning" @click="deletePost(slotProps.data.id)"></Button>
          </div>
        </template>
      </Column>
    </DataTable>
    <!-- Create -->
    <Dialog v-model:visible="createModal" modal header="Viết bài" :style="{ width: '1094px' }">
      <div class="grid">
        <div class="grid grid-cols-2 gap-2">
          <div class="flex flex-col gap-2 w-full">
            <label class="text-sm font-semibold" for="username">Tiêu đề bài viết</label>
            <InputText v-model="title" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
              size="small" />
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label class="text-sm font-semibold" for="username">Mô tả</label>
            <InputText v-model="description" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
              size="small" />
          </div>
        </div>
        <div class="grid gap-2 pt-2">
          <div class="flex flex-col gap-2 w-full">
            <InputField @input-file="setImage" :value="image" title="Ảnh" type="file-input"></InputField>
            <progress class="progress progress-success w-full" :value="progressUpload" max="100"></progress>
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label class="text-sm font-semibold" for="username">Danh mục</label>
            <Dropdown v-model="categoryId" @change="chooseCategory" :options="categoryOpt" optionLabel="name"
              :placeholder="categoryView" class="w-full md:w-[14rem] rounded-xl text-sm" />
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label class="text-sm font-semibold" for="username">Nội dung</label>
            <InputField @input-change="setContent" :value="content" type="ckeditor"></InputField>
          </div>
        </div>
      </div>
      <div class="flex justify-end pt-2">
        <Button class="text-white bg-green-600 hover:bg-green-700 text-sm border-none" label="Viết bài"
          @click="createPost()" />
      </div>
    </Dialog>
    <!-- View -->
    <Dialog v-model:visible="viewModal" modal :header="'Chi tiết bài viết ' + titleView" :style="{ width: '1094px' }">
      <div class="w-full">
        <Image class="mb-2 rounded-lg" :src="imageView" alt="Image" preview />
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
        <div class="flex flex-col gap-2 w-full">
          <label class="text-sm font-semibold" for="status">Danh mục</label>
          <Dropdown v-model="categoryView" @change="chooseCategory" :options="categoryOpt" optionLabel="name"
            :placeholder="categoryView" class="w-full md:w-[14rem] rounded-xl text-sm" />
        </div>
        <div class="flex flex-col gap-2 w-full">
          <label class="text-sm font-semibold" for="status">Trạng thái</label>
          <Dropdown v-model="statusView" @change="chooseStatus" :options="statusOpt" optionLabel="name"
            :placeholder="formatStatus(statusView)" class="w-full md:w-[14rem] rounded-xl text-sm" />
        </div>
        <div class="w-full">
          <label class="text-sm font-semibold" for="contentView">Nội dung</label>
          <InputField @input-change="setContentView" :value="contentView" type="ckeditor"></InputField>
        </div>
      </div>
      <div class="pt-4 flex justify-end">
        <Button class="text-white bg-green-600 hover:bg-green-700 p-1 text-sm border-none" label="Cập nhật"
          @click="updatePost()" />
        <div class="flex gap-2 pl-2" v-show="statusView == false">
          <Button class="text-white bg-blue-600 hover:bg-blue-700 p-1 text-sm border-none" label="Duyệt bài"
            @click="approvePost()" />
          <Button class="text-white bg-red-600 hover:bg-red-700 p-1 text-sm border-none" label="Xóa"
            @click="removePost()" />
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
                  @click="deletePost(slotProps.data.id)"></Button>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
      <div v-else>
        <h1 class="text-base font-semibold text-center">Hiện không có bài viết cần duyệt!</h1>
      </div>
    </Dialog>
    <!-- Xoa bai viet -->
    <Dialog v-model:visible="deleteModal" modal :header="'Xóa '" :style="{ width: '500px' }">
      <h1 class="text-sm font-semibold text-red-600">Sau khi xóa sẽ không thể khôi phục ?</h1>
      <div class="flex justify-end">
        <Button class="text-white bg-red-600 hover:bg-red-700 text-sm border-none" label="Xóa"
          @click="removePost(postId)" />
      </div>
    </Dialog>
    <Dialog v-model:visible="filterModal" modal header="Tìm kiếm theo" :style="{ width: '1094px' }">
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold" for="username">Tiêu đề bài viết</label>
          <InputText v-model="titleFilter" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
            size="small" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold" for="username">Mô tả</label>
          <InputText v-model="descriptionFilter" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
            size="small" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold" for="username">Nội dung</label>
          <InputText v-model="contentFilter" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
            size="small" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold" for="username">Người đăng</label>
          <InputText v-model="userCreatedFilter" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
            size="small" />
        </div>
        <div class="flex flex-col gap-2 w-full">
          <label class="text-sm font-semibold" for="username">Danh mục</label>
          <Dropdown v-model="categoryId" @change="chooseCategoryFilter" :options="categoryOpt" optionLabel="name"
            :placeholder="categoryView" class="w-full md:w-[14rem] rounded-xl text-sm" />
        </div>
      </div>
      <div class="pt-4 flex justify-end">
        <Button class="text-white bg-green-600 hover:bg-green-700 p-1 text-sm border-none" label="Lọc"
          @click="fetchPostsFilter()" />
      </div>
      <div v-if="PostsFilter.length > 0">
        <DataTable class="text-sm mt-4" showGridlines size="small" :value="PostsFilter" tableStyle="min-width: 50rem">
          <Column field="id" header="ID"></Column>
          <Column field="title" header="Tiêu đề"></Column>
          <Column field="image" header="Ảnh">
            <template #body="slotProps">
              <img class="w-24 h-auto rounded-lg" :src="slotProps.data.image" alt="">
            </template>
          </Column>
          <Column field="description" header="Mô tả"></Column>
          <Column class="text-sm" field="user.fullName" header="Người đăng" style="width: 10rem">
          </Column>
          <Column class="text-sm" field="createdDate" header="Ngày tạo" style="width: 10rem"></Column>

          <Column field="actived" header="Trạng thái">
            <template #body="slotProps">
              {{ formatStatus(slotProps.data.actived) }}
            </template>
          </Column>
          <Column header="Thao tác">
            <template #body="slotProps">
              <div class="flex gap-2">
                <Button text rounded icon="pi pi-eye" @click="viewDetail(slotProps.data.id)"></Button>
                <Button text rounded icon="pi pi-trash" severity="warning"
                  @click="deletePost(slotProps.data.id)"></Button>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
      <div v-else></div>
    </Dialog>
  </div>
</template>

<script setup>
import { onMounted, ref, } from 'vue';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import Button from 'primevue/button';
import { sendGetApi, sendPostApi, sendDeleteApi } from '@/api/auth/api';

const PostsFilter = ref([])
const titleFilter = ref("")
const descriptionFilter = ref("")
const contentFilter = ref("")
const userCreatedFilter = ref("")
const selectedCateFilter = ref("")
const rows = ref(5)
const page = ref(0)
const totalRecords = ref()
const toast = useToast()
const isLoading = ref(true)
const createModal = ref(false)
const viewModal = ref(false)
const deleteModal = ref(false)
const checkedModal = ref(false)
const searchQuery = ref("")
const progressUpload = ref(0)
const title = ref("")
const content = ref("")
const image = ref("")
const description = ref("")
const imageView = ref("")
const filterModal = ref(false)
const titleView = ref("")
const descriptionView = ref("")
const statusView = ref(null)
const contentView = ref("")
const categoryView = ref("")
const categoryId = ref()
const pageNum = ref(0)
const postId = ref("")
const statusOpt = ref([
  {
    name: 'Đã duyệt',
    value: true
  },
  {
    name: 'Chờ duyệt',
    value: false
  }])
const categoryOpt = ref([])

const chooseCategoryFilter = (data) => {
  selectedCateFilter.value = data.value.name
}

const checkedDialog = () => {

  checkedModal.value = true
}
const openDialog = () => {
  createModal.value = true

}
const Posts = ref([])
const CheckedPosts = ref([])
onMounted(() => {
  fetchAllPosts().then(() => {
    isLoading.value = false
  })
  fetchCheckedPosts()
  fetchCategory()
})
const onPageChange = (event) => {
  page.value = event.page
  rows.value = event.rows
  fetchAllPosts()
}
const openFilter = () => {
  filterModal.value = true
}
const chooseCategory = (data) => {
  categoryView.value = data.value.name
  categoryId.value = data.value.id
}
const chooseStatus = (data) => {
  statusView.value = data.value
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
const showSuccess = (res) => {
  toast.add({ severity: 'success', summary: 'Sucess!', detail: res || 'Thao tác thành công', life: 3000 });
};
const showError = (e) => {
  toast.add({ severity: 'error', summary: 'Error!', detail: e || 'Có lỗi xảy ra', life: 3000 });
};
const setContent = (value) => {
  content.value = value
}
const setContentView = (value) => {
  contentView.value = value
}
const fetchAllPosts = async () => {
  try {
    await sendGetApi(`blog/public/get-all-active?page=${page.value}&size=${rows.value}&keywords=${searchQuery.value}`).then((res) => {
      Posts.value = res.data.content
      totalRecords.value = res.data.totalElements
    })
  } catch (err) {
    console.log(err)
  }
}
const fetchPostsFilter = async () => {
  try {
    const res = await sendGetApi(`/blog/blog-manager/filter?title=${titleFilter.value}&description=${descriptionFilter.value}&content=${contentFilter.value}&createdDate=${""}&actived=true&userName=${userCreatedFilter.value}&cateName=${selectedCateFilter.value}`).then((res) => {
      if (res.data.content.length > 0) {
        PostsFilter.value = res.data.content
      } else {
        PostsFilter.value = []
        showError("Không có bài viết liên quan!")
      }
    })
  } catch (err) {
    console.log(err)
  }
}
const fetchCheckedPosts = async () => {
  try {
    const res = await sendGetApi(`/blog/public/get-all-unactive?keywords=${""}`).then((res) => {
      CheckedPosts.value = res.data.content
      console.log(CheckedPosts.value)
    })
  } catch (err) {
    console.log(err)
  }
}
const viewDetail = async (id) => {

  postId.value = id
  try {
    const res = await sendGetApi(`/blog/all/get-blog-by-id?id=${id}`).then((res) => {

      titleView.value = res.data.title
      descriptionView.value = res.data.description
      statusView.value = res.data.actived
      contentView.value = res.data.content
      categoryView.value = res.data.blogCategories[0].category.name
      categoryId.value = res.data.blogCategories[0].category.id
      imageView.value = res.data.image
    })
    fetchCategory()
  } catch (err) {
    console.log(err)
  }
  viewModal.value = true
}
const deletePost = (id) => {
  postId.value = id
  deleteModal.value = true
}
const removePost = async (id) => {
  try {
    const res = await sendDeleteApi(`/blog/all/delete?blogId=${id}`).then((res) => {
      fetchAllPosts()
      checkedDialog.value = false
      deleteModal.value = false
    })
  } catch (err) {
    console.log(err)
  }
}
const approvePost = async () => {
  try {
    const res = await sendPostApi(`blog/blog-manager/active-or-unactive?blogId=${postId.value}`).then((res) => {
      showSuccess("Duyệt thành công")
      fetchAllPosts()
      viewDetail.value = false

    })
  } catch (err) {
    console.log(err)
  }
}
const fetchCategory = async () => {
  try {
    const res = sendGetApi("/category/public/get-all-and-search-category?name=").then((res) => {
      categoryOpt.value = res.data.content
    })
  } catch (err) {
    console.log(err)
  }
}
const createPost = async () => {
  try {
    await sendPostApi("/blog/all/save-update", {
      title: title.value,
      description: description.value,
      image: image.value,
      content: content.value,
      listCategoryId: [categoryId.value]
    }).then((res) => {
      fetchAllPosts()
      showSuccess("Tạo thành công bài viết " + res.data.title)
      title.value = ""
      description.value = ""
      image.value = ""
      content.value = ""
      categoryId.value = ""
      createModal.value = false
    })
  } catch (err) {
    console.log(err)
  }
}
const updatePost = async () => {
  try {
    const res = await sendPostApi("/blog/all/save-update", {
      id: postId.value,
      title: titleView.value,
      description: descriptionView.value,
      image: imageView.value,
      content: contentView.value,
      listCategoryId: [categoryId.value]
    }).then((res) => {
      fetchAllPosts()
      showSuccess("Cập nhật thành công!")
      viewModal.value = false
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
