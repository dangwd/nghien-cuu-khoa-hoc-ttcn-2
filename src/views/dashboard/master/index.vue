<template>
  <a-layout class="layout">
    <a-layout-header class="flex gap-28">
      <div class="logo w-14 rounded-full flex my-2 items-center justify-center">
        <img src="../../../assets/img/logofita.png" alt="Logo" class="rounded-full" />
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" class="h-16 ml-20 w-full">
        <a-menu-item key="1"><router-link to="/user-account">Quản lý tài khoản</router-link></a-menu-item>
        <a-menu-item key="2"><router-link to="/document-manage">Quản lý tài liệu</router-link></a-menu-item>
        <a-menu-item key="3"><router-link to="/post-manage">Quản lý bài viết</router-link></a-menu-item>
        <a-menu-item key="4"><router-link to="/category">Quản lý danh mục</router-link></a-menu-item>
        <a-menu-item key="5"><router-link to="/">Trang người dùng</router-link></a-menu-item>
      </a-menu>
      <a-space>
      </a-space>

    </a-layout-header>
    <a-layout-content>
      <div class="bg-white px-24 py-10">
        <router-view />
      </div>
    </a-layout-content>

  </a-layout>
</template>

<script setup>
import { ref } from 'vue';
const selectedKeys = ref(['1']);
</script>
