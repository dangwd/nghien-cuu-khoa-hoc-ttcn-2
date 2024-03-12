<template>
  <div>
    <div class="card w-full bg-base-100 shadow-xl">
      <div class="flex">
        <figure class="px-10 py-10">
          <img
            src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/107627988_627898204486691_2843452311114633517_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEPmq-AmACO7k8344tVHE6ODPvpF2PK1LMM--kXY8rUswKPXUt4LE5ZFgFu7Jr48RJYQoqgQMLDtGswyZFtL-_T&_nc_ohc=sX9vLLnnBDoAX9e96M5&_nc_ht=scontent.fhan17-1.fna&cb_e2o_trans=q&oh=00_AfCOvXFd1zKQACsvLN9HBXvBmUcSlXQJJvPKSRhaUD2dPA&oe=6613C628"
            class="rounded-full w-40" />
        </figure>
        <div class="card-body leading-5">
          <h2 class="card-title">Thông tin tài khoản</h2>
          <p>Username: {{ user.username }}</p>
          <p>Họ tên: {{ user.fullName }}</p>
          <p>Vai trò: {{ user.role }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    const user = computed(() => store.state.user)
    console.log(user.value)
    return { user }
  }
}
</script>