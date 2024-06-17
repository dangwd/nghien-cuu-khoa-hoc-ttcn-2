<template>
  <AsideView />
  <div class=" mx-auto my-5 p-5 max-w-4xl ">
    <div class="w-full md:w-3/12 md:mx-2">
      <div class="bg-white p-3 border-t-4 border-green-500 rounded-lg">
        <div class="image overflow-hidden">
          <img class="h-auto w-40 mx-auto rounded-full m-3" :src="userInfo.avatar" alt="">
        </div>
        <h1 class="text-gray-700 font-bold text-xl leading-8 my-1">{{ userInfo.fullName }}</h1>
        <div v-if="userInfo.role === 'ROLE_ADMIN'" class="italic">
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
            <span class="text-sm font-semibold">Trạng thái tài khoản</span>
            <span class="ml-auto"><span class="bg-green-500 py-1 px-2 rounded text-white text-sm font-semibold">{{
              formatStatus(userInfo.actived)
                }}</span></span>
          </li>
          <li class="flex items-center py-3">
            <span class="text-sm font-semibold">Vai trò</span>
            <span class="ml-auto text-sm font-semibold">{{ formatRole(userInfo.role) }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="w-full h-full md:w-9/12 mx-2">
      <div class="bg-white p-3 shadow-sm rounded-sm">
        <div class="flex items-center space-x-2 font-semibold text-gray-700 leading-8">
          <span class="text-blue-500">
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
        <div class="py-4">
          <Button @click="openUpdateAccount" label="Cập nhật thông tin" class="bg-green-700 w-full"
            icon="pi pi-pencil"></Button>
        </div>
      </div>
      <div class="my-4"></div>
      <div class="bg-white p-3 shadow-sm rounded-sm">
        <div>
          <div class="flex items-center space-x-2 font-semibold text-gray-700 leading-8 mb-3">
            <span clas="text-blue-500">
              <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </span>
            <span class="tracking-wide">Bài viết của bạn</span>
          </div>
        </div>
      </div>
      <div v-if="posts.length > 0">
        <div v-for="(post, index) in posts" :key="index" class="mt-3 flex flex-col">
          <div class="bg-white mt-3 rounded-lg">
            <img class="border rounded-t-xl shadow-xl w-full" :src="post.image">
            <div class="bg-white border-b border-1 shadow p-5 text-xl text-gray-700 font-semibold">
              <div class="flex items-center gap-4">
                <img class="w-10 h-10 rounded-full" :src="post.user.avatar" alt="">
                <div class="font-medium dark:text-white">
                  <div class="font-semibold text-base">{{ user.fullName }} <span
                      v-show="post.user.role === 'ROLE_ADMIN'"><i class='bx bxs-check-shield text-blue-500'></i></span>
                  </div>
                  <div class="flex gap-2">
                    <div class="flex gap-2">
                      <h1 class="text-xs text-gray-500">{{ post.createdTime }} /</h1>
                      <h1 class="text-xs text-gray-500">{{ post.createdDate }}</h1>
                      <i class='bx bxs-planet text-xs text-gray-500'></i>
                    </div>
                    <span v-if="post.actived == true"
                      class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">{{
                        checkPost(post.actived) }}</span>
                    <span v-if="post.actived == false"
                      class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">{{
                        checkPost(post.actived) }}</span>

                  </div>
                </div>
                <div class="flex gap-2">
                  <Button @click="updatePost(post)" v-if="post.actived == false" size="small"
                    class="bg-green-600 ring-none" rounded icon="pi pi-pencil" text></Button>
                  <Button @click="removePost(post)" size="small" class="text-red-600" text rounded
                    icon="pi pi-trash"></Button>
                </div>
              </div>
              <div class="pt-5">
                <h1 class="mb-4 text-xl font-extrabold text-gray-700 dark:text-white"><span
                    class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                    {{ post.title }}</span></h1>
              </div>
              <div class="text-base font-medium py-5" v-html="post.content"></div>

              <!-- Reaction -->
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
            <div v-if="post.actived == true" class="bg-white p-1 shadow flex flex-row flex-wrap rounded-b-xl">
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
            <div v-else>
              <div class="bg-white p-1 shadow flex flex-row flex-wrap rounded-b-xl justify-center">
                <h1 class="italic text-base">Thao tác sẽ hiển thị khi bài viết được duyệt!</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="grid items-center p-5">
          <span class="mx-auto"><i class='bx bx-clipboard text-8xl font-semibold text-gray-700'></i></span>
          <h1 class="flex justify-center font-semibold text-gray-700">Hiện bạn chưa đăng bài viết nào</h1>
        </div>
      </div>
    </div>
  </div>
  <AsideRight />
  <Dialog v-model:visible="updateAccModal" modal :header="'Cập nhật tài khoản ' + userParam.fullname"
    :style="{ width: '700px' }">
    <div class="grid gap-4">
      <div class="flex items-center justify-center">
        <img class="w-24 h-24 rounded-full"
          :src="userParam.avatar ? userParam.avatar : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'" alt="">
      </div>
      <div class="flex gap-2">
        <div class="flex flex-col gap-2 w-full">
          <label class="text-sm font-semibold" for="username">Tên người dùng</label>
          <InputText v-model="userParam.fullname" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
            size="small" placeholder="Nguyen Van A" />
        </div>
        <div class="flex flex-col gap-2 w-full">
          <label class="text-sm font-semibold" for="username">Tài khoản</label>
          <InputText v-model="userParam.username" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
            size="small" placeholder="abc@gmail.com" />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <InputField v-model="userParam.avatar" @input-file="setAvatar" title="Avatar" type="file-input">
        </InputField>
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-sm font-semibold" for="username">Mật khẩu</label>
        <InputText v-model="userParam.password" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
          size="small" placeholder="**********" />
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-sm font-semibold" for="username">Nhập lại mật khẩu</label>
        <InputText v-model="userParam.passwordConfirm" class="focus:ring-0 border-gray-300 rounded-xl text-sm"
          type="text" size="small" placeholder="**********" />
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-sm font-semibold" for="username">Vai trò</label>
        <InputText v-model="(userParam.role)" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
          size="small" :disabled="true"></InputText>
      </div>
    </div>
    <div class="pt-4 flex justify-end">
      <Button class="text-white bg-green-600 hover:bg-green-700 p-1 text-sm border-none" label="Cập nhật"
        @click="updateAccount()" />
    </div>
  </Dialog>
  <Dialog v-model:visible="removeModal" modal header="Xóa ?" :style="{ width: '700px' }">
    <h1 class="text-lg font-semibold text-red-600 text-center">Sau khi xóa sẽ không thể phục hồi...</h1>
    <div class="flex justify-end items-end">
      <Button class="bg-red-600 border-none text-white hover:bg-red-700 ring-0 outline-none" label="Xóa"
        @click="deletePost(postId)"></Button>
    </div>
  </Dialog>
  <Dialog v-model:visible="viewModal" modal :header="'Chi tiết bài viết ' + titleView" :style="{ width: '1094px' }">
    <div class="w-full">
      <Image class="mb-2 rounded-lg" :src="imageView" alt="Image" preview />
      <div class="flex flex-col gap-2 w-full">
        <label class="text-sm font-semibold" for="username">Tiêu đề bài viết</label>
        <InputText v-model="titleView" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
          size="small" />
      </div>
      <div class="flex flex-col gap-2 w-full">
        <label class="text-sm font-semibold" for="username">Mô tả</label>
        <InputText v-model="descriptionView" class="focus:ring-0 border-gray-300 rounded-xl text-sm" type="text"
          size="small" />
      </div>
      <div class="flex flex-col gap-2 w-full">
        <label class="text-sm font-semibold" for="status">Danh mục</label>
        <Dropdown v-model="categoryView" optionLabel="name" :placeholder="categoryView"
          class="w-full md:w-[14rem] rounded-xl text-sm" />
      </div>
      <div class="flex flex-col gap-2 w-full">
        <label class="text-sm font-semibold" for="status">Trạng thái</label>
        <Dropdown v-model="statusView" optionLabel="name" :placeholder="formatStatusPost(statusView)"
          class="w-full md:w-[14rem] rounded-xl text-sm" disabled />
      </div>
      <div class="w-full">
        <label class="text-sm font-semibold" for="contentView">Nội dung</label>
        <InputField @input-change="setContentView" :value="contentView" type="ckeditor"></InputField>
      </div>
    </div>
    <div class="pt-4 flex justify-end">
      <Button class="text-white bg-green-600 hover:bg-green-700 p-1 text-sm border-none" label="Cập nhật"
        @click="confirmUpdatePost()" />
    </div>
  </Dialog>
