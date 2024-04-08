<template>
  <div v-if="isLoading">
    <div class="flex items-center justify-center h-screen">
      <div class="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
    </div>
  </div>
  <div v-else>
    <div v-if="state == 'default'">
      <div class="flex justify-between pb-10">
        <h1 class="p-3 font-bold text-xl">Quản lý bài viết</h1>
        <!-- <h1>Tổng số bài viết: {{ dataTable.data.length }}</h1> -->
        <div>
          <Button btnIcon="icon" iconBtnClass="bx bxs-edit-alt"
            :config="{ label: 'Viết bài', click: () => create() }"></Button>
        </div>
      </div>

      <div class="mx-auto">
        <div class="pt-5 pb-2 flex justify-end">
          <Pagination :currentPage="paginationData.currentPage" :totalPages="paginationData.totalPages"
            @update:currentPage="getAllPost($event)"></Pagination>
        </div>
        <TableComp :headers="dataTable.headers">
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            v-for="(row, index) in dataTable.data" :key="index">
            <th scope="col" class="py-2 px-3 w-4">
              {{ row.id }}
            </th>
            <td class="w-4 py-2 px-3">{{ index + 1 }}</td>
            <td class="w-4 py-2 px-3">{{ shortenText(row.title, maxLength) }}</td>
            <td class="w-4 py-2 px-3">
              <img class="w-24 rounded-lg" :src="row.image" alt="">
            </td>
            <td class="w-4 py-2 px-3">{{ shortenText(row.description, maxLength) }}</td>
            <td class="w-4 py-2 px-3">{{ row.user.fullName }}</td>
            <td :class="statusClass(row.actived)">{{ formatStatus(row.actived) }}</td>
            <td class="w-4 py-4 px-3">{{ row.createdDate }}</td>
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
        <h1 class="p-3 font-bold text-xl">Tạo bài viết</h1>
        <div>
          <Button :config="{ label: 'Trờ lại', click: () => back() }">Trở lại</Button>
        </div>
      </div>
      <div class=" p-6 mx-auto bg-white border max-w-2xl border-gray-200 rounded-xl shadow grid gap-8">
        <InputField @input-change="setTitle" labelField="title" typeInput="text" title="Tiêu đề bài viết"></InputField>
        <InputField @input-change="setDescription" labelField="description" typeInput="text" title="Mô tả"></InputField>
        <InputField @input-change="setContent" labelField="content" typeInput="text" title="Nội dung bài viết">
        </InputField>
        <InputField @input-change="setImage" labelField="image" typeInput="text" title="Ảnh">
        </InputField>
        <InputField @select-change="setCategory" :options="dataTable.options" type="select" labelField="category"
          title="Danh mục bài viết">
        </InputField>
        <Button btnIcon="icon" iconBtnClass="bx bx-check"
          :config="{ label: 'Đăng bài', click: () => createPost() }"></Button>
      </div>
      <div>

      </div>
    </div>
    <div v-if="state == 'edit'">
      <div class="flex justify-between pb-10">
        <h1 class="p-3 font-bold text-xl">Chỉnh sửa bài viết</h1>
        <div>
          <Button :config="{ label: 'Trờ lại', click: () => back() }"></Button>
        </div>
      </div>
      <div v-show="this.dataTable.postParam.actived == false">
        <Button :config="{ label: 'Duyệt bài', click: () => activedPost() }"></Button>
      </div>
    </div>
  </div>
</template>
<script>
import TableComp from '@/components/Table/TableComp.vue'
import { getAllPost, createPost, activePost } from '@/api/auth/api'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
  components: {
    TableComp
  },
  data() {
    return {
      state: 'default',
      paginationData: {
        currentPage: 1,
        totalPages: 0,
      },
      maxLength: 25,
      isLoading: true,
      dataTable: {
        headers: ['ID', 'STT', 'Tiêu đề bài viết', 'Ảnh', 'Mô tả', 'Người đăng bài', 'Trạng thái', 'Ngày tạo', 'Thao tác'],
        data: [],
        options: [
          { text: 'DOCUMENT', value: 8 },
          { text: 'BLOG', value: 9 },
        ],
        statusOption: [
          { text: 'Duyệt bài', value: true },
          { text: 'Không duyệt bài', value: false },
        ],
        postParam: {
          id: "",
          title: "",
          description: "",
          image: "",
          content: "",
          actived: false,
          linkFiles: [],
          listCategoryId: [],
        }
      }
    }
  },
  computed: {
    shortenText() {
      return (description, maxLength) => {
        if (description.length <= maxLength) {
          return description;
        } else {
          return description.slice(0, maxLength) + "...";
        }
      };
    }
  },
  mounted() {
    this.getAllPost(this.paginationData.currentPage).then(() => {
      setTimeout(() => {
        this.isLoading = false
      }, 700)
    })
  },
  methods: {
    setTitle(value) {
      this.dataTable.postParam.title = value
    },
    setDescription(value) {
      this.dataTable.postParam.description = value
    },
    setImage(value) {
      this.dataTable.postParam.image = value
    },
    setContent(value) {
      this.dataTable.postParam.content = value
    },
    setCategory(value) {
      this.dataTable.postParam.listCategoryId = [value]
    },
    showError() {
      toast.showError('Có lỗi xảy ra vui lòng kiểm tra lại!')
    },
    showSuccess() {
      toast.success("Thao tác thành công!");
    },
    async getAllPost(page) {
      try {
        const res = await getAllPost(page);
        this.paginationData.totalPages = res.data.totalPages
        this.dataTable.data = res.data.content
      } catch (err) {
        console.log(err)
      }
    },
    async createPost() {
      if (this.dataTable.postParam.title !== "" && this.dataTable.postParam.content !== "") {
        try {
          await createPost(
            this.dataTable.postParam.title,
            this.dataTable.postParam.description,
            this.dataTable.postParam.image,
            this.dataTable.postParam.content,
            this.dataTable.postParam.linkFiles,
            this.dataTable.postParam.listCategoryId
          ).then(() => {
            this.showSuccess();
            this.getAllPost();
            setTimeout(() => {
              this.state = 'default'
            }, 1500)
          })
        } catch (err) {
          console.log(err)
        }
      } else {
        this.showError()
      }
    },
    async activedPost() {
      try {
        await activePost(this.dataTable.postParam.id).then(() => {
          this.showSuccess()
          this.getAllPost()
          this.state = 'default'
        })
      } catch (err) {
        console.log(err)
      }
    },
    back() {
      this.state = 'default'
    },
    create() {
      this.state = 'create'
    },
    edit(row) {
      this.state = 'edit'
      this.dataTable.postParam.id = row.id
      this.dataTable.postParam.actived = row.actived
    },
    statusClass(value) {
      switch (value) {
        case true:
          return 'w-4 py-4 px-3 text-green-500'
        case false:
          return 'w-4 py-4 px-3 text-red-500'
      }
    },
    formatStatus(value) {
      switch (value) {
        case true:
          return "Đã duyệt";
        case false:
          return "Chờ duyệt";
      }

    }
  }
}
</script>
<style></style>