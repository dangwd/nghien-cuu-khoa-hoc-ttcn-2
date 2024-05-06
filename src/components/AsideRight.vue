<template>
  <aside class="bg-white border-l shadow-lg z-10 fixed h-full right-0 top-16 w-80">
    <div class="p-2 m-2 border-2 border-green-600 rounded-xl">
      <div class="p-2">
        <h1 class="text-lg font-semibold text-gray-700">Có thể bạn sẽ thích!</h1>
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
    </div>
  </aside>
</template>
<script setup>
import { ref } from "vue";

const itemsSide = ref([
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
  }, {
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

])
</script>