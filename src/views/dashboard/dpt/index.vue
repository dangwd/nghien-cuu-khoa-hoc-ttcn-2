<template>
  <Toast />
  <div>
    <TabView>
      <TabPanel header="Khoa">
        <div>
          <div class="flex justify-between mb-2">
            <div class="flex">
              <InputText v-model="searchQuery" placeholder="Tìm kiếm" size="small"
                class="border-gray-300 rounded-l-lg rounded-r-none">
              </InputText>
              <Button icon="pi pi-search"
                class="text-white bg-green-600 hover:bg-green-700 text-sm border-none rounded-none rounded-r-lg" />
            </div>
            <Button icon="pi pi-plus" class="text-white bg-green-600 hover:bg-green-700 text-sm border-none"
              label="Tạo khoa" @click="openDialog" />
          </div>
          <DataTable class="text-sm" size="small" showGridlines :value="Department" tableStyle="min-width: 50rem">
            <Column header="STT">
              <template #body="{ index }">
                {{ index + 1 }}
              </template>
            </Column>
            <Column field="id" header="ID"></Column>
            <Column field="codeDepartment" header="Mã Khoa"></Column>
            <Column field="nameDepartment" header="Tên Khoa"></Column>
            <Column header="Thao tác">
              <template #body="slotProps">
                <div class="flex gap-2">
                  <Button text rounded icon="pi pi-eye" @click="viewDetail(slotProps.data.id)"></Button>
                  <Button text rounded icon="pi pi-trash" severity="warning"
                    @click="deleteDptDialog(slotProps.data.id)"></Button>
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </TabPanel>
      <TabPanel header="Ngành">
        <div>
          <div class="flex justify-between mb-2">
            <div class="flex">
              <InputText v-model="searchQuery" placeholder="Tìm kiếm" size="small"
                class="border-gray-300 rounded-l-lg rounded-r-none">
              </InputText>
              <Button icon="pi pi-search"
                class="text-white bg-green-600 hover:bg-green-700 text-sm border-none rounded-none rounded-r-lg" />
            </div>
            <Button icon="pi pi-plus" class="text-white bg-green-600 hover:bg-green-700 text-sm border-none"
              label="Tạo ngành" @click="createMajorDialog" />
          </div>
          <div class="flex flex-col mb-4">
            <label class="text-sm font-medium text-gray-900" for="">Chọn Khoa</label>
            <Dropdown :placeholder="dptNameChoose" @change="chooseDpt" :options="Department"
              optionLabel="nameDepartment">
            </Dropdown>
          </div>
          <div v-show="Major.length > 0">
            <DataTable class="text-sm" size="small" showGridlines :value="Major" tableStyle="min-width: 50rem">
              <Column header="STT">
                <template #body="{ index }">
                  {{ index + 1 }}
                </template>
              </Column>
              <Column field="id" header="ID"></Column>
              <Column field="codeSpecialize" header="Mã Ngành"></Column>
              <Column field="nameSpecialize" header="Tên Ngành"></Column>
              <Column header="Thao tác">
                <template #body="slotProps">
                  <div class="flex gap-2">
                    <Button text rounded icon="pi pi-eye" @click="viewMjrDetail(slotProps.data.id)"></Button>
                    <Button text rounded icon="pi pi-trash" severity="warning"
                      @click="deleteMjrDialog(slotProps.data.id)"></Button>
                  </div>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Bộ môn">
        <div>
          <div class="flex justify-between mb-2">
            <div class="flex">
              <InputText v-model="searchSbjByName" placeholder="Tìm kiếm" size="small"
                class="border-gray-300 rounded-l-lg rounded-r-none">
              </InputText>
              <Button @click="fetchAllSubject()" icon="pi pi-search"
                class="text-white bg-green-600 hover:bg-green-700 text-sm border-none rounded-none rounded-r-lg" />
            </div>
            <Button icon="pi pi-plus" class="text-white bg-green-600 hover:bg-green-700 text-sm border-none"
              label="Tạo môn học" @click="createISbjDialog" :disabled="isDisable" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col mb-4">
              <label class="text-sm font-medium text-gray-900" for="">Chọn Khoa</label>
              <Dropdown :placeholder="dptNameChoose" @change="chooseDpt" :options="Department"
                optionLabel="nameDepartment">
              </Dropdown>
            </div>
            <div class="flex flex-col mb-4">
              <label class="text-sm font-medium text-gray-900" for="">Chọn Ngành</label>
              <Dropdown :placeholder="mjrNameChoose" @change="chooseMjr" :options="Major" optionLabel="nameSpecialize">
              </Dropdown>
            </div>
          </div>
          <div v-show="Subject.length > 0">
            <DataTable lazy paginator :rows="rows" @page="onPageChange($event)" :totalRecords="totalRecords"
              :page="page" :rowsPerPageOptions="[5, 10, 20, 50]" class="text-sm" size="small" showGridlines
              :value="Subject" tableStyle="min-width: 50rem">
              <Column header="STT">
                <template #body="{ index }">
                  {{ index + 1 }}
                </template>
              </Column>
              <Column field="id" header="ID"></Column>
              <Column field="codeSubject" header="Mã Môn học"></Column>
              <Column field="nameSubject" header="Tên Môn học"></Column>
              <Column header="Thao tác">
                <template #body="slotProps">
                  <div class="flex gap-2">
                    <Button text rounded icon="pi pi-eye" @click="viewSbjDetail(slotProps.data.id)"></Button>
                    <Button text rounded icon="pi pi-trash" severity="warning"
                      @click="deleteSbjDialog(slotProps.data.id)"></Button>
                  </div>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </TabPanel>
    </TabView>

    <!-- Dpt -->
    <Dialog v-model:visible="createModal" modal header="Thêm khoa" :style="{ width: '700px' }">
      <div class="grid">
        <div class="flex flex-col">
          <label class="text-sm text-gray-900 font-medium" for="">Mã Khoa</label>
          <InputText v-model="createDptCode" class="w-full text-sm font-normal"></InputText>
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-900 font-medium" for="">Tên Khoa</label>
          <InputText v-model="createDptName" class="w-full text-sm font-normal"></InputText>
        </div>
      </div>
      <div class="pt-4 flex justify-end">
        <Button class="text-white bg-green-600 hover:bg-green-700 p-1 text-sm border-none" label="Tạo mới"
          @click="createDpt()" />
      </div>
    </Dialog>
    <Dialog v-model:visible="deleteModal" modal header="Xóa khoa" :style="{ width: '700px' }">
      <h1 class="text-sm font-semibold text-red-600">Sau khi xóa sẽ không thể khôi phục ?</h1>
      <div class="pt-4 flex justify-end">
        <Button class="text-white bg-red-600 hover:bg-red-700 p-1 text-sm border-none" label="Xác nhận"
          @click="deleteDpt()" />
      </div>
    </Dialog>
    <Dialog v-model:visible="detailModal" modal header="Chi tiết" :style="{ width: '700px' }">
      <div class="grid">
        <div class="flex flex-col">
          <label class="text-sm text-gray-900 font-medium" for="">Mã Khoa</label>
          <InputText v-model="viewDptCode" class="w-full text-sm font-normal"></InputText>
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-900 font-medium" for="">Tên Khoa</label>
          <InputText v-model="viewDptName" class="w-full text-sm font-normal"></InputText>
        </div>
      </div>
      <div class="pt-4 flex justify-end">
        <Button class="text-white bg-green-600 hover:bg-green-700 p-1 text-sm border-none" label="Cập nhật"
          @click="updateDpt()" />
      </div>
    </Dialog>


    <!-- Major -->
    <Dialog v-model:visible="createMajorModal" modal header="Thêm Ngành" :style="{ width: '700px' }">
      <div class="grid">
        <div class="flex flex-col mb-4">
          <label class="text-sm font-medium text-gray-900" for="">Chọn Khoa</label>
          <Dropdown :placeholder="dptNameChoose" @change="chooseDpt" :options="Department" optionLabel="nameDepartment">
          </Dropdown>
        </div>
        <div class="flex flex-col  mb-4">
          <label class="text-sm text-gray-900 font-medium" for="">Mã Ngành</label>
          <InputText v-model="createMjrCode" class="w-full text-sm font-normal"></InputText>
        </div>
        <div class="flex flex-col  mb-4">
          <label class="text-sm text-gray-900 font-medium" for="">Tên Ngành</label>
          <InputText v-model="createMjrName" class="w-full text-sm font-normal"></InputText>
        </div>
      </div>
      <div class="pt-4 flex justify-end">
        <Button class="text-white bg-green-600 hover:bg-green-700 p-1 text-sm border-none" label="Tạo mới"
          @click="createMjr()" />
      </div>
    </Dialog>
    <Dialog v-model:visible="detailMjrModal" modal header="Chi tiết" :style="{ width: '700px' }">
      <div class="grid">
        <div class="flex flex-col">
          <label class="text-sm text-gray-900 font-medium" for="">Mã Ngành</label>
          <InputText v-model="viewMjrCode" class="w-full text-sm font-normal"></InputText>
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-900 font-medium" for="">Tên Ngành</label>
          <InputText v-model="viewMjrName" class="w-full text-sm font-normal"></InputText>
        </div>
      </div>
      <div class="pt-4 flex justify-end">
        <Button class="text-white bg-green-600 hover:bg-green-700 p-1 text-sm border-none" label="Cập nhật"
          @click="updateMjr()" />
      </div>
    </Dialog>
    <Dialog v-model:visible="deleteMjrModal" modal header="Xóa ngành" :style="{ width: '700px' }">
      <h1 class="text-sm font-semibold text-red-600">Sau khi xóa sẽ không thể khôi phục ?</h1>
      <div class="pt-4 flex justify-end">
        <Button class="text-white bg-red-600 hover:bg-red-700 p-1 text-sm border-none" label="Xác nhận"
          @click="deleteMjr()" />
      </div>
    </Dialog>

    <!-- Subject -->
    <Dialog v-model:visible="createSbjModal" modal header="Thêm Môn học" :style="{ width: '700px' }">
      <div class="grid">
        <div class="flex flex-col  mb-4">
          <label class="text-sm text-gray-900 font-medium" for="">Mã Môn học</label>
          <InputText v-model="createSbjCode" class="w-full text-sm font-normal"></InputText>
        </div>
        <div class="flex flex-col  mb-4">
          <label class="text-sm text-gray-900 font-medium" for="">Tên Môn học</label>
          <InputText v-model="createSbjName" class="w-full text-sm font-normal"></InputText>
        </div>
      </div>
      <div class="pt-4 flex justify-end">
        <Button class="text-white bg-green-600 hover:bg-green-700 p-1 text-sm border-none" label="Tạo mới"
          @click="createSbj()" />
      </div>
    </Dialog>
    <Dialog v-model:visible="detailSbjModal" modal header="Chi tiết" :style="{ width: '700px' }">
      <div class="grid">
        <div class="flex flex-col">
          <label class="text-sm text-gray-900 font-medium" for="">Mã Môn học</label>
          <InputText v-model="viewSbjCode" class="w-full text-sm font-normal"></InputText>
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-900 font-medium" for="">Tên Môn học</label>
          <InputText v-model="viewSbjName" class="w-full text-sm font-normal"></InputText>
        </div>
      </div>
      <div class="pt-4 flex justify-end">
        <Button class="text-white bg-green-600 hover:bg-green-700 p-1 text-sm border-none" label="Cập nhật"
          @click="updateSbj()" />
      </div>
    </Dialog>
    <Dialog v-model:visible="deleteSbjModal" modal header="Xóa ngành" :style="{ width: '700px' }">
      <h1 class="text-sm font-semibold text-red-600">Sau khi xóa sẽ không thể khôi phục ?</h1>
      <div class="pt-4 flex justify-end">
        <Button class="text-white bg-red-600 hover:bg-red-700 p-1 text-sm border-none" label="Xác nhận"
          @click="deleteSbj()" />
      </div>
    </Dialog>

  </div>
