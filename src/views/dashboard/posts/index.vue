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
        <div>
          <Button btnIcon="icon" iconBtnClass="bx bxs-edit-alt"
            :config="{ label: 'Viết bài', click: () => create() }"></Button>
        </div>
      </div>
      <div class="mx-auto">
        <div class="pt-5 pb-2 flex justify-between items-center">
          <Button btnIcon="icon" iconBtnClass="bx bx-time"
            :config="{ label: 'Bài viết đang chờ duyệt', click: () => waitChecked() }"></Button>
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
    <div v-if="state == 'wait'">
      <div class="flex justify-between pb-10">
        <h1 class="p-3 font-bold text-xl">Danh sách bài viết đang chờ duyệt</h1>
      </div>
      <div class="pt-5 pb-2 flex justify-between items-center">
        <Button btnIcon="icon" iconBtnClass="bx bx-list-ul"
          :config="{ label: 'Danh sách bài viết', click: () => back() }"></Button>
        <Pagination :currentPage="paginationData.currentPage" :totalPages="paginationData.totalPages"
          @update:currentPage="getAllPostUnactive($event)"></Pagination>
      </div>
      <TableComp :headers="dataTable.headers">
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-for="(row, index) in dataTable.listPostUnactive" :key="index">
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
    <div v-if="state == 'create'">
      <div class="flex justify-between pb-10">
        <h1 class="p-3 font-bold text-xl">Tạo bài viết</h1>
        <div>
          <Button :config="{ label: 'Trờ lại', click: () => back() }">Trở lại</Button>
        </div>
      </div>
      <div class=" p-6 mx-auto bg-white border max-w-3xl border-gray-200 rounded-xl shadow grid gap-8">
        <InputField @input-change="setTitle" :value="dataTable.postParam.title" labelField="title"
          title="Tiêu đề bài viết">
        </InputField>
        <InputField @input-change="setDescription" :value="dataTable.postParam.description" labelField="description"
          title="Mô tả bài viết"></InputField>
        <InputField @select-change="setCategory" :options="dataTable.options" type="select" labelField="category"
          title="Danh mục bài viết">
        </InputField>
        <InputField styleClass="py-2" @input-change="setContent" :value="dataTable.postParam.content" type="ckeditor">
        </InputField>
        <InputField @input-file="setImage" :value="dataTable.postParam.image" type="file-input" title="Ảnh">
        </InputField>

        <Button btnIcon="icon" iconBtnClass="bx bx-check"
          :config="{ label: 'Đăng bài', click: () => createPost() }"></Button>
      </div>
      <div>

      </div>
    </div>
    <div v-if="state == 'edit'">
      <div class="flex justify-between pb-10">
        <h1 class="p-3 font-bold text-xl">Thông tin bài viết</h1>
        <div>
          <Button :config="{ label: 'Trờ lại', click: () => back() }"></Button>
        </div>
      </div>
      <div class="flex gap-2">
        <div v-show="this.dataTable.postParam.actived == false">
          <Button :config="{ label: 'Duyệt bài', click: () => activedPost() }"></Button>
        </div>
        <Button btnClass="bg-red-600 text-white"
          :config="{ label: 'Xóa bài viết', click: () => deletedPost() }"></Button>
      </div>
      <div>
        <div class="py-5 max-w-3xl mx-auto">
          <div class="bg-white mt-3">
            <img class="border rounded-t-xl shadow-xl w-full" :src="this.viewParam.image">
            <div class="bg-white shadow p-5 text-xl text-gray-700 font-semibold rounded-b-xl">
              <div class="flex items-center gap-4" v-if="this.viewParam && this.viewParam.user">
                <img class="w-10 h-10 rounded-full" :src="this.viewParam.user.avatar" alt="">
                <div class="font-medium dark:text-white">
                  <div class="font-semibold">{{ this.viewParam.user.fullName }} <span
                      v-show="this.viewParam.user.role === 'ROLE_ADMIN'"><i
                        class='bx bxs-check-shield text-blue-500'></i></span>
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400 underline">Ngày đăng: {{
                    this.viewParam.createdDate
                  }}
                    <i class='bx bx-check text-green-500 text-lg'></i>
                  </div>

                </div>
              </div>
              <div class="py-5">
                <h1 class="mb-4 text-3xl font-extrabold text-gray-700 dark:text-white md:text-5xl lg:text-6xl"><span
                    class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                    {{ this.viewParam.title }}</span></h1>
              </div>
              <div v-html="this.viewParam.content" class="py-5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TableComp from '@/components/Table/TableComp.vue'
import { getAllPost, createPost, activePost, getPostUnactive, deletePostById } from '@/api/auth/api'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
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
      viewParam: {
        id: "",
        title: "",
        description: "",
        image: null,
        user: {},
        content: "",
        createdDate: "",
        actived: false,
        linkFiles: [],
        listCategoryId: [],
      },
      maxLength: 25,
      isLoading: true,
      dataTable: {
        headers: ['ID', 'STT', 'Tiêu đề bài viết', 'Ảnh', 'Mô tả', 'Người đăng bài', 'Trạng thái', 'Ngày tạo', 'Thao tác'],
        data: [],
        listPostUnactive: [],
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
          image: null,
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
    setImage(file) {
      this.dataTable.postParam.image = file
      var storageRef = firebase.storage().ref('image/' + file.name)
      let uploadTask = storageRef.put(file)
      uploadTask.on('stage_changed', (snapshot) => {
        console.log(snapshot)
      }, (error) => {
        console.log(error)
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.dataTable.postParam.image = downloadURL
          console.log(downloadURL)
        })
      })
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
    async getAllPostUnactive(page) {
      try {
        const res = await getPostUnactive(page);
        this.dataTable.listPostUnactive = res.data.content
        console.log(res)
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
            this.dataTable.postParam.title = "",
              this.dataTable.postParam.description = "",
              this.dataTable.postParam.image = "",
              this.dataTable.postParam.content = "",
              this.dataTable.postParam.linkFiles = "",
              this.dataTable.postParam.listCategoryId = ""
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
        await activePost(this.viewParam.id).then(() => {
          this.showSuccess()
          this.getAllPost()
          this.state = 'default'
        })
      } catch (err) {
        console.log(err)
      }
    },
    async deletedPost() {
      try {
        await deletePostById(this.viewParam.id).then(() => {
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
    waitChecked() {
      this.state = 'wait'
      this.getAllPostUnactive()
    },
    edit(row) {
      this.state = 'edit'
      this.viewParam.id = row.id
      this.viewParam.image = row.image
      this.viewParam.title = row.title
      this.viewParam.description = row.description
      this.viewParam.content = row.content
      this.viewParam.user = row.user
      this.viewParam.createdDate = row.createdDate
      this.dataTable.postParam.actived = row.actived
      console.log(row)
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

    },
    formatDate(date) {
      if (date) {
        return moment(String(date)).format('dd/MM/yyyy')
      }
    }
  }
}
</script>
<style></style>