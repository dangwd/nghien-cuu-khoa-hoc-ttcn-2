<template>
  <div v-if="state == 'default'">
    <div class="flex justify-between pb-10">
      <h1 class="p-3 font-bold text-xl">Quản lý danh mục bài viết</h1>
      <div>
        <Button :config="{ label: 'Tạo', click: () => create() }">Tạo</Button>
      </div>
    </div>
    <div class="mx-auto">
      <TableComp :headers="dataTable.headers">
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-for="(row, index) in dataTable.data" :key="index">
          <th scope="col" class="py-4 px-3 w-4">
            {{ index + 1 }}
          </th>
          <td class="w-4 py-4 px-3">{{ row.id }}</td>
          <td class="w-4 py-4 px-3">{{ row.name }}</td>
          <td class="w-4 py-4 px-3">{{ row.categoryType }}</td>
          <td class="w-4 py-4 px-3">
            <div class="flex">
              <div>
                <Button btnIcon="icon" btnClass="bg-none text-blue-500 hover:underline"
                  :config="{ label: 'Cấu hình', click: () => edit(row) }"></Button>
              </div>
            </div>
          </td>
        </tr>
      </TableComp>
    </div>
  </div>
  <div v-if="state == 'create'">
    <div class="flex justify-between pb-10">
      <h1 class="p-3 font-bold text-xl">Tạo danh mục bài viết</h1>
      <div>
        <Button :config="{ label: 'Trờ lại', click: () => back() }">Trở lại</Button>
      </div>
    </div>

    <div class=" p-6 mx-auto bg-white border max-w-2xl border-gray-200 rounded-xl shadow grid gap-8">
      <InputField @input-change="setName" :value="createParam.name" labelField="name" typeInput="text"
        title="Tên danh mục"></InputField>
      <InputField @input-change="setCategoryType" :value="createParam.categoryType" labelField="categoryType"
        typeInput="text" title="Kiểu danh mục"></InputField>
      <Button :config="{ label: 'Tạo danh mục', click: () => createCategory() }"></Button>
    </div>

  </div>
  <div v-if="state == 'edit'">
    <div class="flex justify-between pb-10">
      <h1 class="p-3 font-bold text-xl">Cấu hình danh mục</h1>
      <div>
        <Button :config="{ label: 'Trờ lại', click: () => back() }"></Button>
      </div>
    </div>
    <div class=" p-6 mx-auto bg-white border max-w-2xl border-gray-200 rounded-xl shadow grid gap-8">
      <InputField @input-change="setNameEdit" :value="dataTable.param.name" labelField="name" typeInput="text"
        title="Tên danh mục"></InputField>
      <InputField @input-change="setCategoryTypeEdit" :value="dataTable.param.categoryType" labelField="categoryType"
        typeInput="text" title="Kiểu danh mục"></InputField>
      <div class="flex items-center gap-2">
        <Button :config="{ label: 'Sửa', click: () => editCategory(dataTable.param.id) }"></Button>
        <ModalComp labelBtn="Xóa" :modalIdProps="'deleteCategory'"
          customClass="px-4 py-2 text-sm bg-red-700 text-white rounded-lg" :size="'xl'"
          :modalTitleClass="'font-bold text-sm'">
          <template #header>
            <h1 class=" text-left text-lg font-bold">Bạn muốn xóa danh mục này ?</h1>
          </template>
          <template #content>
            <h1 class="text-red-700 text-center text-lg font-bold">Sau khi xóa sẽ không thể phục hồi!</h1>
          </template>
          <template #footer>
            <div class="flex justify-end gap-2">
              <button class="btn">Xóa</button>
            </div>
          </template>
        </ModalComp>
      </div>
    </div>
  </div>
</template>
<script>
import TableComp from '@/components/Table/TableComp.vue'
import { getAllCategory, createCategory, editCategory } from '@/api/auth/api'

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  components: {
    TableComp
  },
  mounted() {
    this.fetchAllCategory()
  },
  data() {
    return {
      state: 'default',
      createParam: {
        name: "",
        image: "",
        categoryType: "",
      },
      dataTable: {
        headers: ['STT', 'ID', 'Tên danh mục', 'Kiểu danh mục', 'Thao tác'],
        data: [],
        param: {
          id: "",
          name: "",
          image: "",
          categoryType: ""
        }
      }
    }
  },
  methods: {
    setName(value) {
      this.createParam.name = value
    },
    setCategoryType(value) {
      this.createParam.categoryType = value
    },
    setNameEdit(value) {
      this.dataTable.param.name = value
    },
    setCategoryTypeEdit(value) {
      this.dataTable.param.categoryType = value
    },
    showSuccess() {
      toast.success("Thao tác thành công!");
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
    edit(category) {
      this.state = 'edit'
      this.dataTable.param.id = category.id,
        this.dataTable.param.name = category.name,
        this.dataTable.param.image = category.image,
        this.dataTable.param.categoryType = category.categoryType,
        console.log(category)
    },
    async fetchAllCategory() {
      try {
        const res = await getAllCategory();
        this.dataTable.data = res.data
      } catch (err) {
        console.log(err)
      }
    },
    async createCategory() {
      if (this.createParam.name !== "" && this.createParam.categoryType !== "") {
        try {
          await createCategory(
            this.createParam.name, this.createParam.image, this.createParam.categoryType
          ).then(() => {
            this.showSuccess(),
              this.fetchAllCategory(),
              this.state = 'default';
          }
          )

        } catch (err) {
          console.log(err)
        }
      } else {
        this.showError()
      }
    },
    async editCategory(categoryId) {
      if (this.dataTable.param.name !== "" && this.dataTable.param.categoryType !== "") {
        try {
          await editCategory(
            categoryId,
            this.dataTable.param.name,
            this.dataTable.param.image,
            this.dataTable.param.categoryType
          ).then(() => {
            this.showSuccess(),
              this.fetchAllCategory(),
              this.state = 'default';
          }
          )

        } catch (err) {
          console.log(err)
        }
      } else {
        this.showError()
      }
    }

  }
}
</script>
<style></style>