<template>
  <div>
    <TabView>
      <TabPanel header="Khoa">
        <div>
          <div class="flex justify-between mb-2">
            <div class="flex">
              <InputText v-model="searchQuery" placeholder="Tìm kiếm" size="small"
                class="border-gray-300 rounded-l-lg rounded-r-none">
              </InputText>
              <Button icon="pi pi-search"
                class="text-white bg-green-600 hover:bg-green-700 text-sm border-none rounded-none rounded-r-lg"
                @click="fetchAllNoti()" />
            </div>
            <Button icon="pi pi-plus" class="text-white bg-green-600 hover:bg-green-700 text-sm border-none"
              label="Tạo khoa" @click="openDialog" />
          </div>
          <DataTable class="text-sm" size="small" showGridlines :value="Department" tableStyle="min-width: 50rem">
            <Column header="STT">
              <template #body="{ index }">
                {{ index + 1 }}
              </template>
            </Column>
            <Column field="id" header="ID"></Column>
            <Column field="dptCode" header="Mã Khoa"></Column>
            <Column field="dptName" header="Tên Khoa"></Column>
            <Column header="Thao tác">
              <template #body>
                <div>
                  Thao tác
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </TabPanel>
      <TabPanel header="Ngành">
        <p class="m-0">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
          aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          Nemo enim
          ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
          ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
        </p>
      </TabPanel>
      <TabPanel header="Bộ môn">
        <p class="m-0">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
          atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
          sunt in culpa qui
          officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
        </p>
      </TabPanel>
    </TabView>


    <!-- Create -->
    <Dialog v-model:visible="createModal" modal header="Thêm khoa" :style="{ width: '700px' }">
      <div class="grid">

      </div>
      <div class="pt-4 flex justify-end">
        <Button class="text-white bg-green-600 hover:bg-green-700 p-1 text-sm border-none" label="Tạo mới"
          @click="createNoti()" />
      </div>
    </Dialog>
  </div>
</template>
<script setup>
import Button from 'primevue/button';
import { ref } from 'vue';
const createModal = ref(false)
const Department = ref([
  {
    id: 1,
    dptCode: "CNTT",
    dptName: "Công nghệ thông tin"
  }
])
const searchQuery = ref("")
const openDialog = () => {
  createModal.value = true
}


</script>
<style></style>