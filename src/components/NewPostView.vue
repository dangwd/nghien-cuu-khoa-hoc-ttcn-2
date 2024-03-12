<template>
  <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="avatar">
        <div class="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img
            src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/107627988_627898204486691_2843452311114633517_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=be3454&_nc_ohc=GDPiQ5IR610AX_fGLP8&_nc_ht=scontent.fhan17-1.fna&cb_e2o_trans=q&oh=00_AfA6d8GVMAWmShj1QhY86_20CW62yhL3FqggXKVk6ltplg&oe=65F17F28" />
        </div>

      </div>
      <div>
        <h1 class="text-center text-gray-400">Bạn đang nghĩ gì...</h1>
      </div>
      <div class="card-actions justify-end">
        <ModalComp labelBtn="Đăng bài" :modalIdProps="'new-post-modal'" :size="'2xl'"
          :modalTitleClass="'font-bold text-lg'">
          <template #btn>
            <h1 class="items center m-0">Đăng bài</h1>
          </template>

          <template #header>
            <h1 class="text-left">Đăng bài</h1>
          </template>

          <template #content>
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Tiêu đề bài viết</span>
              </div>
              <input type="text" class="input input-bordered w-full" />
            </label>
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Nội dung bài viết</span>
              </div>
              <textarea class="textarea textarea-bordered w-full"></textarea>
            </label>
          </template>

          <template #footer>
            <div class="flex justify-end gap-2">
              <button class="btn">Đăng bài</button>
            </div>
          </template>
        </ModalComp>
      </div>
    </div>
  </div>
</template>

<script setup>


</script>

<style></style>