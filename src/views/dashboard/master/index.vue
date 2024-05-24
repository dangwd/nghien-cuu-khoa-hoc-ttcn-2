<template>
  <nav class="w-full fixed top-0 mx-auto bg-green-600 border-b h-16 block z-10">

  </nav>
  <div class="flex">
    <div class="z-50 flex justify-center h-full max-h-[100vh] fixed top-0 left-0 w-72">
      <Menu :model="items" class="w-full md:w-[15rem]">
        <template #start>
          <span class="inline-flex items-center gap-1 px-2 py-2 w-full sm:w-[15rem]">
            <div class="w-10 h-10">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/06/13015673_10153943477900239_794210601335532414_nsdfsf.jpg"
                alt="">
            </div>
            <span class="text-green-700 font-bold text-xl">VNUA Dashboard</span>
          </span>
        </template>
        <template #submenuheader="{ item }">
          <span class="text-green-700 font-bold leading-none">{{ item.label }}</span>
        </template>
        <template #item="{ item, props }">
          <router-link :to="'/' + item.url" v-ripple class="flex items-center text-base font-semibold"
            v-bind="props.action">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
            <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
          </router-link>
        </template>
        <template #end>
          <button v-ripple
            class="relative overflow-hidden w-full p-link flex items-center p-2 pl-3 text-surface-700 dark:text-surface-0/80 hover:bg-surface-200 rounded-none">
            <Avatar :image="user.avatar" class="mr-2" shape="circle" />
            <span class="inline-flex flex-col justify-start text-left">
              <span class="font-bold">{{ user.fullName }}</span>
              <span class="text-sm">{{ formatRole(user.role) }}</span>
            </span>
          </button>
        </template>
      </Menu>
    </div>
    <div class="h-screen ml-72 w-full mt-16">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import store from "@/store";
import Avatar from "primevue/avatar";
import Badge from "primevue/badge";
const items = ref([
  {
    separator: true
  },
  {
    label: 'Chức năng chính',
    items: [
      {
        label: 'Quản lý tài khoản',
        icon: 'pi pi-user',
        url: 'users-manager'
      },
      {
        label: 'Quản lý bài viết',
        icon: 'pi pi-file',
        url: 'post-manage'
      },
      {
        label: 'Quản lý tài liệu',
        icon: 'pi pi-folder',
        url: 'document-manage'
      },
      {
        label: 'Quản lý thông báo',
        icon: 'pi pi-bell',
        url: 'noti'
      },
      {
        label: 'Quản lý danh mục',
        icon: 'pi pi-list',
        url: 'category'
      },
      {
        label: 'Quản lý Khoa-Ngành',
        icon: 'pi pi-sitemap',
        url: 'department'
      },

    ]
  },
  {
    label: 'Thông tin tài khoản',
    items: [
      {
        label: 'Trang chủ',
        icon: 'pi pi-home',
        url: "homepage"
      },
      {
        label: 'Phản hồi',
        icon: 'pi pi-inbox',
        badge: 2
      },
      {
        label: 'Đăng xuất',
        icon: 'pi pi-sign-out',
      }
    ]
  },
  {
    separator: true
  }
]);
const user = computed(() => {
  return store.state.user
})
const formatRole = (role) => {
  switch (role) {
    case 'ROLE_ADMIN':
      return 'Quản trị viên'
    case 'ROLE_USER':
      return 'Người dùng'
  }
}
const logOut = () => {

}
</script>
