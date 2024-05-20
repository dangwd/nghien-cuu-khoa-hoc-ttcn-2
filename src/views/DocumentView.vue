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
          <ModalComp labelBtn="Đăng tài liệu" modalIdProps="createPost" size="4xl"
            customClass="bg-green-600 text-white p-2 rounded-lg text-sm font-semibold">
            <template #header>
              <div class="flex justify-center border-b">
                <h1 class="text-lg font-semibold pb-2">Đăng tài liệu</h1>
              </div>
            </template>
            <template #content>
              <div class="flex items-center gap-4 pb-4">
                <img class="w-10 h-10 rounded-full" :src="user.avatar" alt="">
                <div class="font-medium dark:text-white">
                  <div>{{ user.fullName }}</div>
                  <span
                    class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{{
                      formatStatus(user.role) }}</span>
                </div>
              </div>
              <InputField @input-change="setTitle" labelField="title" title="Tiêu đề tài liệu"></InputField>
              <InputField @input-change="setDesc" labelField="description" title="Mô tả tài liệu"></InputField>
              <InputField @select-change="chooseDpt" type="select" title="Khoa" :options="departmentOpt"
                labelField="dpt"></InputField>
              <InputField @select-change="chooseMajor" type="select" title="Ngành" :options="majorOpt" labelField="mjr">
              </InputField>
              <InputField type="select" @select-change="chooseSubject" labelField="sbj" title="Bộ môn"
                :options="subjectOpt"></InputField>
              <progress class="progress progress-success w-full" :value="progressUpload" max="100"></progress>
              <InputField @input-file="setFile" :value="createDoc.linkFile" type="file-input"></InputField>
            </template>
            <template #footer>
              <div class="flex justify-end">
                <Button :config="{ label: 'Tạo', click: () => createDocument() }"></Button>
              </div>
            </template>
          </ModalComp>
        </div>
      </div>
      <div class="mt-2 bg-white rounded-xl border">
        <div class="p-2">
          <div class="grid grid-cols-2 gap-2 px-4 pt-4 pb-3">

            <Dropdown filter v-model="dptSelected" @change="chooseDpt" :options="departmentOpt"
              optionLabel="nameDepartment" placeholder="Khoa" class="w-full md:w-[14rem] rounded-xl text-sm" />
            <Dropdown filter v-model="mjSelected" @change="chooseMajor" :options="majorOpt" optionLabel="nameSpecialize"
              placeholder="Ngành" class="w-full md:w-[14rem] rounded-xl text-sm" />

            <!-- <InputField @select-change="chooseDpt" type="select" title="Khoa" :options="departmentOpt"></InputField>
            <InputField @select-change="chooseMajor" type="select" title="Ngành" :options="majorOpt">
            </InputField> -->
          </div>
        </div>
      </div>
      <div v-if="subjectsList.length > 0">
        <div class="pt-4 flex justify-between items-center">
          <h1 class="text-base font-semibold text-gray-700">Danh sách Bộ môn</h1>
          <div class="flex gap-2 items-center">
            <InputField :value="searchQuery" @input-change="setSearch" type="custom-input"
              customClass="shadow-sm border border-gray-200 text-gray-700 text-sm rounded-xl focus:outline-none focus:ring-green-700 focus:border-green-700 focus:ring-1 transition ease-in-out duration-150 focus:text-green-700  block w-[300px] p-2 my-2"
              placeholder="Tìm kiếm theo tên hoặc mã môn học">
            </InputField>
            <Button btnIcon="icon" iconBtnClass="bx bx-search" btnClass="bg-green-600 text-white hover:bg-green-700"
              :config="{ click: () => fetchAllSubject() }"></Button>
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
      <div class="pb-4 border-b-4 rounded-b-lg border-green-600 max-w-3xl">
        <h1 class="p-2 text-base text-gray-700 font-semibold mb-2">Tài liệu được nhiều người quan tâm!</h1>
        <div class="flex justify-between gap-4">
          <router-link :to="'detail-documents/' + doc.id" v-for="(doc, index) in highDoc" :key="index"
            class="card w-60 bg-base-100 shadow-xl hover:bg-gray-100 transition duration-150 ease-in-out hover:scale-105 hover:cursor-pointer">
            <figure class="px-5 pt-5">
              <img :src="doc.image" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-left">
              <h2 class="card-title text-base">{{ doc.name }}</h2>
              <div class="pt-2">
                <p class="text-sm">Người đăng: <span class="italic">{{ doc.user.fullName }}</span></p>
                <p class="text-sm">Ngày đăng: {{ doc.createdDate }}</p>
                <p class="text-sm">Lượt xem: {{ doc.numView }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="p-2 flex items-center justify-between">
        <h1 class="text-base text-gray-700 font-semibold">Danh sách tài liệu</h1>
        <InputField placeholder="Tìm kiếm"></InputField>
      </div>
      <div class="grid grid-cols-3 gap-4">
        <router-link :to="'detail-documents/' + doc.id" v-for="(doc, index) in docList" :key="index"
          class="card w-60 bg-base-100 shadow-xl hover:bg-gray-100 transition duration-150 ease-in-out hover:scale-105 hover:cursor-pointer">

          <figure class="px-5 pt-5">
            <img :src="doc.image" class="rounded-xl" />
          </figure>
          <div class="card-body items-center text-left">
            <h2 class="card-title text-base">{{ doc.name }}</h2>
            <div class="pt-2">
              <p class="text-sm">Người đăng: <span class="italic">{{ doc.user.fullName }}</span></p>
              <p class="text-sm">Ngày đăng: {{ doc.createdDate }}</p>
              <p class="text-sm">Lượt xem: {{ doc.numView }}</p>
            </div>
          </div>

        </router-link>
      </div>
    </div>
    <AsideRight />
  </div>
</template>
<script>
import { getAllDpt, getAllMajor, getAllSubject, getSbjById, createDocument, sendGetApi } from '@/api/auth/api';
import AsideView from '@/components/AsideView.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
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
      progressUpload: 0,
      state: "default",
      editor: ClassicEditor,
      createDoc: {
        title: "",
        image: "https://firebasestorage.googleapis.com/v0/b/vnua-forums-upload.appspot.com/o/image%2Fthumbnail.jpg?alt=media&token=f6ebcd08-56af-42a3-9ddf-1372f5e95218",
        description: "",
        linkFile: "",
        subjectId: ""
      },
      searchQuery: "",
      dptSelected: "",
      sbjSelected: "",
      mjSelected: "",
      subjectsList: [],
      docList: [
        {
          id: 1,
          title: "Slide bài giảng ASP.NET ngày 8/5",
          date: "8/5/2024",
          author: "Nguyễn Minh Đăng"
        },
        {
          id: 2,
          title: "Slide bài giảng ASP.NET ngày 8/5",
          date: "8/5/2024",
          author: "Nguyễn Minh Đăng"
        },
        {
          id: 3,
          title: "Slide bài giảng ASP.NET ngày 8/5",
          date: "8/5/2024",
          author: "Nguyễn Minh Đăng"
        },
        {
          id: 1,
          title: "Slide bài giảng ASP.NET ngày 8/5",
          date: "8/5/2024",
          author: "Nguyễn Minh Đăng"
        },
        {
          id: 1,
          title: "Slide bài giảng ASP.NET ngày 8/5",
          date: "8/5/2024",
          author: "Nguyễn Minh Đăng"
        },
        {
          id: 1,
          title: "Slide bài giảng ASP.NET ngày 8/5",
          date: "8/5/2024",
          author: "Nguyễn Minh Đăng"
        },
        {
          id: 1,
          title: "Slide bài giảng ASP.NET ngày 8/5",
          date: "8/5/2024",
          author: "Nguyễn Minh Đăng"
        },
        {
          id: 1,
          title: "Slide bài giảng ASP.NET ngày 8/5",
          date: "8/5/2024",
          author: "Nguyễn Minh Đăng"
        },
        {
          id: 1,
          title: "Slide bài giảng ASP.NET ngày 8/5",
          date: "8/5/2024",
          author: "Nguyễn Minh Đăng"
        },
      ],
      highDoc: [
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
    this.fetchThreeDoc()
    this.fetchAllDpt().then(() => {
      setTimeout(() => {
        this.isLoading = false
      }, 700)
    })
  },
  methods: {
    setTitle(value) {
      this.createDoc.title = value
    },
    setDesc(value) {
      this.createDoc.description = value
    },
    setFile(file) {
      this.createDoc.linkFile = file
      var storageRef = firebase.storage().ref('documents/' + file.name)
      let uploadTask = storageRef.put(file)
      uploadTask.on('stage_changed', (snapshot) => {
        this.progressUpload = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      }, (error) => {
        console.log(error)
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.createDoc.linkFile = downloadURL
          console.log(downloadURL)
        })
      })
    },
    chooseDpt(value) {
      this.dptSelected = value.value.id
      this.fetchAllMajor(this.dptSelected)
    },
    chooseMajor(value) {
      this.mjSelected = value.value.id
      this.fetchAllSubject()
    },
    chooseSubject(value) {
      this.sbjSelected = value
      this.createDoc.subjectId = value
    },
    setSearch(value) {
      this.searchQuery = value
    },
    showError() {
      toast.error("Có lỗi xảy ra!")
    },
    showMessage() {
      toast("Cảm ơn bạn đã đóng góp tài liệu, vui lòng chờ xét duyệt!", {
        "theme": "colored",
        "type": "info",
        "limit": 3,
        "dangerouslyHTMLString": true
      })
    },

    async fetchAllDpt() {
      try {
        await getAllDpt().then((res) => {
          this.departmentOpt = res.data
        })
      } catch (err) {
        console.log(err)
      }
    },
    async fetchAllMajor(idDpt) {
      try {
        await getAllMajor(idDpt).then((res) => {
          this.majorOpt = res.data
          // data.forEach(item => {
          //   item.text = item.nameSpecialize
          //   item.value = item.id
          // })
          // this.majorOpt = data
        })
      } catch (err) {
        console.log(err)
      }
    },
    async fetchAllSubject() {
      try {
        if (this.dptSelected != "" && this.mjSelected != "") {
          await getAllSubject(this.dptSelected, this.mjSelected, this.searchQuery).then((res) => {
            this.subjectsList = res.data.content
            const data = res.data.content
            data.forEach(item => {
              item.text = item.nameSubject
              item.value = item.id
            })
            this.subjectOpt = data

          })
        } else {
          this.showError()
        }
      } catch (err) {
        console.log(err)
      }
    },
    async fetchThreeDoc() {
      try {
        await sendGetApi("/document/public/get-top5-document?size=3").then((res) => {
          this.highDoc = res.data.content
        })
      } catch (err) {
        console.log(err)
      }
    },
    async detailsView(sbjId) {
      try {
        await sendGetApi(`/document/public/get-all-active?keywords=${""}&subjectId=${sbjId}&userId=${""}&page=0`).then((res) => {
          this.docList = res.data.content
        })
      } catch (err) {
        console.log(err)
      }
      this.state = 'details'

    },
    async createDocument() {
      try {
        if (this.createDoc.subjectId != "") {
          await createDocument(
            this.createDoc.title,
            this.createDoc.image,
            this.createDoc.description,
            this.createDoc.linkFile,
            this.createDoc.subjectId
          ).then((res) => {
            this.showMessage()
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    back() {
      this.state = 'default'
    },
    formatStatus(value) {
      switch (value) {
        case 'ROLE_USER':
          return 'Tài liệu chờ duyệt'
        case 'ROLE_ADMIN':
          return 'Đã duyệt'
      }
    },
  }
}
</script>
<style></style>