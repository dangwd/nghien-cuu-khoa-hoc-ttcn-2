<template>
  <div v-if="isLoading">
    <div class="flex items-center justify-center h-screen">
      <div class="rounded-md h-12 w-12 border-4 border-t-4 border-green-500 animate-spin absolute"></div>
    </div>
  </div>
  <div v-else class="w-full flex flex-row flex-wrap mx-auto">
    <div class="w-full flex flex-row flex-wrap justify-center">
      <AsideView></AsideView>
      <div class="max-w-3xl md:w-3/4 lg:w-4/5 p-5 md:px-12 lg:24 antialiased">
        <div class="bg-white w-full shadow rounded-xl p-5">
          <div class="flex gap-2">
            <img class="w-10 h-10 rounded-full" :src="user.avatar" alt="">
            <input type="text" :placeholder="'Bạn đang nghĩ gì thế ' + user.fullName + ' ?'"
              class="w-full p-2 text-gray-700 border border-gray-200 rounded-full bg-gray-50 text-sm italic" disabled>
          </div>
          <div class="flex justify-end pt-3">
            <ModalComp labelBtn="Đăng bài" modalIdProps="createPost" size="4xl"
              customClass="bg-green-600 text-white p-2 rounded-lg text-sm font-semibold">
              <template #header>
                <div class="flex justify-center border-b">
                  <h1 class="text-lg font-semibold pb-2">Tạo bài viết</h1>
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
                <InputField @input-change="setTitle" :value="createPost.title" labelField="title"
                  title="Tiêu đề bài viết"></InputField>
                <InputField @input-change="setDescription" :value="create.description" labelField="description"
                  title="Mô tả bài viết"></InputField>
                <InputField type="select-name" @select-change="setCategory" :options="categoryOptions"
                  labelField="description" title="Danh mục"></InputField>
                <InputField styleClass="py-2" @input-change="setContent" :value="createPost.content" type="ckeditor">
                </InputField>
                <progress class="progress progress-success w-full" :value="progressUpload" max="100"></progress>
                <InputField @input-file="setImage" :value="createPost.image" type="file-input"></InputField>
              </template>
              <template #footer>
                <div class="flex justify-end">
                  <Button :config="{ label: 'Tạo', click: () => create() }"></Button>
                </div>
              </template>
            </ModalComp>
          </div>
        </div>
        <div>
          <div v-for="(post, index) in posts" :key="index" class="mt-3 flex flex-col">
            <div class="bg-white mt-3 rounded-lg">
              <img class="border rounded-t-xl shadow-xl w-full" :src="post.image">
              <div class="bg-white border-b border-1 shadow p-5 text-xl text-gray-700 font-semibold">
                <div class="flex items-center gap-4">
                  <img class="w-10 h-10 rounded-full" :src="post.user.avatar" alt="">
                  <div class="font-medium">
                    <div class="font-semibold text-base">{{ post.user.fullName }} <span
                        v-show="post.user.role === 'ROLE_ADMIN'"><i
                          class='bx bxs-check-shield text-blue-500'></i></span>
                    </div>
                    <div class="flex gap-2">
                      <h1 class="text-xs text-gray-500">{{ post.createdTime }} /</h1>
                      <h1 class="text-xs text-gray-500">{{ post.createdDate }}</h1>
                      <i class='bx bxs-planet text-xs text-gray-500'></i>
                    </div>
                  </div>
                </div>
                <div class="py-5">
                  <h1 class="mb-4 text-lg font-extrabold text-gray-700"><span
                      class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                      {{ post.title }}</span></h1>
                  <div class="text-base font-medium" v-html="post.content"></div>
                </div>
                <!-- Reaction -->
                <div>
                  <div class="flex gap-5">
                    <h1><i class='bx bxs-heart text-green-600 font-semibold'></i> <span
                        class="text-gray-700 text-base">{{
                          post.numLike
                        }}</span>
                    </h1>
                    <h1><i class='bx bxs-message-square-dots text-blue-600 font-semibold'></i> <span
                        class="text-gray-700 text-base">{{
                          post.numComment
                        }}</span>
                    </h1>
                  </div>
                </div>
              </div>

              <div class="bg-white p-1 shadow flex flex-row flex-wrap rounded-b-xl">
                <button @click="increaseLike(post.id)" :class="{ 'text-green-600': statusLike }"
                  class="w-1/3 text-center text-base rounded-xl text-gray-700 hover:text-green-600 font-semibold">
                  <i class='bx bxs-heart text-lg'></i> Like
                </button>

                <router-link :to="'/detail-post/' + post.id"
                  class="w-1/3 text-center text-base rounded-xl text-gray-700 hover:text-blue-600 font-semibold">
                  <i class='bx bx bxs-message-square-dots text-lg'></i> Comment
                </router-link>
                <button @click="showMessage()"
                  class="w-1/3 text-center text-base rounded-xl text-gray-700 hover:text-red-600 font-semibold">
                  <i class='bx bxs-share'></i> Share
                </button>
              </div>
            </div>
          </div>
          <div v-if="posts.length" v-observe-visibility="handleScroll">
          </div>
        </div>
        <AsideRight />
      </div>
    </div>
  </div>

