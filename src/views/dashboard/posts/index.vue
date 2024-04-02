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
          <td class="w-4 py-4 px-3">{{ row.title }}</td>

          <td class="w-4 py-4 px-3">
            <img class="w-24" :src="row.image" alt="">
          </td>
          <td class="w-4 py-4 px-3">{{ row.description }}</td>
          <td class="w-4 py-4 px-3">{{ row.createBy }}</td>
          <td class="w-4 py-4 px-3">{{ row.createDate }}</td>

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
        <Button :config="{ label: 'Trờ lại', click: () => back() }"></Button>
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
        headers: ['ID', 'Tiêu đề bài viết', 'Ảnh', 'Mô tả', 'Người đăng bài', 'Ngày tạo', 'Thao tác'],
        data: [
          {
            id: 1,
            title: 'Bài viết 1',
            image: 'https://mevn-public.s3-ap-southeast-1.amazonaws.com/marketenterprise.vn/wp-images/2021/04/06170614/vuejs.png',
            description: 'Mô tả bài viết 1',
            createBy: 'Đăng',
            createDate: "2/4"
          },
          {
            id: 2,
            title: 'Bài viết 1',
            image: 'https://mevn-public.s3-ap-southeast-1.amazonaws.com/marketenterprise.vn/wp-images/2021/04/06170614/vuejs.png',
            description: 'Mô tả bài viết 1',
            createBy: 'Đăng',
            createDate: "2/4"
          },
          {
            id: 3,
            title: 'Bài viết 1',
            image: 'https://teky.edu.vn/blog/wp-content/uploads/2021/07/ban-co-biet-angular-la-gi-khong.jpg',
            description: 'Mô tả bài viết 1',
            createBy: 'Đăng',
            createDate: "2/4"
          },
          {
            id: 4,
            title: 'Bài viết 1',
            image: 'https://thuanbui.me/wp-content/uploads/2021/08/react-js.png',
            description: 'Mô tả bài viết 1',
            createBy: 'Đăng',
            createDate: "2/4"
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