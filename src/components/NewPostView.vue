<template>
  <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="avatar">
        <div class="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img :src="avatarUrl" />
        </div>

      </div>
      <div>
        <h1 class="text-center text-gray-400">Bạn đang nghĩ gì...</h1>
      </div>
      <div class="card-actions justify-end">
        <ModalComp labelBtn="Tạo mới" :modalIdProps="'new-post-modal'" :size="'2xl'"
          :modalTitleClass="'font-bold text-lg'">

          <template #header>
            <h1 class="text-left">Đăng bài</h1>
          </template>

          <template #content>
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Tiêu đề bài viết</span>
              </div>
              <input type="text" class="input input-bordered border-gray-300 w-full rounded-lg" />
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

<script>
export default {
  computed: {
    avatarUrl() {
      const dataLocal = localStorage.getItem('vuex');
      const parsedData = JSON.parse(dataLocal);
      const avatar = parsedData.user.avatar
      return avatar
    }
  }
}

</script>

<style></style>