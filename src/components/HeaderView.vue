<template>
  <div class="navbar bg-white fixed z-50">
    <div class="navbar-start flex gap-2 items-center">
      <router-link to="/"><img class="w-14 h-auto" src="../assets/img/vnua-logo.jpg" alt="" />
      </router-link>
      <h1 class="gap-2 font-bold text-xl">VNUA Forums</h1>
    </div>
    <div class="navbar-center mx-auto hidden lg:flex">
      <div class="flex items-center gap-2">
        <InputField :value="searchQuery" @input-change="setSearch" type="custom-input"
          customClass="shadow-sm bg-gray-100 border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-[800px] p-2 my-2"
          placeholder="Tìm kiếm...">
        </InputField>
        <Button btnIcon="icon" iconBtnClass="bx bx-search" btnClass="bg-green-600 text-white hover:bg-green-700"
          :config="{ click: () => search() }"></Button>
      </div>
    </div>
    <div class="navbar-end">

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
import { computed, ref } from 'vue';
const router = useRouter();

const searchQuery = ref("")
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
const setSearch = (value) => {
  searchQuery.value = value
}
const search = () => {
  if (searchQuery.value) {
    router.push({ path: '/search', query: { q: searchQuery.value } })
  }
}
const logout = () => {
  localStorage.removeItem('vuex');
  localStorage.removeItem('token');
  router.push('/login')
}
</script>

<style lang=""></style>
