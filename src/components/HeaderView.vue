<template>
  <div class="navbar bg-white fixed shadow z-50">
    <div class="navbar-start flex gap-2 items-center">
      <router-link to="/"><img class="w-14 h-auto" src="../assets/img/vnua-logo.jpg" alt="" />
      </router-link>
      <h1 class="gap-2 font-bold text-xl text-green-700">VNUA Forums</h1>
    </div>
    <div class="navbar-center mx-auto hidden lg:flex">
      <div class="flex items-center gap-2">
        <InputField :value="searchQuery" @input-change="setSearch" type="custom-input"
          customClass="shadow-sm bg-gray-100 border border-gray-200 text-gray-700 text-sm rounded-xl focus:outline-none focus:ring-green-700 focus:border-green-700 focus:ring-1 transition ease-in-out duration-150 focus:text-green-700  block w-[670px] p-2 my-2"
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
        <ul tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-72 border">
          <li class="py-2 text-lg items-center border-b mb-2">
            <router-link to="/user-info" class="w-full p-2 bg-gray-100 rounded-lg flex border-2">
              <div>
                <img class="w-10 rounded-full" :src="avatar" />
              </div>
              <h1 class="text-sm font-semibold text-gray-700">{{ fullName }}</h1>
            </router-link>
          </li>
          <li v-if="userRole == 'ROLE_ADMIN'">
            <router-link to="/users-manager">
              <h1 class="text-sm text-gray-700 font-semibold">Dashboard</h1>
            </router-link>
          </li>
          <li>
            <router-link to="/saved-documents">
              <h1 class="text-sm text-gray-700 font-semibold">Tài liệu đã lưu</h1>
            </router-link>
          </li>
          <li><button class="text-sm text-gray-700 font-semibold" @click="logout">Đăng xuất</button></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
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
const search = async () => {
  if (searchQuery.value) {
    router.push({ path: '/search', query: { q: searchQuery.value } })

  } else {
    showMessage()
  }
}
const logout = () => {
  localStorage.removeItem('vuex');
  localStorage.removeItem('token');
  router.push('/login')
}
const showMessage = () => {
  toast.info("Nhập thông tin cần tìm kiếm!")
}
</script>

<style lang=""></style>