</template>
<script setup>
import { sendDeleteApi, sendGetApi, sendPostApi } from '@/api/auth/api';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
const toast = useToast()
const page = ref(0)
const rows = ref(10)

const viewSbjCode = ref("")
const viewSbjName = ref("")
const viewMjrCode = ref("")
const viewMjrName = ref("")
const viewDptCode = ref("")
const viewDptName = ref("")
const totalRecords = ref()
const createModal = ref(false)
const createMajorModal = ref(false)
const detailModal = ref(false)
const detailMjrModal = ref(false)
const detailSbjModal = ref(false)
const createMjrCode = ref("")
const createMjrName = ref("")
const createSbjCode = ref("")
const createSbjName = ref("")
const deleteModal = ref(false)
const deleteMjrModal = ref(false)
const deleteSbjModal = ref(false)
const isDisable = ref(true)
const Department = ref([])
const Major = ref([])
const Subject = ref([])
const mjrId = ref("")
const searchSbjByName = ref("")
const dptNameChoose = ref("")
const mjrNameChoose = ref("")
const createDptCode = ref("")
const createDptName = ref("")
const createSbjModal = ref(false)
const searchQuery = ref("")
const dptId = ref("")
const sbjId = ref("")
onMounted(() => {
  fetchAllDpt()
})
const onPageChange = (event) => {
  page.value = event.page
  rows.value = event.rows
  fetchAllSubject()
}
const viewSbjDetail = async (id) => {
  detailSbjModal.value = true
  sbjId.value = id
  try {
    const res = await sendGetApi(`subject/public/find-by-id?subjectId=${id}`).then((res) => {
      viewSbjCode.value = res.data.codeSubject
      viewSbjName.value = res.data.nameSubject
    })
  } catch (err) {
    console.log(err)
  }
}
const updateSbj = async () => {
  const data = {
    id: sbjId.value,
    codeSubject: viewSbjCode.value,
    nameSubject: viewSbjName.value,
    specializeId: mjrId.value
  }
  try {
    const res = await sendPostApi("/subject/document-manager/save-update", data).then((res) => {
      showSuccess(`Cập nhật thành công ${res.data.nameSubject}`)
      detailSbjModal.value = false
      fetchAllSubject()
    })
  } catch (err) {
    showError(err)
    console.log(err)
  }
}
const viewMjrDetail = async (id) => {
  detailMjrModal.value = true
  mjrId.value = id
  try {
    const res = await sendGetApi(`/specialize/public/find-by-id?specializeId=${id}`).then((res) => {
      viewMjrCode.value = res.data.codeSpecialize
      viewMjrName.value = res.data.nameSpecialize
    })
  } catch (err) {
    console.log(err)
  }
}
const chooseDpt = (data) => {
  dptId.value = data.value.id
  dptNameChoose.value = data.value.nameDepartment
  fetchAllMajor()
}
const viewDetail = async (id) => {
  dptId.value = id
  detailModal.value = true
  try {
    const res = await sendGetApi(`/department/public/find-by-id?departmentId=${id}`).then((res) => {
      viewDptCode.value = res.data.codeDepartment
      viewDptName.value = res.data.nameDepartment
      console.log(res)
    })
  } catch (err) {
    console.log(err)
  }
}
const updateDpt = async () => {
  const data = {
    id: dptId.value,
    codeDepartment: viewDptCode.value,
    nameDepartment: viewDptName.value
  }
  try {
    const res = await sendPostApi("/department/document-manager/save-update", data).then((res) => {
      showSuccess("Cập nhật thành công!")
      detailModal.value = false
      fetchAllDpt()
    })
  } catch (err) {
    showError(err)
    console.log(err)
  }
}
const chooseMjr = (data) => {
  mjrId.value = data.value.id
  mjrNameChoose.value = data.value.nameSpecialize
  isDisable.value = false
  fetchAllSubject()
}
const updateMjr = async () => {
  const data = {
    id: mjrId.value,
    codeSpecialize: viewMjrCode.value,
    nameSpecialize: viewMjrName.value,
    departmentId: dptId.value
  }
  try {
    const res = await sendPostApi("specialize/document-manager/save-update", data).then((res) => {
      showSuccess(`Cập nhật thành công ${res.data.nameSpecialize}`)
      detailMjrModal.value = false
      fetchAllMajor()
    })
  } catch (err) {
    showError(err)
    console.log(err)
  }
}
const showSuccess = (res) => {
  toast.add({ severity: 'success', summary: 'Sucess!', detail: res || 'Thao tác thành công!', life: 3000 });
};
const showError = (e) => {
  toast.add({ severity: 'success', summary: 'Sucess!', detail: e || 'Có lỗi xảy ra!', life: 3000 });
};
const openDialog = () => {
  createModal.value = true
}
const createMajorDialog = () => {
  createMajorModal.value = true
}
const createISbjDialog = () => {
  createSbjModal.value = true
}
const deleteDptDialog = async (id) => {
  deleteModal.value = true
  dptId.value = id

}
const deleteSbjDialog = (id) => {
  deleteSbjModal.value = true
  sbjId.value = id
}
const deleteMjrDialog = (id) => {
  deleteMjrModal.value = true
  mjrId.value = id
}
const fetchAllDpt = async () => {
  try {
    const res = await sendGetApi("/department/public/get-all-department").then((res) => {
      Department.value = res.data
    })
  } catch (err) {
    console.log(err)
  }
}
const createDpt = async () => {
  const data = {
    codeDepartment: createDptCode.value,
    nameDepartment: createDptName.value
  }
  const res = await sendPostApi("department/document-manager/save-update", data).then((res) => {
    fetchAllDpt()
    createDptCode.value = ""
    createDptName.value = ""
    showSuccess(`Tạo thành công khoa ${res.data.nameDepartment}`)
    createModal.value = false
  }).catch((err) => {
    showError(err)
  })
}

