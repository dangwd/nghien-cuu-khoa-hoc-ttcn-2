<template>
  <div v-if="isLoading">
    <div class="flex items-center justify-center h-screen">
      <div class="rounded-md h-12 w-12 border-4 border-t-4 border-green-500 animate-spin absolute"></div>
    </div>
  </div>
  <div v-else>
    <AsideView></AsideView>
    <div class="max-w-3xl mx-auto">
      <div class="mt-2 bg-white rounded-xl border">
        <h1 class="text-base font-semibold mx-4 mt-4">Bộ lọc</h1>
        <div class="p-2">
          <div class="grid grid-cols-3 gap-2 px-4 pt-4 pb-3">
            <InputField type="select" title="Tên" :options="[]"></InputField>
            <InputField type="select" title="Người đăng" :options="[]"></InputField>
            <InputField type="select" title="Ngày đăng" :options="[]">
            </InputField>
          </div>
          <div class="flex justify-end">
            <Button btnClass="bg-green-600 hover:bg-green-700 text-white mx-3 text-sm font-semibold mb-2"
              :config="{ label: 'Xác nhận', click: () => fetchAllSubject() }"></Button>
          </div>
        </div>
      </div>
    </div>
    <aside-right />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const isLoading = ref(false)
</script>
<style></style>