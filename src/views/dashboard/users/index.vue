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
        <InputText v-model="userNameFilter" placeholder="Tìm kiếm" size="small" class="border-gray-300 rounded-none">
        </InputText>
        <Button icon="pi pi-search"
          class="text-white bg-green-600 hover:bg-green-700 text-sm border-none rounded-none rounded-r-lg"
          @click="fetchAllUser()" />
      </div>
      <div class="flex gap-2">
        <Button icon="pi pi-filter" class="text-white bg-green-600 hover:bg-green-700 text-sm border-none"
          label="Bộ lọc" @click="openFilter" />
        <Button icon="pi pi-plus" class="text-white bg-green-600 hover:bg-green-700 text-sm border-none"
          label="Tạo mới tài khoản" @click="openDialog" />
      </div>
    </div>
    <DataTable scrollable scrollHeight="80vh" class="text-sm" lazy size="small" showGridlines :value="Users" paginator
      :rows="rows" :totalRecords="totalRecords" :page="page" @page="onPageChange($event)"
      :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
      <Column field="name" header="STT" style="width: 5rem">
        <template #body="{ index }">
          {{ index + 1 }}
        </template>
      </Column>
      <Column class="text-sm" field="username" header="Tài khoản" style="width: 25%">
      </Column>
      <Column class="text-sm" field="fullName" header="Chủ sở hữu" style="width: 20rem">
      </Column>
      <Column class="text-sm" field="avatar" header="Ảnh đại diện" style="width: 17rem">
        <template #body="slotProps">
          <img class="w-14 h-14 rounded-full"
            :src="slotProps.data.avatar ? slotProps.data.avatar : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'"
            alt="">
        </template>
      </Column>
      <Column class="text-sm" field="role" header="Vai trò" style="width: 10rem">
        <template #body="slotProps">
          {{ formatRole(slotProps.data.role) }}
        </template>
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
            <Button text rounded :icon="slotProps.data.actived ? 'pi pi-lock-open' : 'pi pi-lock'" severity="warning"
              @click="lockUser(slotProps.data.id)"></Button>
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
    <Dialog v-model:visible="viewModal" modal :header="`Chi tiết tài khoản ${fullNameView}`"
      :style="{ width: '700px' }">
      <div class="grid gap-4">
        <div class="flex items-center justify-center">
          <img class="w-24 h-24 rounded-full"
            :src="imageView ? imageView : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'" alt="">
        </div>
        <div class="flex gap-2">
          <div class="flex flex-col gap-2 w-full">
            <label class="text-sm font-semibold" for="username">Tên người dùng</label>
            <InputText v-model="fullNameView" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
              size="small" placeholder="Nguyen Van A" />
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label class="text-sm font-semibold" for="username">Tài khoản</label>
            <InputText v-model="usernameView" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
              size="small" placeholder="abc@gmail.com" />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold" for="username">Mật khẩu</label>
          <InputText v-model="passCheckView" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
            size="small" placeholder="**********" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold" for="username">Nhập lại mật khẩu</label>
          <InputText v-model="passwordView" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
            size="small" placeholder="**********" />
        </div>
        <div>
          <label class="text-sm font-semibold" for="username">Vai trò</label>
          <Dropdown v-model="roleView" @change="chooseRole" :options="roleOpt" optionLabel="name"
            :placeholder="formatRole(roleView)" class="w-full md:w-[14rem] rounded-xl text-sm" />
        </div>
        <div>
          <label class="text-sm font-semibold" for="username">Trạng thái</label>
          <Dropdown v-model="statusView" @change="chooseStatus" :options="statusOpt" optionLabel="name"
            :placeholder="formatStatus(statusView)" class="w-full md:w-[14rem] rounded-xl text-sm" />
        </div>
      </div>
      <div class="pt-4 flex justify-end">
        <Button class="text-white bg-green-600 hover:bg-green-700 p-1 text-sm border-none" label="Cập nhật"
          @click="updateAccount()" />
      </div>
    </Dialog>

    <!-- Filter -->
    <Dialog v-model:visible="filterModal" modal header="Tìm kiếm theo" :style="{ width: '1094px' }">
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-2 w-full">
          <label class="text-sm font-semibold" for="username">Trạng thái tài khoản</label>
          <Dropdown v-model="selectedStatusFilter" @change="chooseStatusFilter" :options="statusOptFilter"
            optionLabel="name" placeholder="Trạng thái" class="w-full md:w-[14rem] rounded-xl text-sm" />
        </div>
        <div class="flex flex-col gap-2 w-full">
          <label class="text-sm font-semibold" for="username">Vai trò</label>
          <Dropdown v-model="selectedRoleFilter" @change="chooseRoleFilter" :options="roleOptFilter" optionLabel="name"
            class="w-full md:w-[14rem] rounded-xl text-sm" />
        </div>
        <div class="flex flex-col gap-2 w-full">
          <label class="text-sm font-semibold" for="username">Tài khoản</label>
          <InputText v-model="userNameFilter" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
            size="small" />
        </div>
        <div class="flex flex-col gap-2 w-full">
          <label class="text-sm font-semibold" for="username">Tên người dùng</label>
          <InputText v-model="fullNameFilter" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
            size="small" />
        </div>
      </div>
      <div class="pt-4 flex justify-end">
        <Button class="text-white bg-green-600 hover:bg-green-700 p-1 text-sm border-none" label="Lọc"
          @click="fetchUserFilter()" />
      </div>
      <div v-if="UsersFilter.length > 0">
        <DataTable class="text-sm mt-4" showGridlines size="small" :value="UsersFilter" tableStyle="min-width: 50rem">
          <Column field="id" header="ID"></Column>
          <Column field="username" header="Tài khoản"></Column>
          <Column field="fullName" header="Chủ sở hữu"></Column>
          <Column field="role" header="Vai trò">
            <template #body="slotProps">
              {{ formatRole(slotProps.data.role) }}
            </template>
          </Column>
          <Column field="actived" header="Trạng thái">
            <template #body="slotProps">
              {{ formatStatus(slotProps.data.actived) }}
            </template>
          </Column>
          <Column header="Thao tác">
            <template #body="slotProps">
              <div class="flex gap-2">
                <Button text rounded icon="pi pi-eye" @click="viewDetail(slotProps.data.id)"></Button>
                <Button text rounded :icon="slotProps.data.actived ? 'pi pi-lock-open' : 'pi pi-lock'"
                  severity="warning" @click="lockUser(slotProps.data.id)"></Button>
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
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import Button from 'primevue/button';
import { sendGetApi, sendPostApi, } from '@/api/auth/api';


