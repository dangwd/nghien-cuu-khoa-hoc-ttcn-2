<template>
  <Toast />
  <div class="card py-2">
    <div class="flex justify-between mb-2">
      <div class="flex">
        <InputText v-model="searchQuery" placeholder="Tìm kiếm" size="small" class="border-gray-300 rounded-none">
        </InputText>
        <Button icon="pi pi-search"
          class="text-white bg-green-600 hover:bg-green-700 text-sm border-none rounded-none rounded-r-lg"
          @click="fetchAllCategory()" />
      </div>
      <Button icon="pi pi-plus" class="text-white bg-green-600 hover:bg-green-700 text-sm border-none"
        label="Tạo danh mục" @click="openDialog" />
    </div>
    <DataTable scrollable scrollHeight="80vh" class="text-sm" size="small" showGridlines :value="Categories" paginator
      :rows="rows" :page="page" @page="onPageChange($event)" lazy :totalRecords="totalRecords"
      :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
      <Column field="name" header="STT" style="width: 5rem">
        <template #body="{ index }">
          {{ index + 1 }}
        </template>
      </Column>
      <Column class="text-sm" field="id" header="ID" style="width: 15rem"></Column>
      <Column class="text-sm" field="name" header="Danh mục" style="width: 25%"></Column>
      <Column class="text-sm" field="categoryType" header="Kiểu danh mục" style="width: 15%">
        <template #body="slotProps">
          {{ formatCateType(slotProps.data.categoryType) }}
        </template>
      </Column>
      <Column class="text-sm" field="numBlog" header="Số bài viết liên quan" style="width: 25%"></Column>
      <Column class="text-sm" field="" header="Thao tác" style="width: 25%">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button text rounded icon="pi pi-eye" @click="viewDetail(slotProps.data.id)"></Button>
            <Button text rounded icon="pi pi-trash" severity="warning" @click="deleteModal(slotProps.data.id)"></Button>
          </div>
        </template>
      </Column>
    </DataTable>
    <!-- Create -->
    <Dialog v-model:visible="createModal" modal header="Tạo danh mục" :style="{ width: '700px' }">
      <div class="grid grid-cols-1 gap-2">
        <div class="flex flex-col gap-2 w-full">
          <label class="text-sm font-semibold" for="username">Tên danh mục</label>
          <InputText v-model="categoryName" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
            size="small" placeholder="VD: Cơ hội học bổng..." />
        </div>
        <div>
          <label class="text-sm font-semibold" for="username">Kiểu danh mục</label>
          <Dropdown v-model="selectedCate" @change="chooseCate" :options="categoryOpt" optionLabel="name"
            placeholder="Chọn kiểu danh mục" class="w-full md:w-[14rem] rounded-xl text-sm" />
        </div>
      </div>
      <div class="pt-4 flex justify-end">
        <Button class="text-white bg-green-600 hover:bg-green-700 p-1 text-sm border-none" label="Tạo mới"
          @click="createCate()" />
      </div>
    </Dialog>

    <!-- View -->
    <Dialog v-model:visible="viewModal" modal header="Chi tiết" :style="{ width: '700px' }">
      <div class="grid grid-cols-1 gap-2">
        <div class="flex flex-col gap-2 w-full">
          <label class="text-sm font-semibold" for="username">Tên danh mục</label>
          <InputText v-model="categoryNameView" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
            size="small" />
        </div>
        <div class="flex flex-col gap-2 w-full">
          <label class="text-sm font-semibold" for="username">Bài viết liên quan</label>
          <InputText v-model="numBlog" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text" size="small"
            disabled />
        </div>
        <div>
          <label class="text-sm font-semibold" for="username">Kiểu danh mục</label>
          <Dropdown v-model="selectedCateView" @change="chooseCate" :options="categoryOpt" optionLabel="name"
            :placeholder="formatCateType(selectedCateView)" class="w-full md:w-[14rem] rounded-xl text-sm" />
        </div>
      </div>
      <div class="pt-4 flex justify-end">
        <Button class="text-white bg-green-600 hover:bg-green-700 p-1 text-sm border-none" label="Cập nhật"
          @click="updateCate()" />
      </div>
    </Dialog>
    <Dialog v-model:visible="deleteDialog" modal header="Xóa" :style="{ width: '700px' }">
      <div class="text-base font-semibold text-red-600 text-center flex">
        <p>Bạn muốn xóa danh mục {{ categoryNameView }}? Danh mục này hiện có {{ numBlog }} bài viết. Sau khi xóa sẽ xóa
          bài viết liên quan sẽ mất danh mục!</p>
      </div>
      <div class="pt-4 flex justify-end">
        <Button class="text-white bg-red-600 hover:bg-red-700 p-1 text-sm border-none" label="Xóa"
          @click="deleteCate(cateId)" />
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { onMounted, ref, } from 'vue';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import Button from 'primevue/button';
import { sendGetApi, sendPostApi, sendDeleteApi } from '@/api/auth/api';