const deleteDpt = async () => {
  try {
    const res = await sendDeleteApi(`department/document-manager/delete?departmentId=${dptId.value}`).then((res) => {
      fetchAllDpt()
      deleteModal.value = false
      showSuccess(res.data)

    }).catch((e) => {
      showError(e)
    })
  } catch (err) {
    console.log(err)
  }
}

const fetchAllMajor = async () => {
  try {
    const res = await sendGetApi(`/specialize/public/get-specialize-by-department?departmentId=${dptId.value}`).then((res) => {
      Major.value = res.data
    })
  } catch (err) {
    console.log(err)
  }
}
const createMjr = async () => {
  const data = {
    codeSpecialize: createMjrCode.value,
    nameSpecialize: createMjrName.value,
    departmentId: dptId.value
  }
  try {
    const res = await sendPostApi("/specialize/document-manager/save-update", data).then((res) => {
      fetchAllMajor()
      createMajorModal.value = false
      showSuccess(`Tạo thành công ngành ${res.data.nameSpecialize}`)
    })
  } catch (err) {
    console.log(err)
  }
}
const deleteMjr = async () => {
  try {
    const res = await sendDeleteApi(`/specialize/document-manager/delete?specializeId=${mjrId.value}`).then((res) => {
      fetchAllMajor()
      deleteMjrModal.value = false
      showSuccess(res.data)
    })
  } catch (err) {
    console.log(err)
  }
}
const fetchAllSubject = async () => {
  try {
    const res = await sendGetApi(`/subject/public/get-all-subject?keywords=${searchSbjByName.value}&departmentId=${dptId.value}&specializeId=${mjrId.value}&page=${page.value}&size=${rows.value}`).then((res) => {
      Subject.value = res.data.content
      totalRecords.value = res.data.totalElements
    })
  } catch (err) {
    console.log(err)
  }
}
const createSbj = async () => {
  const data = {
    codeSubject: createSbjCode.value,
    nameSubject: createSbjName.value,
    specializeId: mjrId.value
  }
  try {
    const res = await sendPostApi("subject/document-manager/save-update", data).then((res) => {
      fetchAllSubject()
      createSbjModal.value = false
      showSuccess(`Tạo thành công môn học ${res.data.nameSubject}`)
    })
  } catch (err) {
    console.log(err)
  }
}
const deleteSbj = async () => {
  try {
    const res = await sendDeleteApi(`subject/document-manager/delete?subjectId=${sbjId.value}`).then((res) => {
      fetchAllSubject()
      deleteSbjModal.value = false
      showSuccess(res.data)
    })
  } catch (err) {
    console.log(err)
  }
}
</script>
<style></style>