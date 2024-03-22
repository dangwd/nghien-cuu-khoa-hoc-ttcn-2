<template>
  <div v-if="state == 'default'">
    <div class="flex justify-between pb-10">
      <h1 class="p-3 font-bold text-xl">Quản lý tài khoản người dùng</h1>
      <div>
        <Button :config="{ label: 'Tạo', click: () => create() }">Tạo</Button>
      </div>
    </div>
    <div class="mx-auto">
      <TableComp :headers="dataTable.headers">
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-for="(row, index) in dataTable.data" :key="index">
          <th scope="col" class="py-4 px-3 w-4">
            {{ row.id }}
          </th>
          <td class="w-4 py-4 px-3">{{ row.fullName }}</td>
          <td class="w-4 py-4 px-3">{{ row.username }}</td>
          <td class="w-4 py-4 px-3">{{ formatRole(row.role) }}</td>
          <td class="w-4 py-4 px-3">{{ row.createdDate }}</td>
          <td class="w-4 py-4 px-3">
            <div class="flex">
              <div>
                <Button btnClass="bg-none text-blue-500 hover:underline"
                  :config="{ label: 'Sửa', click: () => edit(row) }">Sửa</Button>
              </div>
            </div>
          </td>
        </tr>
      </TableComp>
    </div>
  </div>
  <div v-if="state == 'create'">
    <div class="flex justify-between pb-10">
      <h1 class="p-3 font-bold text-xl">Tạo tài khoản người dùng</h1>
      <div>
        <Button :config="{ label: 'Trờ lại', click: () => back() }">Trở lại</Button>
      </div>
    </div>

    <div class=" p-6 mx-auto bg-white border max-w-2xl border-gray-200 rounded-xl shadow grid gap-8">
      <InputField @input-change="setName" :value="createParam.username" labelField="username" typeInput="text"
        title="Tên tài khoản"></InputField>
      <InputField @input-change="setPassword" :value="createParam.password" labelField="password" typeInput="password"
        title="Mật khẩu"></InputField>
      <InputField @input-change="setFullName" :value="createParam.fullName" labelField="fullName" typeInput="text"
        title="Tên người dùng"></InputField>
      <Button :config="{ label: 'Tạo tài khoản', click: () => createAccount() }">Trở lại</Button>

    </div>

  </div>
  <div v-if="state == 'edit'">
    <div class="flex justify-between pb-10">
      <h1 class="p-3 font-bold text-xl">Chỉnh sửa User</h1>
      <div>
        <Button :config="{ label: 'Trờ lại', click: () => back() }">Trở lại</Button>
      </div>
    </div>
    <div>
      Chỉnh sửa tài khoản
    </div>
  </div>
</template>
<script>
import TableComp from '@/components/Table/TableComp.vue'
import { getAllUser, signup } from '@/api/auth/api'

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
  components: {
    TableComp
  },
  mounted() {
    this.fetchAllUser()
  },
  data() {
    return {
      state: 'default',
      createParam: {
        username: "",
        password: "",
        fullName: "",
      },
      dataTable: {
        headers: ['ID', 'Tên người dùng', 'Tài khoản', 'Vai trò', 'Ngày tạo', 'Thao tác'],
        data: [],
        param: {
          username: "",
          email: ""
        }
      }
    }
  },
  methods: {
    setName(value) {
      this.createParam.username = value
    },
    setPassword(value) {
      this.createParam.password = value
    },
    setFullName(value) {
      this.createParam.fullName = value
    },
    showSuccess() {
      toast.success("Tạo tài khoản thành công!");
    },
    showError() {
      toast.error("Có lỗi xảy ra, vui lòng kiểm tra lại!");
    },
    back() {
      this.state = 'default'
    },
    create() {
      this.state = 'create'
    },
    edit(user) {
      this.state = 'edit'
      this.dataTable.param.name = user.name
      this.dataTable.param.email = user.email
      console.log(user)
    },
    async fetchAllUser() {
      try {
        const res = await getAllUser();
        this.dataTable.data = res.data.content
      } catch (err) {
        console.log(err)
      }
    },
    async createAccount() {
      if (this.createParam.username !== "" && this.createParam.password !== "" && this.createParam.fullName !== "") {
        try {
          const res = await signup(
            this.createParam.username,
            this.createParam.password.password,
            this.createParam.fullName
          )
          console.log(res)


        } catch (err) {
          console.log(err)
        }
      } else {
        this.showError()
      }

    },
    formatRole(role) {
      switch (role) {
        case 'ROLE_ADMIN':
          return 'Quản trị viên'
        case 'ROLE_USER':
          return 'Người dùng'
      }
    }
  }
}
</script>
<style></style>