<template>
  <div v-if="isLoading">
    <div class="flex items-center justify-center h-screen">
      <div class="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
    </div>
  </div>
  <div v-else class="w-full flex flex-row flex-wrap max-w-4xl mx-auto">
    <div class="w-full  h-screen flex flex-row flex-wrap justify-center">
      <AsideView></AsideView>
      <div class="w-full md:w-3/4 lg:w-4/5 p-5 md:px-12 lg:24 h-full antialiased">
        <div class="bg-white w-full shadow rounded-xl p-5">
          <div class="flex gap-2">
            <img class="w-10 h-10 rounded-full" :src="user.avatar" alt="">
            <input type="text" :placeholder="'Bạn đang nghĩ gì thế ' + user.fullName + ' ?'"
              class="w-full p-2 text-gray-700 border border-gray-200 rounded-full bg-gray-50 text-sm italic" disabled>
          </div>
          <div class="flex justify-end pt-3">
            <ModalComp labelBtn="Đăng bài" modalIdProps="createPost" size="4xl"
              customClass="bg-blue-600 text-white p-2 rounded-lg text-sm font-semibold">
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
                <InputField styleClass="py-2" @input-change="setContent" :value="createPost.content" type="ckeditor">
                </InputField>
                <InputField @input-file="setImage" :value="createPost.image" type="file"></InputField>
              </template>
              <template #footer>
                <div class="flex justify-end">
                  <Button :config="{ label: 'Tạo', click: () => create() }"></Button>
                </div>
              </template>
            </ModalComp>
          </div>
        </div>

        <div v-for="(post, index) in posts" :key="index" class="mt-3 flex flex-col">
          <div class="bg-white mt-3  hover:shadow-lg">
            <img class="border rounded-t-xl shadow-xl w-full" :src="post.image">

            <div class="bg-white border-b border-1 shadow p-5 text-xl text-gray-700 font-semibold">
              <div class="flex items-center gap-4">
                <img class="w-10 h-10 rounded-full" :src="post.user.avatar" alt="">
                <div class="font-medium dark:text-white">
                  <div class="font-semibold">{{ post.user.fullName }} <span v-show="post.user.role === 'ROLE_ADMIN'"><i
                        class='bx bxs-check-shield text-blue-500'></i></span></div>
                  <div class="text-sm text-gray-500 dark:text-gray-400 italic">Ngày đăng: {{ post.createdDate }}
                    <i class='bx bx-check text-green-500 text-lg'></i>
                  </div>
                </div>
              </div>
              <div class="py-5">
                <h1 class="mb-4 text-3xl font-extrabold text-gray-700 dark:text-white md:text-5xl lg:text-6xl"><span
                    class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                    {{ post.title }}</span></h1>
              </div>
              <!-- Reaction -->
              <div>
                <div class="flex gap-5">
                  <h1><i class='bx bx-like text-blue-600'></i> <span class="text-gray-700">{{ post.numLike }}</span>
                  </h1>
                  <h1><i class='bx bx-message-square-dots text-red-600'></i> <span class="text-gray-700">{{
                    post.numComment
                  }}</span>
                  </h1>
                </div>
              </div>
            </div>

            <div class="bg-white p-1 shadow flex flex-row flex-wrap rounded-b-xl">
              <div @click="increaseLike(post.id)"
                class="w-1/3 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-150 hover:bg-blue-500 hover:shadow-lg text-center text-xl rounded-xl text-gray-700 hover:text-white font-semibold">
                Like</div>

              <router-link :to="'/detail-post/' + post.id"
                class="w-1/3 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-150 hover:bg-red-500 hover:text-white hover:shadow-lg rounded-xl text-center text-xl text-gray-700 font-semibold">
                Comment
              </router-link>
              <div @click="showMessage()"
                class="w-1/3 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-150 hover:bg-green-500 hover:text-white hover:shadow-lg rounded-xl text-center text-xl text-gray-700 font-semibold">
                Share</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAllPostPublic, createPost, likePost } from '@/api/auth/api'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import AsideView from '@/components/AsideView.vue';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
export default {
  components: {
    AsideView
  },
  data() {
    return {
      statusLike: false,
      comments: [],

      createPost: {
        title: "",
        description: "",
        content: "",
        image: null,
        linkFiles: [],
        listCategoryId: [
          8
        ]
      },
      isLoading: true,
      posts: []
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  mounted() {
    this.fetchAllPostPub()
      .then(() => {
        setTimeout(() => {
          this.isLoading = false
        }, 700)
      })
  },
  methods: {
    async increaseLike(id) {
      await likePost(id).then((res) => {
        this.showSuccess()
        this.fetchAllPostPub()
      })
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
    setImage(file) {
      this.createPost.image = file
      var storageRef = firebase.storage().ref('image/' + file.name)
      let uploadTask = storageRef.put(file)
      uploadTask.on('stage_changed', (snapshot) => {
        console.log(snapshot)
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
    showMessage() {
      toast("Chức năng đang được xây dựng", {
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
        await getAllPostPublic().then((res) => {
          this.posts = res.data.content
        })
      } catch (err) {
        console.log(err)
      }
    },
    async create() {
      try {
        if (this.createPost.title !== "" && this.createPost.description !== "" && this.createPost.content !== "") {
          await createPost(
            this.createPost.title,
            this.createPost.description,
            this.createPost.image,
            this.createPost.content,
            this.createPost.linkFiles,
            this.createPost.listCategoryId
          ).then(() => {
            this.fetchAllPostPub()
            this.showSuccess()
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
  }
}
</script>
<style>
.round {
  border-radius: 50%;
}
</style>