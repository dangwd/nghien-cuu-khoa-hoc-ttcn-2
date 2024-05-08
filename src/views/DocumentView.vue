<template>
  <div v-if="isLoading">
    <div class="flex items-center justify-center h-screen">
      <div class="rounded-md h-12 w-12 border-4 border-t-4 border-green-500 animate-spin absolute"></div>
    </div>
  </div>
  <div v-else class="max-w-3xl mx-auto">
    <AsideView></AsideView>
    <div v-if="state == 'default'">
      <div class="bg-white w-full shadow rounded-xl p-5">
        <div class="flex gap-2">
          <img class="w-10 h-10 rounded-full" :src="user.avatar" alt="">
          <input type="text" :placeholder="'Bạn muốn đăng tài liệu không ' + user.fullName + ' ?'"
            class="w-full p-2 text-gray-700 border border-gray-200 rounded-full bg-gray-50 text-sm italic" disabled>
        </div>
        <div class="flex justify-end pt-3">
          <ModalComp labelBtn="Đăng bài" modalIdProps="createPost" size="4xl"
            customClass="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">

          </ModalComp>
        </div>
      </div>
      <div class="mt-2 bg-white rounded-xl border">
        <div class="p-2">
          <div class="grid grid-cols-2 gap-2 px-4 pt-4 pb-3">
            <InputField @select-change="chooseDpt" type="select" title="Khoa" :options="departmentOpt"></InputField>
            <InputField @select-change="chooseMajor" type="select" title="Ngành" :options="majorOpt">
            </InputField>
          </div>
          <div class="flex justify-end">
            <Button btnClass="bg-green-600 hover:bg-green-700 text-white mx-3 text-sm font-semibold mb-2"
              :config="{ label: 'Xác nhận', click: () => fetchAllSubject() }"></Button>
          </div>
        </div>
      </div>
      <div v-if="subjectsList.length > 0">
        <div class="pt-4 flex justify-between items-center">
          <h1 class="text-base font-semibold text-gray-700">Danh sách Bộ môn</h1>
          <div class="flex gap-2 items-center">
            <InputField @input-change="setSearch" placeholder="Tìm kiếm..."></InputField>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="flex justify-center items-center">
          <span>
            <div class="px-12"><i class='bx bxs-inbox text-9xl text-gray-700'></i></div>
          </span>
        </div>
      </div>
      <div v-for="(sbj, index) in subjectsList" :key="index">
        <div
          class="flex max-w-full my-4 items-center bg-white border border-gray-200 rounded-2xl shadow hover:bg-gray-100"
          @click="detailsView(sbj.id)">
          <img class="object-cover w-full rounded-2xl h-96 md:h-auto md:w-48"
            src="https://media.istockphoto.com/id/1359932120/vector/contract-document-icon-in-flat-style-report-with-folder-vector-illustration-on-isolated.jpg?s=612x612&w=0&k=20&c=eJUJzNLAWNHutYtNiX1x0ORNXMpOriOMH0S4aX0vUm0="
            alt="">
          <div class="flex flex-col justify-between px-4 leading-normal">
            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-700">{{ sbj.nameSubject }}</h5>
            <p class="mb-3 font-normal text-gray-700 italic text-sm">Chọn để xem chi tiết tài liệu!~</p>
          </div>
        </div>
      </div>

    </div>
    <div v-if="state == 'details'">
      <div class="py-4 flex justify-between items-center">
        <h1 class="text-base text-gray-700 font-semibold uppercase">Bộ môn thiết kế web</h1>
        <button @click="back()" id="scroll-button"
          class="w-10 h-10 text-white transition ease-in-out hover:scale-105 duration-150 bg-green-600 hover:bg-green-700 rounded-full">
          <i class='bx bx-chevron-left text-2xl font-semibold '></i>
        </button>
      </div>
      <div class="p-2 flex items-center justify-between">
        <h1 class="text-base text-gray-700 font-semibold">Danh sách tài liệu</h1>
        <InputField placeholder="Tìm kiếm"></InputField>
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div v-for="(doc, index) in docList" :key="index"
          class="card w-60 bg-base-100 shadow-xl hover:bg-gray-100 transition duration-150 ease-in-out hover:scale-105">
          <figure class="px-5 pt-5">
            <img src="../../src/assets/img/document.jpg" class="rounded-xl" />
          </figure>
          <div class="card-body items-center text-center px-2">
            <h2 class="card-title text-base">{{ doc.title }}</h2>
            <div class="pt-2">
              <p class="text-sm">Ngày đăng: {{ doc.date }}</p>
              <p class="text-sm italic">Tác giả: {{ doc.author }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AsideRight />
  </div>
</template>
<script>
import { getAllDpt, getAllMajor, getAllSubject, getDocById } from '@/api/auth/api';
import AsideView from '@/components/AsideView.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
  components: {
    AsideView,
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  data() {
    return {
      isLoading: true,
      state: "default",
      editor: ClassicEditor,
      searchQuery: "",
      dptSelected: "",
      sbjSelected: "",
      mjSelected: "",
      subjectsList: [],
      docList: [
        {
          title: "Slide bài giảng ASP.NET ngày 8/5",
          date: "8/5/2024",
          author: "Nguyễn Minh Đăng"
        },
        {
          title: "Slide bài giảng ASP.NET ngày 8/5",
          date: "8/5/2024",
          author: "Nguyễn Minh Đăng"
        },
        {
          title: "Slide bài giảng ASP.NET ngày 8/5",
          date: "8/5/2024",
          author: "Nguyễn Minh Đăng"
        },
        {
          title: "Slide bài giảng ASP.NET ngày 8/5",
          date: "8/5/2024",
          author: "Nguyễn Minh Đăng"
        },
        {
          title: "Slide bài giảng ASP.NET ngày 8/5",
          date: "8/5/2024",
          author: "Nguyễn Minh Đăng"
        },
        {
          title: "Slide bài giảng ASP.NET ngày 8/5",
          date: "8/5/2024",
          author: "Nguyễn Minh Đăng"
        },
        {
          title: "Slide bài giảng ASP.NET ngày 8/5",
          date: "8/5/2024",
          author: "Nguyễn Minh Đăng"
        },
        {
          title: "Slide bài giảng ASP.NET ngày 8/5",
          date: "8/5/2024",
          author: "Nguyễn Minh Đăng"
        },
        {
          title: "Slide bài giảng ASP.NET ngày 8/5",
          date: "8/5/2024",
          author: "Nguyễn Minh Đăng"
        },
      ],
      departmentOpt: [],
      majorOpt: [],
      subjectOpt: []
    }
  },
  mounted() {
    this.fetchAllDpt().then(() => {
      setTimeout(() => {
        this.isLoading = false
      }, 700)
    })
  },
  methods: {
    chooseDpt(value) {
      this.dptSelected = value
      this.fetchAllMajor(value)
    },
    chooseMajor(value) {
      this.mjSelected = value
    },
    chooseSubject(value) {
      this.sbjSelected = value
    },
    setSearch(value) {
      this.searchQuery = value
    },
    showError() {
      toast.error("Có lỗi xảy ra!")
    },
    async fetchAllDpt() {
      try {
        await getAllDpt().then((res) => {
          const data = res.data
          data.forEach(item => {
            item.text = item.nameDepartment
            item.value = item.id
          })
          this.departmentOpt = data

        })
      } catch (err) {
        console.log(err)
      }
    },
    async fetchAllMajor(idDpt) {
      try {
        await getAllMajor(idDpt).then((res) => {
          const data = res.data
          data.forEach(item => {
            item.text = item.nameSpecialize
            item.value = item.id
          })
          this.majorOpt = data
        })
      } catch (err) {
        console.log(err)
      }
    },
    async fetchAllSubject() {
      try {
        if (this.dptSelected != "" && this.mjSelected != "") {
          await getAllSubject(this.dptSelected, this.mjSelected).then((res) => {
            this.subjectsList = res.data.content

          })
        } else {
          this.showError()
        }
      } catch (err) {
        console.log(err)
      }
    },
    async detailsView(sbjId) {
      try {
        await getDocById(sbjId).then((res) => {
          // this.docList = res
        })
      } catch (err) {
        console.log(err)
      }
      this.state = 'details'

    },
    back() {
      this.state = 'default'
    }
  }
}
</script>
<style></style>