const rows = ref(5)
const page = ref(0)
const totalRecords = ref()
const toast = useToast()
const isLoading = ref(true)
const selectedStatus = ref("")
const createModal = ref(false)
const filterModal = ref(false)
const viewModal = ref(false)
const fullNameFilter = ref("")
const selectedRoleFilter = ref("")
const userId = ref("")
const username = ref("")
const password = ref("")
const passCheck = ref("")
const fullName = ref("")
const imageView = ref("")
const usernameView = ref("")
const passwordView = ref("")
const passCheckView = ref("")
const fullNameView = ref("")
const roleView = ref("")
const statusView = ref(false)
const selectedStatusFilter = ref("")
const userNameFilter = ref("")
const UsersFilter = ref([])
const statusOptFilter = ref([

  {
    name: "Tất cả",
    value: "",
  },
  {
    name: "Đã kích hoạt",
    value: true,
  },
  {
    name: "Đã khóa",
    value: false,
  },
])
const roleOptFilter = ref([
  {
    name: "Tất cả",
    value: ""
  },
  {
    name: "Quản trị viên",
    value: "ROLE_ADMIN"
  },
  {
    name: "Người dùng",
    value: "ROLE_USER"
  }
])

const showSuccess = (res) => {
  toast.add({ severity: 'success', summary: 'Success!', detail: res || 'Thao tác thành công', life: 3000 });
};
const showError = (e) => {
  toast.add({ severity: 'error', summary: 'Error!', detail: e || 'Có lỗi xảy ra!', life: 3000 });
};
const statusOpt = ref([
  {
    name: 'Mở tài khoản',
    value: true
  },
  {
    name: 'Khóa tài khoản',
    value: false
  }
])
const roleOpt = ref([
  {
    name: 'Quản trị viên',
    value: 'ROLE_ADMIN'
  },
  {
    name: 'Người dùng',
    value: 'ROLE_USER'
  }
])
const openDialog = () => {
  createModal.value = true
}
const openFilter = () => {
  filterModal.value = true
}
const Users = ref([])

onMounted(() => {
  fetchAllUser().then(() => {
    isLoading.value = false
  })
})
const onPageChange = (event) => {
  page.value = event.page
  rows.value = event.rows
  fetchAllUser()
}
const chooseStatusFilter = (data) => {
  selectedStatusFilter.value = data.value.value
}
const chooseRoleFilter = (data) => {
  selectedRoleFilter.value = data.value.value
}
const fetchAllUser = async () => {
  try {
    await sendGetApi(`/admin/get-all-user?page=${page.value}&size=${rows.value}&userName=${userNameFilter.value}`).then((res) => {
      Users.value = res.data.content
      totalRecords.value = res.data.totalElements
      filterModal.value = false
    })
  } catch (err) {
    showError(err)
  }
}
const fetchUserFilter = async () => {
  try {
    const res = await sendGetApi(`admin/filter?username=${userNameFilter.value}&fullName=${fullNameFilter.value}&actived=${selectedStatusFilter.value}&createdDate=${""}&role=${selectedRoleFilter.value}`).then((res) => {
      if (res.data.content.length > 0) {
        UsersFilter.value = res.data.content
      } else {
        UsersFilter.value = []
        showError("Không tìm thấy tài khoản liên quan!")
      }
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
        fetchAllUser()
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
  userId.value = id
  try {
    const res = await sendGetApi(`/all/find-user-by-id?id=${id}`).then((res) => {
      usernameView.value = res.data.username
      fullNameView.value = res.data.fullName
      statusView.value = res.data.actived
      roleView.value = res.data.role
      imageView.value = res.data.avatar
    })
  } catch (err) {
    console.log(err)
  }
}
const updateAccount = async () => {
  try {
    const res = await sendPostApi("/admin/create-update", {
      id: userId.value,
      username: usernameView.value,
      password: passwordView.value,
      fullName: fullNameView.value,
      actived: statusView.value,
      avatar: imageView.value,
      role: roleView.value,
    }).then((res) => {
      showSuccess()
      fetchAllUser()
      viewModal.value = false
    })
  } catch (err) {
    console.log(err)
  }
}
const lockUser = async (id) => {
  try {
    const res = await sendGetApi(`/admin/lock-user?id=${id}`).then((res) => {
      fetchAllUser()
      showSuccess(res.data)
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
