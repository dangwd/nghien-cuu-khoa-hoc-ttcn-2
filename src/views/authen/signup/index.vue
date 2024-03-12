<template>
  <div>
    <div class="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
      style="background-image:url('https://file.vnua.edu.vn/data/0/images/2021/07/28/host/hvnn1.jpg')">
      <div class="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div class="text-white ">
          <div class="mb-8 flex flex-col items-center">
            <img class="rounded-full"
              src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/304756254_487612366707185_4561804736481986794_n.png?_nc_cat=105&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=z9ujKJ8yMEUAX-gbpy_&_nc_ht=scontent.fhan17-1.fna&cb_e2o_trans=q&oh=00_AfDpj46OLtBRPyOb38aToeSXN_7XbXCmoKSaReVc-aAs4g&oe=65E8F240"
              width="150" />
            <h1 class="mb-2 text-2xl text-white">Forums FITA</h1>
            <span class="text-gray-300">Đăng ký tài khoản</span>
          </div>
          <form @submit.prevent="signup">
            <div class="mb-4 text-lg">
              <input v-model="username"
                class="rounded-3xl border-none bg-base-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="text" name="name" placeholder="id@email.com" />
            </div>
            <div class="mb-4 text-lg">
              <input v-model="password"
                class="rounded-3xl border-none bg-base-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="Password" name="name" placeholder="*********" />
            </div>
            <div class="mb-4 text-lg">
              <input v-model="fullName"
                class="rounded-3xl border-none bg-base-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="text" name="name" placeholder="Nguyen Van A" />
            </div>
            <div class="mt-8 flex justify-center text-lg text-black">
              <button type="submit"
                class="rounded-3xl bg-base-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-gray-600">Đăng
                ký</button>
            </div>
            <div class="py-5 items-center">
              <h1 class="text-white">Đã có tài khoản? <router-link class="hover:text-blue-300" to="/login"> Đăng nhập
                  ngay
                  !</router-link></h1>
            </div>
          </form>

        </div>
      </div>
    </div>
  </div>
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