<template>
  <div v-if="isLoading">
    <div class="flex items-center justify-center h-screen">
      <div class="rounded-md h-12 w-12 border-4 border-t-4 border-green-500 animate-spin absolute"></div>
    </div>
  </div>
  <div v-else class=" max-w-3xl mx-auto">
    <AsideView></AsideView>
    <div class="py-4 flex justify-end">
      <router-link to="/homepage">
        <button id="scroll-button"
          class="w-10 h-10 text-white transition ease-in-out hover:scale-105 duration-150 bg-green-600 hover:bg-green-700 rounded-full">
          <i class='bx bx-chevron-left text-2xl font-semibold '></i>
        </button>
      </router-link>
    </div>
    <div class="py-5">
      <div class="bg-white mt-3">
        <img class="border rounded-t-xl shadow-xl w-full" :src="post.image">
        <div class="bg-white shadow p-5 text-xl text-gray-700 font-semibold">
          <div class="flex items-center gap-4" v-if="post && post.user">
            <img class="w-10 h-10 rounded-full" :src="post.user.avatar" alt="">
            <div class="font-medium dark:text-white">
              <div class="font-semibold">{{ post.user.fullName }} <span v-show="post.user.role === 'ROLE_ADMIN'"><i
                    class='bx bxs-check-shield text-blue-500'></i></span></div>
              <div class="flex gap-2">
                <h1 class="text-xs text-gray-500">{{ post.createdTime }} /</h1>
                <h1 class="text-xs text-gray-500">{{ post.createdDate }}</h1>
                <i class='bx bxs-planet text-xs text-gray-500'></i>
              </div>

            </div>
          </div>
          <div class="py-5">
            <h1 class="mb-4 text-xl font-extrabold text-gray-700 dark:text-white"><span
                class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                {{ post.title }}</span></h1>
          </div>
          <div class="text-base font-medium" v-html="post.content"></div>
          <div class="py-5" v-if="post.blogCategories[0]">
            <div class="badge badge-info gap-2 text-white text-xs">
              #{{ post.blogCategories[0].category.name }}
            </div>
          </div>
          <div>
            <div class="flex gap-5">
              <h1><i class='bx bxs-heart text-green-600 font-semibold'></i> <span class="text-gray-700 text-base">{{
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
        <div class="bg-white p-1 shadow flex flex-row flex-wrap border-t rounded-b-xl">
          <button @click="increaseLike(post.id)"
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
    <div class="h-screen">
      <div class="max-w-3xl p-6 bg-white rounded-xl shadow-lg">
        <div class="mb-5">
          <h1 class="font-bold text-xl">Comment</h1>
          <div class="py-4">
            <span class="bg-green-100 italic text-green-700 text-base me-2 px-2.5 py-0.5 rounded-full">Comment
              văn minh, lịch sự góp phần xây dựng cộng đồng trong sạch!</span>
          </div>

          <div class="flex items-start gap-2.5 mt-2">
            <img class="w-10 h-10 rounded-full" :src="user.avatar">
            <div
              class="flex flex-col w-full leading-1.5 p-4 border-gray-200 border bg-gray-100 rounded-e-xl rounded-es-xl">
              <div class="flex items-center space-x-2 rtl:space-x-reverse">
                <span class="text-sm font-semibold text-gray-700">{{ user.fullName }}</span>
                <span v-show="user.role === 'ROLE_ADMIN'"
                  class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ">
                  <span class="flex gap-2 items-center">
                    <h1 class="text-xs">Quản trị viên</h1>
                    <i class='bx bxs-check-shield text-blue-500'></i>
                  </span></span>
              </div>
              <InputField @input-change="setCmt" :value="cmtParams.content" labelField="name" type="ckeditor"
                styleClass="pt-4">
              </InputField>
              <div class="flex justify-end py-2">
                <Button btnIcon="icon" iconBtnClass="bx bxs-send" btnClass="bg-green-600 text-white hover:bg-green-700"
                  :config="{ click: () => createComment(post.id) }"></Button>
              </div>

            </div>

          </div>
        </div>
        <div v-if="comments.length > 0">
          <div v-for="(cmt, index) in comments" :key="index" class="flex items-start gap-2.5 mt-2">
            <img class="w-10 h-10 rounded-full" :src="cmt.user.avatar">
            <div
              class="flex flex-col w-full leading-1.5 p-4 my-2 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl">
              <div class="flex items-center space-x-2 rtl:space-x-reverse">
                <span class="text-sm font-semibold text-gray-700">{{ cmt.user.fullName }}</span>
                <span v-show="cmt.user.role === 'ROLE_ADMIN'"
                  class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ">
                  <span class="flex gap-2 items-center">
                    <h1 class="text-xs">Quản trị viên</h1>
                    <i class='bx bxs-check-shield text-blue-500'></i>
                  </span></span>
                <span class="text-sm font-normal text-gray-500 ">{{ cmt.createdTime }}</span>
                <div class="grow"></div>
                <div v-show="user.role === 'ROLE_ADMIN'">
                  <Button btnIcon="icon" iconBtnClass="bx bxs-trash-alt"
                    btnClass="text-gray-600 hover:text-gray-700 text-lg font-semibold"
                    :config="{ click: () => deleteCmt(cmt.id) }"></Button>
                </div>
              </div>
              <p v-html="cmt.content" class="text-sm font-normal py-2.5 text-gray-700"></p>
              <span class="text-sm font-normal text-gray-500">Checked</span>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="flex justify-center items-center">
            <span>
              <div class="px-12"><i class='bx bx-message-square-dots text-9xl text-gray-700'></i></div>
              <h1 class="font-bold text-xl text-gray-700">Chưa có comments nào </h1>
            </span>
          </div>
        </div>
      </div>
    </div>
    <AsideRight />
  </div>
</template>
<script>
import { commentPost, getCommentById, getPostById, likePost, removeCmtPost } from '@/api/auth/api';
import { toast } from 'vue3-toastify';
import AsideView from '@/components/AsideView.vue';
import 'vue3-toastify/dist/index.css';
import moment from 'moment'
export default {
  components: {
    AsideView
  },
  data() {
    return {
      isLoading: true,
      post: {},
      comments: [],
      cmtParams: {
        content: "",
        blogId: ""
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  mounted() {
    this.fetchComment()
    this.fetchDetailPost().then(() => {
      setTimeout(() => {
        this.isLoading = false
      }, 700)
    });
    window.addEventListener('scroll', () => {
      const scrollButton = document.getElementById('scroll-button');
      if (scrollButton) {
        if (window.scrollY > 100) {
          scrollButton.classList.add('sticky');
        } else {
          scrollButton.classList.remove('sticky');
        }
      }
    });
  },
  methods: {
    setCmt(value) {
      this.cmtParams.content = value
    },
    async increaseLike(id) {
      try {
        const res = await likePost(id);
        this.fetchDetailPost();

      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    },

    showSuccess() {
      toast("Xóa thành công!", {
        "theme": "colored",
        "type": "success",
        "limit": 3,
        "dangerouslyHTMLString": true
      })
    },
    showError() {
      toast("Có lỗi xảy ra!", {
        "theme": "colored",
        "type": "error",
        "limit": 3,
        "dangerouslyHTMLString": true
      })
    },
    // Chi tiet bai viet
    async fetchDetailPost() {
      const postId = this.$route.params.id;
      await getPostById(postId).then((res) => {
        this.post = res.data
      })
    },
    //Get Comment
    async fetchComment() {
      try {
        const commentId = this.$route.params.id;
        await getCommentById(commentId).then((res) => {
          this.comments = res.data.content

        })
      } catch (err) {
        console.log(err)
      }
    },
    async deleteCmt(id) {
      try {
        await removeCmtPost(id).then((res) => {
          this.fetchComment()
          this.showSuccess()
        })
      } catch (err) {
        console.log(err)
      }
    },
    // Post cmt
    async createComment(postId) {
      try {
        if (this.cmtParams.content !== "") {
          await commentPost(
            this.cmtParams.content,
            postId
          ).then(() => {
            this.fetchComment()
            this.cmtParams.content = ""
          })
        } else {
          this.showError()
        }
      } catch (err) {
        console.log(err)
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
<style>
#scroll-button.sticky {
  position: fixed;
  bottom: 20px;
  right: 330px;
  z-index: 9999;
}
</style>