</template>
<script>
import { likePost, sendGetApi, sendPostApi } from '@/api/auth/api'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import AsideView from '@/components/AsideView.vue';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { ObserveVisibility } from "vue3-observe-visibility";
import { ref } from 'vue';
export default {
  directives: {
    ObserveVisibility
  },
  components: {
    AsideView
  },
  data() {
    return {
      statusLike: false,
      progressUpload: 0,
      loading: false,
      currentPage: 0,
      comments: [],
      categoryOptions: [],
      createPost: {
        title: "",
        description: "",
        content: "",
        image: null,
        listCategoryId: []
      },
      isLoading: true,
      posts: ref([])
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },

  },
  mounted() {
    this.fetchCategory()
    this.fetchAllPostPub()
      .then(() => {
        setTimeout(() => {
          this.isLoading = false
        }, 700)
      })
  },
  methods: {
    handleScroll(isVisible) {
      if (!isVisible) { return }
      this.currentPage++
      this.fetchAllPostPub()
    },
    async increaseLike(id) {
      try {
        await likePost(id)
        const res = await sendGetApi(`blog/public/get-all-active?page=${this.currentPage}&size=5&keywords=${""}`);
        this.posts = []
        res.data.content.forEach(post => {
          this.posts.push(post);
        });
      } catch (err) {
        console.log(err)
      }
    },
    setTitle(value) {
      this.createPost.title = value
    },
    setDescription(value) {
      this.createPost.description = value
    },
    setContent(value) {
      this.createPost.content = value
    },
    setCategory(value) {
      this.createPost.listCategoryId = [value]
      console.log(value)
    },
    setImage(file) {
      this.createPost.image = file
      var storageRef = firebase.storage().ref('image/' + file.name)
      let uploadTask = storageRef.put(file)
      uploadTask.on('stage_changed', (snapshot) => {
        this.progressUpload = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      }, (error) => {
        console.log(error)
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.createPost.image = downloadURL
          console.log(downloadURL)
        })
      })
    },
    formatStatus(value) {
      switch (value) {
        case 'ROLE_USER':
          return 'Bài viết chờ duyệt'
        case 'ROLE_ADMIN':
          return 'Đã duyệt'
      }
    },
    showMessage(e) {
      toast(e || "Chức năng đang được xây dựng", {
        "theme": "colored",
        "type": "info",
        "limit": 3,
        "dangerouslyHTMLString": true
      })
    },
    showSuccess() {
      toast("Thao tác thành công!", {
        "theme": "colored",
        "type": "success",
        "limit": 3,
        "dangerouslyHTMLString": true
      })
    },
    async fetchAllPostPub() {
      try {
        await sendGetApi(`blog/public/get-all-active?page=${this.currentPage}&size=5&keywords=${""}`).then((res) => {
          res.data.content.forEach(post => {
            this.posts.push(post);
          });
        })
      } catch (err) {
        console.log(err)
      }
    },
    async fetchCategory() {
      try {
        await sendGetApi(`/category/public/get-all-and-search-category?name=${""}`).then((res) => {
          this.categoryOptions = res.data.content
        })
      } catch (err) {
        console.log(err);
      }
    },
    async create() {
      const data = {
        title: this.createPost.title,
        description: this.createPost.description,
        image: this.createPost.image,
        content: this.createPost.content,
        listCategoryId: this.createPost.listCategoryId
      }
      try {
        if (this.createPost.title !== "" && this.createPost.description !== "" && this.createPost.content !== "") {
          await sendPostApi("/blog/all/save-update", data).then(() => {
            this.showSuccess()
            // this.resetData()
          })
          const res = await sendGetApi(`blog/public/get-all-active?page=${this.currentPage}&size=5&keywords=${""}`);
          this.posts = []
          res.data.content.forEach(post => {
            this.posts.push(post);
          });
        } else {
          this.showMessage("Trường nhập thiếu")
        }
      } catch (err) {
        console.log(err)
      }
    },
    // resetData() {
    //   this.createPost.title = ""
    //   this.createPost.description = ""
    //   this.createPost.content = ""
    //   this.createPost.image = ""
    //   this.createPost.listCategoryId = []
    // }
  }
}
</script>
<style>
.round {
  border-radius: 50%;
}
</style>