const rows = ref(5)
const page = ref(0)
const totalRecords = ref()
const toast = useToast()
const createModal = ref(false)
const deleteDialog = ref(false)
const viewModal = ref(false)
const searchQuery = ref("")
const categoryName = ref("")
const categoryNameView = ref("")
const numBlog = ref("")
const selectedCateView = ref("")
const selectedCate = ref("")
const selectedCateValue = ref("")
const cateId = ref("")
const categoryOpt = ref([
  {
    name: "Danh mục bài viết",
    value: "BLOG"
  },
  {
    name: "Danh mục tài liệu",
    value: "DOCUMENT"
  },
])
const onPageChange = (event) => {
  page.value = event.page
  rows.value = event.rows
  fetchAllCategory()
}
const openDialog = () => {
  createModal.value = true
}
const deleteModal = async (id) => {
  deleteDialog.value = true
  cateId.value = id
  try {
    const res = await sendGetApi(`category/public/find-by-id?id=${id}`).then((res) => {
      categoryNameView.value = res.data.name
      numBlog.value = res.data.numBlog
    }).catch((err) => {
      showError(err)
    })
  } catch (err) {
    showError(err)
  }
}
const Categories = ref([])
const showError = (e) => {
  toast.add({ severity: 'error', summary: 'Error!', detail: e || 'Có lỗi xảy ra', life: 3000 });
};
const showSuccess = (res) => {
  toast.add({ severity: 'success', summary: 'Success!', detail: res || 'Thao tác thành công', life: 3000 });
};
onMounted(() => {
  fetchAllCategory()
})
const chooseCate = (data) => {
  selectedCateValue.value = data.value.value
}
const fetchAllCategory = async () => {
  try {
    await sendGetApi(`/category/public/get-all-and-search-category?name=${searchQuery.value ? searchQuery.value : ""}&page=${page.value}&size=${rows.value}`).then((res) => {
      Categories.value = res.data.content
      totalRecords.value = res.data.totalElements
    })
  } catch (err) {
    console.log(err)
  }
}
const createCate = async () => {
  try {
    if (categoryName.value !== "") {
      const res = await sendPostApi("/category/admin/saveOrUpdate", {
        name: categoryName.value,
        image: "",
        numBlog: 0,
        categoryType: selectedCateValue.value
      }).then((res) => {
        showSuccess("Tạo thành công danh mục " + res.data.name)
        fetchAllCategory()
        createModal.value = false
        categoryName.value = ""
        selectedCate.value = ""
        selectedCateValue.value = ""
      }).catch((err) => {
        showError(err)
      })
    } else {
      console.log("Loi")
    }
  } catch (err) {
    showError(err)

  }
}
const viewDetail = async (id) => {
  viewModal.value = true
  cateId.value = id
  try {
    const res = await sendGetApi(`category/public/find-by-id?id=${id}`).then((res) => {
      categoryNameView.value = res.data.name
      numBlog.value = res.data.numBlog
      selectedCateView.value = res.data.categoryType
    })
  } catch (err) {
    showError(err)

  }
}
const updateCate = async () => {
  try {
    const res = await sendPostApi("/category/admin/saveOrUpdate", {
      id: cateId.value,
      name: categoryNameView.value,
      numBlog: numBlog.value,
      categoryType: selectedCateView.value
    }).then((res) => {
      showSuccess("Cập nhật thành công " + res.data.name)
      fetchAllCategory()
      viewModal.value = false
    })
  } catch (err) {
    console.log(err)
  }
}
const deleteCate = async (id) => {
  try {
    const res = await sendDeleteApi(`/category/admin/delete?id=${id}`).then((res) => {
      deleteDialog.value = false
      showSuccess(res.data)
      fetchAllCategory()

    })
  } catch (err) {
    console.log(err)
  }
}
const formatCateType = (value) => {
  switch (value) {
    case 'BLOG':
      return 'Danh mục bài viết'
    case 'DOCUMENT':
      return 'Danh mục tài liệu'
  }
}


</script>
