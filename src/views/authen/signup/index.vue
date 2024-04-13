<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-8 h-8 mr-2" src="../../../assets/img/vnua-logo.jpg" alt="logo">
        VNUA Forums
      </a>
      <div
        class="w-full bg-white rounded-xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Đăng ký tài khoản ngay!
          </h1>
          <form @submit.prevent="signup" class="space-y-4 md:space-y-6" action="#">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tài khoản</label>
              <input v-model="username" id="email" type="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2">
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật
                khẩu</label>
              <input v-model="password" type="password" name="password" id="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2">
            </div>
            <div>
              <label for="fullName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên người
                dùng</label>
              <input v-model="fullName" id="fullName"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2">
            </div>
            <div class="flex items-center justify-between">
              <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Quên mật
                khẩu?</a>
            </div>
            <button type="submit"
              class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign
              in</button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Đã có tài khoản? <router-link to="/login"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng nhập ngay!</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { signup as SignupAPI } from '../../../api/auth/api'
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const fullName = ref('');

const signup = async () => {
  try {
    const response = await SignupAPI(username.value, password.value, fullName.value);
    localStorage.setItem('token', response.data.token);
    router.push('/')
  } catch (error) {
    console.log(error)
  }
}
</script>

<style></style>