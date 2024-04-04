<template>
  <div class="w-[1000px] mx-auto">
    <div>
      <h1 class="text-xl font-bold text-left">Chi tiết bài đăng</h1>
    </div>

    <div class="py-5">
      <div data-aos="fade-right" class="card w-full bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex items-center gap-6">
            <div class="avatar">
              <div class="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="" />
              </div>

            </div>
            <div>
              <h1>Username</h1>
            </div>
          </div>
          <div class="flex items-center py-2">
            <div class="badge badge-primary">#code</div>
            <div class="badge badge-accent">#vscode</div>
          </div>
          <div class="py-5 leading-10">
            <h1 class="text-left">Best theme for VSCode...</h1>
            <p class="text-left"></p>
            <div>
              <img class="rounded-lg"
                src="https://mevn-public.s3-ap-southeast-1.amazonaws.com/marketenterprise.vn/wp-images/2021/04/06170614/vuejs.png"
                alt="">
            </div>
          </div>
          <!-- <div class="card-actions justify-end">
            <button class="btn btn-primary rounded-full">Đăng bài</button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import AOS from 'aos'
import { onMounted } from 'vue'
onMounted(async () => {
  AOS.init()
})
</script>
<style></style>