</template>
<script>
import { getPostByUser, sendGetApi, likePost, sendPostApi, sendDeleteApi } from '@/api/auth/api'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Button from 'primevue/button';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
export default {
  components: {
    Button
  },
  data() {
    return {
      imageView: "",
      titleView: "",
      descriptionView: "",
      categoryView: "",
      statusView: "",
      contentView: "",
      posts: [],
      postId: "",
      userInfo: {},
      updateAccModal: false,
      viewModal: false,
      removeModal: false,
      state: "default",
      userParam: {
        id: "",
        username: "",
        fullname: "",
        password: "",
        passwordConfirm: "",
        actived: "",
        avatar: "",
        role: ""
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
    this.fetchUserById()
  },
  methods: {
    setAvatar(file) {
      this.userParam.avatar = file
      var storageRef = firebase.storage().ref('avatar/' + file.name)
      let uploadTask = storageRef.put(file)
      uploadTask.on('stage_changed', (snapshot) => {
        console.log(snapshot)
      }, (error) => {
        console.log(error)
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.userParam.avatar = downloadURL
          console.log(downloadURL)
        })
      })
    },
    setContentView(value) {
      this.contentView = value
    },
    openUpdateAccount() {
      this.updateAccModal = true
    },
    showSuccess(res) {
      toast.success(res || "Cập nhật thành công!");
    },
    showError() {
      toast.error("Có lỗi xảy ra, vui lòng kiểm tra lại!");
    },
    updatePost(post) {
      this.postId = post.id
      this.viewModal = true
      this.imageView = post.image
      this.titleView = post.title
      this.statusView = post.actived
      this.contentView = post.content
      this.categoryView = post.blogCategories[0].category.name
      this.descriptionView = post.description
    },
    async confirmUpdatePost() {
      const data = {
        id: this.postId,
        image: this.imageView,
        title: this.titleView,
        actived: this.statusView,
        content: this.contentView,
        description: this.descriptionView
      }
      try {
        const res = await sendPostApi(`blog/all/save-update`, data).then((res) => {
          console.log(res)
          this.viewModal = false
          this.fetchPost()
        })
      } catch (e) {
        this.showError(e)
      }
    },
    removePost(data) {
      this.postId = data.id;
      this.removeModal = true
    },
    async increaseLike(id) {
      try {
        await likePost(id).then((res) => {
          console.log(res)
        }
        )
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
    async fetchUserById() {
      const id = this.user.id
      await sendGetApi(`/all/find-user-by-id?id=${id}`).then((res) => {
        this.userInfo = res.data
        this.userParam.username = res.data.username
        this.userParam.fullname = res.data.fullName
        this.userParam.avatar = res.data.avatar
        this.userParam.role = res.data.role
      })
    },
    async updateAccount() {
      const data = {
        id: this.user.id,
        username: this.userParam.username,
        fullName: this.userParam.fullname,
        avatar: this.userParam.avatar,
        password: this.userParam.passwordConfirm
      }
      if (this.userParam.password === this.userParam.passwordConfirm) {
        await sendPostApi("/update-infor", data).then((res) => {
          console.log(res)
          this.updateAccModal = false
          this.fetchUserById()
          this.showSuccess()
        })
      } else {
        toast.error("Mật khẩu không khớp!")
      }
    },
    async deletePost(id) {
      try {
        const res = await sendDeleteApi(`/blog/all/delete?blogId=${id}`).then((res) => {
          this.showSuccess(res.data)
          this.removeModal = false
          this.fetchPost()
        })
      } catch (e) {
        console.log(e)
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
    },
    formatStatusPost(s) {
      switch (s) {
        case true:
          return 'Đã duyệt'
        case false:
          return 'Chờ duyệt'
      }
    }

  }
}
</script>
