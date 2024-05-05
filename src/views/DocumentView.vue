<template>
  <div v-if="isLoading">
    <div class="flex items-center justify-center h-screen">
      <div class="rounded-md h-12 w-12 border-4 border-t-4 border-green-500 animate-spin absolute"></div>
    </div>
  </div>
  <div v-else class="max-w-4xl mx-auto">
    <AsideView></AsideView>
    <div>
      <div class="grid grid-cols-2 gap-2">
        <InputField @select-change="chooseDpt" type="select" title="Khoa" :options="departmentOpt"
          :selected="dptSelected"></InputField>
        <InputField @select-change="chooseMajor" type="select" title="Ngành" :options="majorOpt"></InputField>
        <!-- <InputField @select-change="chooseSubject" type="select" title="Bộ môn" :options="subjectOpt"></InputField> -->
      </div>
      <div class="pt-4">
        <Button btnClass="bg-green-600 hover:bg-green-700 text-white w-full"
          :config="{ label: 'Xác nhận', click: () => test() }"></Button>
      </div>
      <div v-if="documents.length > 0">
        <div class="pt-4 flex justify-between items-center">
          <h1 class="text-sm font-semibold text-gray-700">Danh sách tài liệu liên quan</h1>
          <InputField></InputField>
        </div>
      </div>
      <div v-else>
        <h1 class="text-sm font-semibold text-gray-700">Hãy chọn Khoa bạn học!</h1>
      </div>
      <div v-for="(doc, index) in documents" :key="index"
        class="flex max-w-full my-4 items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
        <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
          src="https://media.istockphoto.com/id/1359932120/vector/contract-document-icon-in-flat-style-report-with-folder-vector-illustration-on-isolated.jpg?s=612x612&w=0&k=20&c=eJUJzNLAWNHutYtNiX1x0ORNXMpOriOMH0S4aX0vUm0="
          alt="">
        <div class="flex flex-col justify-between p-4 leading-normal">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ doc.title }}</h5>
          <p class="mb-3 font-normal text-gray-700">{{ doc.descriptions }}</p>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import AsideView from '@/components/AsideView.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
  components: {
    AsideView,
  },
  data() {
    return {
      isLoading: false,
      editor: ClassicEditor,
      dptSelected: "",
      sbjSelected: "",
      mjSelected: "",
      documents: [
        {
          title: "Tài liệu 1",
          descriptions: "Mô tả"
        },
        {
          title: "Tài liệu 1",
          descriptions: "Mô tả"
        },
        {
          title: "Tài liệu 1",
          descriptions: "Mô tả"
        }
      ],
      departmentOpt: [
        { text: "Công nghệ thông tin", value: "Công nghệ thông tin" },
        { text: "Công nghệ sinh học", value: "Công nghệ sinh học" },
        { text: "Công nghệ thực phẩm", value: "Công nghệ thực phẩm" },
      ],
      majorOpt: [
        { text: "CNTT", value: "CNTT" },
        { text: "KHMT", value: "KHMT" },
        { text: "MMT", value: "MMT" },
      ],
      subjectOpt: [
        { text: "demo", value: 1 },
        { text: "demo", value: 2 },
        { text: "demo", value: 3 },
      ]
    }
  },
  methods: {
    chooseDpt(value) {
      this.dptSelected = value
    },
    chooseMajor(value) {
      this.mjSelected = value
    },
    chooseSubject(value) {
      this.sbjSelected = value
    },
    test() {
      const data = {
        dpt: this.dptSelected,
        mj: this.mjSelected,
        sbj: this.sbjSelected
      }
      console.log(data)
    }
  }
}
</script>
<style></style>