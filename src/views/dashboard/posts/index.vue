<template>
  <div v-if="state == 'default'">
    <div class="flex justify-between pb-10">
      <h1 class="p-3 font-bold text-xl">Quản lý bài viết</h1>
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
          <td class="w-4 py-4 px-3">{{ row.username }}</td>
          <td class="w-4 py-4 px-3">{{ row.email }}</td>
          <td class="w-4 py-4 px-3">
            <div class="flex">
              <div>
                <button @click="edit()">Sửa</button>
              </div>
            </div>
          </td>
        </tr>
      </TableComp>
    </div>
  </div>
  <div v-if="state == 'create'">
    <div class="flex justify-between pb-10">
      <h1 class="p-3 font-bold text-xl">Tạo tài bài viết</h1>
      <div>
        <Button :config="{ label: 'Trờ lại', click: () => back() }">Trở lại</Button>
      </div>
    </div>
    <div>
      Tạo tài khoản...
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
export default {
  components: {
    TableComp
  },
  data() {
    return {
      state: 'default',
      dataTable: {
        headers: ['ID', 'Tên người dùng', 'Email', 'Thao tác'],
        data: [
          {
            id: 1,
            username: 'Dang Nguyen',
            email: 'dang@gmail.com'
          },
          {
            id: 2,
            username: 'Tuan Nguyen',
            email: 'tuan@gmail.com'
          },
          {
            id: 3,
            username: 'Binh Nguyen',
            email: 'binh@gmail.com'
          },
          {
            id: 4,
            username: 'Dang Nguyen',
            email: 'dang@gmail.com'
          },
        ]
      }
    }
  },
  methods: {
    back() {
      this.state = 'default'
    },
    create() {
      this.state = 'create'
    },
    edit() {
      this.state = 'edit'
    }
  }
}
</script>
<style></style>