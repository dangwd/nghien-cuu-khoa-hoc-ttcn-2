<template>
  <div class="navbar bg-white fixed z-10">
    <div class="navbar-start flex gap-2 items-center">
      <router-link to="/"><img class="w-14 h-auto" src="../assets/img/logofita.png" alt="" />
      </router-link>
      <h1 class="gap-2 font-bold text-xl">FITA Forums</h1>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal mb-0 px-1 font-semibold text-base">
        <li><router-link to="/">Trang chủ</router-link></li>
        <li><router-link to="/document">Tài liệu</router-link></li>

        <li><router-link to="/news">Tin tức</router-link></li>
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
            <img
              src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/107627988_627898204486691_2843452311114633517_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=be3454&_nc_ohc=GDPiQ5IR610AX_fGLP8&_nc_ht=scontent.fhan17-1.fna&cb_e2o_trans=q&oh=00_AfA6d8GVMAWmShj1QhY86_20CW62yhL3FqggXKVk6ltplg&oe=65F17F28" />
          </div>
        </label>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li class="py-2 text-lg">Username</li>
          <li>
            <router-link to="/user-info">Tài khoản
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

const router = useRouter();

const logout = () => {
  localStorage.removeItem('vuex');
  localStorage.removeItem('token');
  router.push('/login')
}
</script>

<style lang=""></style>
