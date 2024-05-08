<template>
  <div v-if="isLoading">
    <div class="flex items-center justify-center h-screen">
      <div class="rounded-md h-12 w-12 border-4 border-t-4 border-green-500 animate-spin absolute"></div>
    </div>
  </div>
  <div v-else class="max-w-3xl mx-auto">
    <AsideView></AsideView>
    <div v-if="state == 'default'">
      <div class="grid grid-cols-2 gap-2">
        <InputField @select-change="chooseDpt" type="select" title="Khoa" :options="departmentOpt"></InputField>
        <InputField @select-change="chooseMajor" type="select" title="Ngành" :options="majorOpt">
        </InputField>
      </div>
      <div class="pt-4">
        <Button btnClass="bg-green-600 hover:bg-green-700 text-white w-full"
          :config="{ label: 'Xác nhận', click: () => fetchAllSubject() }"></Button>
      </div>
      <div v-if="subjectsList.length > 0">
        <div class="pt-4 flex justify-between items-center">
          <h1 class="text-base font-semibold text-gray-700">Danh sách Bộ môn</h1>
          <div class="flex gap-2 items-center">
            <InputField type="custom-input" placeholder="Tìm kiếm..."></InputField>
            <Button btnIcon="icon" iconBtnClass="bx bx-search" btnClass="bg-green-600 text-white hover:bg-green-700"
              :config="{ click: () => search() }"></Button>
          </div>
        </div>
      </div>
      <div v-else>
        <h1 class="text-sm font-semibold text-gray-700">Hãy chọn Khoa bạn học!</h1>
      </div>
      <div v-for="(sbj, index) in subjectsList" :key="index">
        <div
          class="flex max-w-full my-4 items-center bg-white border border-gray-200 rounded-2xl shadow hover:bg-gray-100"
          @click="detailsView(sbj.id)">
          <img class="object-cover w-full rounded-2xl h-96 md:h-auto md:w-48"
            src="https://media.istockphoto.com/id/1359932120/vector/contract-document-icon-in-flat-style-report-with-folder-vector-illustration-on-isolated.jpg?s=612x612&w=0&k=20&c=eJUJzNLAWNHutYtNiX1x0ORNXMpOriOMH0S4aX0vUm0="
            alt="">
          <div class="flex flex-col justify-between px-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-700">{{ sbj.title }}</h5>
            <p class="mb-3 font-normal text-gray-700">{{ sbj.descriptions }}</p>
          </div>
        </div>
      </div>

    </div>
    <div v-if="state == 'details'">
      <div class="py-4 flex justify-between items-center">
        <h1 class="text-base text-gray-700 font-semibold">Danh sách tài liệu</h1>
        <button @click="back()" id="scroll-button"
          class="w-10 h-10 text-white transition ease-in-out hover:scale-105 duration-150 bg-green-600 hover:bg-green-700 rounded-full">
          <i class='bx bx-chevron-left text-2xl font-semibold '></i>
        </button>
      </div>
      <div>
        Tài liệu bla bla
      </div>
    </div>
    <AsideRight />
  </div>
</template>
<script>
import { getAllDpt, getAllMajor, getAllSubject } from '@/api/auth/api';
import AsideView from '@/components/AsideView.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
  components: {
    AsideView,
  },
  data() {
    return {
      isLoading: true,
      state: "default",
      editor: ClassicEditor,
      dptSelected: "",
      sbjSelected: "",
      mjSelected: "",
      subjectsList: [
        {
          id: 1,
          title: 'Bộ môn Khoa học máy tính',
          descriptions: 'Tài liệu bao gồm:...'
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
            console.log(res)
          })
        } else {
          this.showError()
        }
      } catch (err) {
        console.log(err)
      }
    },
    detailsView(id) {
      this.state = 'details'
      console.log(id)
    },
    back() {
      this.state = 'default'
    }
  }
}
</script>
<style></style>