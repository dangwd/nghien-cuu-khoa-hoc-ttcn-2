<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-bold text-gray-700 dark:text-white">
        <img class="w-8 h-8 mr-2" src="../../../assets/img/vnua-logo.jpg" alt="logo">
        VNUA Forums
      </a>
      <div
        class="w-full bg-white rounded-xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-700 md:text-2xl dark:text-white">
            Quên mật khẩu
          </h1>
          <form @submit.prevent="sendMail" class="space-y-4 md:space-y-6" action="#">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Tài khoản</label>
              <input v-model="email" id="email"
                class="bg-gray-50 border border-gray-300 text-gray-700 sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com" required="">
            </div>

            <button type="submit"
              class="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Gửi</button>

            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Chưa có tài khoản? <router-link to="/signup"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng ký ngay!</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { remindPass } from '@/api/auth/api'

export default {
  data() {
    return {
      email: ""
    }
  },
  methods: {
    async sendMail() {
      try {
        if (this.email !== "") {
          await remindPass(this.email).then((res) => {
            console.log(res)
          })
        } else {
          console.log("Trường đang trống")
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>


<style scope></style>