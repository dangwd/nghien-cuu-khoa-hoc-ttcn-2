<template>
  <div v-if="isLoading">
    <div class="flex items-center justify-center h-screen">
      <div class="rounded-md h-12 w-12 border-4 border-t-4 border-green-500 animate-spin absolute"></div>
    </div>
  </div>
  <div v-else>
    <div v-if="state == 'default'">
      <div class="flex justify-between pb-10">
        <h1 class="p-3 font-bold text-xl">Thông báo</h1>
        <div>
          <Button :config="{ label: 'Tạo', click: () => create() }">Tạo</Button>
        </div>
      </div>
      <div class="mx-auto">
        <div class="pt-5 pb-2 flex justify-end">
          <Pagination :currentPage="paginationData.currentPage" :totalPages="paginationData.totalPages"
            @update:currentPage="fetchAllUser($event)"></Pagination>
        </div>
        <TableComp :headers="dataTable.headers">
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            v-for="(row, index) in dataTable.data" :key="index">
            <th scope="col" class="py-4 px-3 w-4">
              {{ row.id }}
            </th>
            <td>{{ shortenText(row.title, 25) }}</td>
            <td>{{ shortenText(row.content, 25) }}</td>
            <td class="w-3 py-2 px-3">
              <img class="w-10" :src="row.image" alt="">
            </td>
            <td class="w-3 py-2 px-3">{{ row.createdDate }}</td>
            <td class="w-3 py-2 px-3">
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
        <h1 class="p-3 font-bold text-xl">Viết thông báo</h1>
        <div>
          <Button :config="{ label: 'Trờ lại', click: () => back() }">Trở lại</Button>
        </div>
      </div>
      <div class=" p-6 mx-auto bg-white border max-w-2xl border-gray-200 rounded-xl shadow grid gap-8">
        <InputField @input-change="setTitle" :value="createParam.username" labelField="title" typeInput="text"
          title="Tiêu đề"></InputField>
        <InputField @input-file="setImage" :value="createParam.image" type="file-input" title="Ảnh">
        </InputField>
        <InputField styleClass="py-2" @input-change="setContent" :value="createParam.content" type="ckeditor">
        </InputField>

        <Button :config="{ label: 'Tạo', click: () => createNoti() }">Trở lại</Button>

      </div>
    </div>
    <div v-if="state == 'edit'">
      <div class="flex justify-between pb-10">
        <h1 class="p-3 font-bold text-xl">Cấu hình thông báo</h1>
        <div>
          <Button :config="{ label: 'Trờ lại', click: () => back() }">Trở lại</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TableComp from '@/components/Table/TableComp.vue'
import { createNoti, getAllNotification, signup } from '@/api/auth/api'
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
  components: {
    TableComp
  },
  mounted() {
    this.fetchAllNoti()
      .then(() => {
        setTimeout(() => {
          this.isLoading = false;
        }, 700)
      })
  },
  data() {
    return {
      isLoading: true,
      state: 'default',
      paginationData: {
        currentPage: 1,
        totalPages: 0
      },
      createParam: {
        title: "",
        content: "",
        image: ""
      },
      dataTable: {
        headers: ['ID', 'Tiêu đề bài viết', 'Nội dung', 'Ảnh', 'Ngày tạo', 'Thao tác'],
        data: [],
        param: {
          id: "",
          username: "",
          password: "",
          fullName: "",
          actived: true,
          avatar: "",
          role: ""
        }
      }
    }
  },
  methods: {
    setTitle(value) {
      this.createParam.title = value
    },
    setContent(value) {
      this.createParam.content = value
    },
    setImage(file) {
      this.createParam.image = file
      var storageRef = firebase.storage().ref('image/' + file.name)
      let uploadTask = storageRef.put(file)
      uploadTask.on('stage_changed', (snapshot) => {
        console.log(snapshot)
      }, (error) => {
        console.log(error)
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.createParam.image = downloadURL
          console.log(downloadURL)
        })
      })
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
    edit(noti) {
      this.state = 'edit'
      console.log(noti)
    },
    async fetchAllNoti(page) {
      try {
        await getAllNotification(page).then((res) => {
          this.dataTable.data = res.data.content
          this.paginationData.totalPages = res.data.totalPages
        })
      } catch (err) {
        console.log(err)
      }
    },
    async createNoti() {
      try {
        await createNoti(
          this.createParam.title, this.createParam.content, this.createParam.image
        ).then((res) => {
          console.log(res)
          this.fetchAllNoti()
          this.state = 'default'
          this.showSuccess()
        })
      } catch (err) {
        console.log(err)
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
  }
}
</script>
<style></style>