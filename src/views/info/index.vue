<template>
  <div>
    <div class="card w-full bg-base-100 shadow-xl">
      <div class="flex">
        <figure class="px-10 py-10">
          <img :src="user.avatar" class="rounded-full w-40" />
        </figure>
        <div class="card-body leading-5">
          <h2 class="card-title">Thông tin tài khoản</h2>
          <p>Tên tài khoản: {{ user.username }}</p>
          <p>Họ tên: {{ user.fullName }}</p>
          <p>Vai trò: {{ formatRole(user.role) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  mounted() {
    console.log(this.user)
  },
  methods: {
    formatRole(role) {
      switch (role) {
        case 'ROLE_ADMIN':
          return 'Quản trị viên'
        case 'ROLE_USER':
          return 'Người dùng'
      }
    }
  }
}
</script>
