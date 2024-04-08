<template>
  <div class="container mx-auto my-5 p-5 max-w-4xl">
    <div class="w-full md:w-3/12 md:mx-2">
      <div class="bg-white p-3 border-t-4 border-blue-400">
        <div class="image overflow-hidden">
          <img class="h-auto w-40 mx-auto rounded-full m-3" :src="user.avatar" alt="">
        </div>
        <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{{ user.fullName }}</h1>
        <div v-if="user.role === 'ROLE_ADMIN'" class="italic">
          <h3 class="text-sm text-gray-500 hover:text-gray-600 leading-6">Tài khoản Quản trị viên</h3>
          <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">Bạn có thể làm mọi thao tác trong trang web này
            như: duyệt bài, xóa bài hay tạo thêm tài
            khoản người dùng,...</p>
        </div>
        <div v-else class="italic">
          <h3 class="text-sm text-gray-500 hover:text-gray-600 leading-6">Tài khoản Người dùng</h3>
          <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">Bạn có thể đăng bài và like và comments với tài
            khoản này, cùng khám phá nhé...</p>
        </div>
        <ul class="bg-gray-100 text-gray-600 py-2 px-3 mt-3 divide-y rounded-xl shadow-sm">
          <li class="flex items-center py-3">
            <span class="text-base font-medium">Trạng thái tài khoản</span>
            <span class="ml-auto"><span class="bg-green-500 py-1 px-2 rounded text-white text-sm">{{
              formatStatus(user.actived)
                }}</span></span>
          </li>
          <li class="flex items-center py-3">
            <span class="text-base font-medium">Vai trò</span>
            <span class="ml-auto text-base font-medium">{{ formatRole(user.role) }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="w-full h-full md:w-9/12 mx-2">
      <div class="bg-white p-3 shadow-sm rounded-sm">
        <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
          <span clas="text-green-500">
            <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </span>
          <span class="tracking-wide">Thông tin chi tiết</span>
        </div>
        <div class="text-gray-700">
          <div class="grid md:grid-cols-2 text-sm">
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Họ và tên</div>
              <div class="px-4 py-2">{{ user.fullName }}</div>
            </div>

            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Tài khoản</div>
              <div class="px-4 py-2">{{ user.username }}</div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Vai trò</div>
              <div class="px-4 py-2">{{ formatRole(user.role) }}</div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Ngày tạo tài khoản</div>
              <div class="px-4 py-2">{{ user.createdDate }}</div>
            </div>
          </div>
        </div>
        <Button btnIcon="icon" iconBtnClass="bx bxs-edit-alt"
          btnClass="w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
          :config="{ label: 'Cấu hình tài khoản', click: () => update() }"></Button>
      </div>
      <div class="my-4"></div>
      <div class="bg-white p-3 shadow-sm rounded-sm">
        <div>
          <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
            <span clas="text-green-500">
              <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </span>
            <span class="tracking-wide">Bài viết của bạn</span>
          </div>
        </div>
      </div>
      <div v-for="(post, index) in posts" :key="index" class="mt-3 flex flex-col">
        <div class="bg-white mt-3  hover:shadow-lg">
          <img class="border rounded-t-xl shadow-xl w-full" :src="post.image">
          <div class="bg-white border-b border-1 shadow p-5 text-xl text-gray-700 font-semibold">
            <div class="flex items-center gap-4">
              <img class="w-10 h-10 rounded-full" :src="post.user.avatar" alt="">
              <div class="font-medium dark:text-white">
                <div class="font-semibold">{{ user.fullName }} <span v-show="post.user.role === 'ROLE_ADMIN'"><i
                      class='bx bxs-check-shield text-blue-500'></i></span></div>
                <div class="flex gap-2">
                  <div class="text-sm text-gray-500 dark:text-gray-400 italic">Ngày đăng: {{ post.createdDate }}
                  </div>
                  <span v-if="post.actived == true"
                    class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">{{
                      checkPost(post.actived) }}</span>
                  <span v-if="post.actived == false"
                    class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">{{
                      checkPost(post.actived) }}</span>
                </div>

              </div>
            </div>
            <div class="py-5">
              <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span
                  class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                  {{ post.title }}</span></h1>
            </div>
            <div v-html="post.content" class="py-5"></div>
            <!-- Reaction -->
            <div>
              <div class="flex gap-5">
                <h1><i class='bx bx-like text-blue-600'></i> <span class="text-gray-700">{{ post.numLike }}</span>
                </h1>
                <h1><i class='bx bx-message-square-dots text-red-600'></i> <span class="text-gray-700">0</span>
                </h1>
              </div>
            </div>
          </div>

          <div v-if="post.actived == true" class="bg-white p-1 shadow flex flex-row flex-wrap rounded-b-xl">
            <div @click="increaseLike()"
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
          <div v-else>
            <div class="bg-white p-1 shadow flex flex-row flex-wrap rounded-b-xl justify-center">
              <h1 class="italic text-base">Thao tác sẽ hiển thị khi bài viết được duyệt!</h1>
            </div>
          </div>
        </div>
      </div>


    </div>

  </div>
</template>
<script>
import { editUser, getPostByUser } from '@/api/auth/api'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
  data() {
    return {
      posts: [],
      state: "default",
      userParam: {
        id: "",
        username: "",
        fullname: "",
        actived: "",
        avatar: "",
        role: "ROLE_USER"
      }
    }
  },

  computed: {
    user() {
      return this.$store.state.user
    }
  },
  mounted() {
    this.fetchPost()
    console.log(this.user)
  },
  methods: {
    setName(value) {
      this.userParam.username = value
    },
    setFullName(value) {
      this.userParam.fullname = value
    },
    setAvatar(value) {
      this.userParam.avatar = value
    },
    edit() {
      this.state = 'edit'
    },
    back() {
      this.state = 'default'
    },
    showSuccess() {
      toast.success("Cập nhật thành công!");
    },
    showError() {
      toast.error("Có lỗi xảy ra, vui lòng kiểm tra lại!");
    },
    async editAccount(userId, role) {
      try {
        if (this.userParam.username !== "" && this.userParam.fullname !== "") {
          await editUser(
            userId,
            this.userParam.username, this.userParam.fullname, this.userParam.avatar, role
          ).then(() => {
            this.showSuccess()
          })
        } else {
          this.showError()
        }
      } catch (err) {
        console.log(err)
      }
    },
    async fetchPost() {
      try {
        const userId = this.user.id;
        await getPostByUser(userId).then((res) => {
          this.posts = res.data.content
        })
      } catch (err) {
        console.log(err)
      }
    },
    checkPost(status) {
      switch (status) {
        case true:
          return 'Đã duyệt'
        case false:
          return 'Đang chờ duyệt'
      }
    },
    formatRole(role) {
      switch (role) {
        case 'ROLE_ADMIN':
          return 'Quản trị viên'
        case 'ROLE_USER':
          return 'Người dùng'
      }
    },
    formatStatus(status) {
      switch (status) {
        case true:
          return 'Đã kích hoạt'
      }
    }
  }
}
</script>
