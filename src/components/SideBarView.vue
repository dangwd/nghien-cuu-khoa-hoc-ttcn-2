<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center">

    </div>
    <div class="drawer-side">
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay overflow-y-hidden"></label>
      <ul class="menu p-6 w-80 h-full bg-base-200 text-base-content">
        <!-- Sidebar content here -->
        <li><router-link to="/homepage">Trang chủ</router-link></li>
        <li><router-link to="/document">Tài liệu</router-link></li>
      </ul>

    </div>
  </div>
</template>
<script setup>

</script>