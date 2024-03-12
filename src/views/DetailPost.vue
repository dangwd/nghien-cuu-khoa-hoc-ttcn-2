<template >
  <div>
    <div>
      <h1 class="text-xl font-bold text-left">Chi tiết bài đăng</h1>
    </div>

    <div class="py-5">
      <div data-aos="fade-right" class="card w-full bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex items-center gap-6">
            <div class="avatar">
              <div class="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/107627988_627898204486691_2843452311114633517_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=be3454&_nc_ohc=GDPiQ5IR610AX_fGLP8&_nc_ht=scontent.fhan17-1.fna&cb_e2o_trans=q&oh=00_AfA6d8GVMAWmShj1QhY86_20CW62yhL3FqggXKVk6ltplg&oe=65F17F28" />
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
            <p class="text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias blanditiis saepe,
              consequatur libero
              sapiente, sit, architecto dolor odit reprehenderit iste voluptatem ratione! Possimus dolor sint pariatur
              odit cum commodi temporibus.</p>
            <p class="text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias blanditiis saepe,
              consequatur libero
              sapiente, sit, architecto dolor odit reprehenderit iste voluptatem ratione! Possimus dolor sint pariatur
              odit cum commodi temporibus.
            </p>
            <p class="text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias blanditiis saepe,
              consequatur libero
              sapiente, sit, architecto dolor odit reprehenderit iste voluptatem ratione! Possimus dolor sint pariatur
              odit cum commodi temporibus.
            </p>
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