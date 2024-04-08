<template>
  <div>
    <button @click="showModal">
      <slot name="image"></slot>
    </button>
    <div v-if="isModalVisible" class="fixed inset-0 flex items-center justify-center">
      <div class="fixed inset-0 bg-black opacity-50"></div>
      <!-- Nội dung ảnh -->
      <div class="p-8 max-w-md rounded-lg z-50">
        <slot name="detail"></slot>
        <!-- Nút để đóng modal -->
        <button @click="hideModal" class="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Đóng
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isModalVisible: false,
      selectedImage: "" // Đường dẫn ảnh mặc định, bạn có thể thay đổi
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    hideModal() {
      this.isModalVisible = false;
    }
  }
};
</script>
