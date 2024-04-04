<template>
  <div>
    <div class="container mx-auto py-8">
      <div class=" gap-5">
        <div class="my-10 max-w-4xl mx-auto w-full">
          <div class="bg-white shadow-xl rounded-xl p-6">
            <div class="flex flex-col items-center">
              <img :src="user.avatar" class="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0">
              <h1 class="text-xl font-bold">{{ user.fullName }}</h1>
              <p class="text-gray-700">{{ formatRole(user.role) }}</p>
            </div>
            <hr class="my-6 border-t border-gray-300">
          </div>
        </div>
        <div v-if="state == 'default'" class="w-full max-w-4xl mx-auto">
          <div class="bg-white shadow-xl rounded-xl p-6">
            <div class="flex justify-between">
              <h2 class="text-xl font-bold mb-4">Thông tin tài khoản</h2>
              <Button :config="{ label: 'Sửa', click: () => edit() }"></Button>
            </div>
            <div class="mb-6">
              <h1 class="leading-10">Tài khoản: {{ user.username }}</h1>
              <h1 class="leading-10">Tên người dùng: {{ user.fullName }}</h1>
              <h1 class="leading-10">Vai trò: {{ formatRole(user.role) }}</h1>
            </div>
          </div>
          <div class="mb-6">
            Bài viết của bạn
          </div>
        </div>
        <div v-if="state == 'edit'" class="w-full max-w-4xl mx-auto">
          <div class="bg-white shadow-xl rounded-xl p-6">
            <div class="flex justify-between">
              <h2 class="text-xl font-bold mb-4">Chỉnh sửa thông tin tài khoản</h2>
              <Button :config="{ label: 'Trở về', click: () => back() }"></Button>
            </div>
            <div class="mb-6">
              <InputField @input-change="setName" :value="user.username" title="Tài khoản" labelField="username">
              </InputField>
              <InputField @input-change="setFullName" :value="user.fullName" title="Tên người dùng"
                labelField="fullName">
              </InputField>
              <!-- <InputField @input-change="setPass" title="Mật khẩu" labelField="pass">
              </InputField> -->
              <InputField title="Vai trò" :value="user.role" labelField="role" :disabled="true"></InputField>
              <InputField @input-change="setAvatar" :value="user.avatar" title="Avatar" labelField="avatar">
              </InputField>
            </div>
            <div class="flex justify-end">
              <Button :config="{ label: 'Sửa', click: () => editAccount(user.id, user.role) }"></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputField from '@/components/Input/InputField.vue'
import { editUser } from '@/api/auth/api'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
  components: {
    InputField
  },
  data() {
    return {
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
    console.log(this.user)
  },
  methods: {
    setName(value) {
      this.userParam.username = value
    },
    setFullName(value) {
      this.userParam.fullname = value
    },
    // setPass(value) {
    //   this.userParam.password = value
    // },
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
    formatRole(role) {
      switch (role) {
        case 'ROLE_ADMIN':
          return 'Quản trị viên'
        case 'ROLE_USER':
          return 'Người dùng'
      }
    }
  }
}
</script>
