<template>
  <div class="navbar bg-white fixed z-50">
    <div class="navbar-start flex gap-2 items-center">
      <router-link to="/"><img class="w-14 h-auto" src="../assets/img/logofita.png" alt="" />
      </router-link>
      <h1 class="gap-2 font-bold text-xl">FITA Forums</h1>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal mb-0 px-1 font-semibold text-base">
        <li><router-link to="/">Trang chủ</router-link></li>
        <li><router-link to="/document">Tài liệu</router-link></li>

        <li><router-link to="/news">Danh mục</router-link></li>
        <li>
          <router-link to="/notification">Thông báo</router-link>
        </li>

        <li>
          <router-link to="/introduce">Giới thiệu chung</router-link>
        </li>

      </ul>
    </div>
    <div class="navbar-end">
      <input type="search" placeholder="Tìm kiếm..." class="input input-bordered rounded-full w-80 max-w-xs mx-2" />
      <!-- User button -->
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img :src="avatar" />
          </div>
        </label>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li class="py-2 text-lg items-center">{{ fullName }}</li>
          <li>
            <router-link to="/user-info">Tài khoản
            </router-link>
          </li>
          <li v-if="userRole == 'ROLE_ADMIN'">
            <router-link to="/user-account">Dashboard
            </router-link>
          </li>
          <li><button @click="logout">Đăng xuất</button></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';
const router = useRouter();
const userRole = computed(() => {
  const vuexData = JSON.parse(localStorage.getItem('vuex'));

  return vuexData.user.role;
});
const fullName = computed(() => {
  const vuexData = JSON.parse(localStorage.getItem('vuex'));

  return vuexData.user.fullName;
});
const avatar = computed(() => {
  const vuexData = JSON.parse(localStorage.getItem('vuex'));

  return vuexData.user.avatar;
});
const logout = () => {
  localStorage.removeItem('vuex');
  localStorage.removeItem('token');
  router.push('/login')
}
</script>

<style lang=""></style>
