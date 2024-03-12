<template>
  <div class="flex justify-between pb-10">
    <h1 class="p-3 font-bold text-xl">Quản lý tài khoản người dùng</h1>
    <div>
      <ModalComp labelBtn="Tạo mới" :modalIdProps="'new-post-modal'" :size="'2xl'"
        :modalTitleClass="'font-bold text-lg'">

        <template #header>
          <h1 class="text-left">Đăng bài</h1>
        </template>

        <template #content>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Tiêu đề bài viết</span>
            </div>
            <input type="text" class="input input-bordered w-full" />
          </label>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Nội dung bài viết</span>
            </div>
            <textarea class="textarea textarea-bordered w-full"></textarea>
          </label>
        </template>

        <template #footer>
          <div class="flex justify-end gap-2">
            <button class="btn">Đăng bài</button>
          </div>
        </template>
      </ModalComp>
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
              Chi tiết
            </div>
          </div>
        </td>
      </tr>
    </TableComp>
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
  }
}
</script>
<style></style>