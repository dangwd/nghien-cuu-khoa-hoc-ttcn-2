<template>

  <div>
    <div v-show="!isSidebarOpen">
      <button @click="toggleSidebar" class="fixed top-24 left-1 z-50">
        <i class='bx bx-chevron-right text-2xl font-bold'></i>
      </button>
    </div>
    <aside id="default-sidebar" class="fixed top-16 left-0 z-40 lg:w-72 h-screen transition-transform"
      :class="{ '-translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen }" aria-label="Sidebar">
      <div class="h-full px-3 py-4 overflow-y-auto bg-white shadow-lg">
        <div class="flex justify-between items-center py-3">
          <h1 class="text-lg font-semibold text-gray-700">#Hastag</h1>
          <div v-show="isSidebarOpen">
            <button @click="toggleSidebar">
              <i class='bx bx-chevron-left text-2xl font-bold'></i>
            </button>
          </div>
        </div>
        <ul v-for="(item, index) in itemsSide" :key="index" class="space-y-2 font-medium">
          <li>
            <a href="#"
              class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <span><i class='bx bx-message-square-dots text-lg font-semibold'></i></span>
              <span class="flex-1 ms-3 whitespace-nowrap">{{ item.name }}</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isSidebarOpen: false,
      itemsSide: [
        {
          name: "Top"
        },
        {
          name: "Nên học ngôn ngữ nào ?"
        },
        {
          name: "Top công nghệ năm 2024"
        },
        {
          name: "Nên học IT không ?"
        },
        {
          name: "Project Demo 2024"
        },
      ]
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  },
}
</script>
<style></style>