<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="flex items-center -space-x-px h-8 text-sm">
        <li :class="{ disabled: currentPage === 1 }">
          <a href="#" @click.prevent="emitPageChange(currentPage - 1)"
            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
            <span class="sr-only">Previous</span>
            <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 1 1 5l4 4" />
            </svg>
          </a>
        </li>
        <li v-for="(page, index) in totalPages" :key="index" :class="{ active: currentPage === page }">
          <a href="#" @click.prevent="emitPageChange(page)"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">{{
          page }}</a>
        </li>
        <li :class="{ disabled: currentPage === totalPages }">
          <a href="#" @click.prevent="emitPageChange(currentPage + 1)"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
            <span class="sr-only">Next</span>
            <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 9 4-4-4-4" />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  methods: {
    emitPageChange(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('update:currentPage', page);
      }
    }
  }
}
</script>
<style></style>