<template>
  <div>
    <div class="relative overflow-auto h-full shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-sm text-gray-700 bg-gray-50 whitespace-nowrap">
          <tr>
            <th class="w-4 p-4" v-for="(header, index) in headers" :key="index">{{ header }}</th>
          </tr>
        </thead>
        <tbody class="whitespace-nowrap">
          <slot></slot>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
defineProps({
  headers: {
    type: Array,
    required: true
  }
})
</script>
<style></style>