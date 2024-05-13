<template>
  <div class="card">
    <DataTable v-model="size" :options="sizeOptions" showGridlines :value="customers" paginator :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
      <Column field="name" header="Name" style="width: 25%"></Column>
      <Column field="country.name" header="Country" style="width: 25%"></Column>
      <Column field="company" header="Company" style="width: 25%"></Column>
      <Column field="company" header="Company" style="width: 25%"></Column>
      <Column field="representative.name" header="Representative" style="width: 25%"></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
const size = ref({ label: 'Small', value: 'null' });
const sizeOptions = ref([
  { label: 'Small', value: 'small' },
  { label: 'Normal', value: 'null' },
  { label: 'Large', value: 'large' }
]);
const customers = ref([
  {
    id: 1000,
    name: 'James Butt',
    country: {
      name: 'Algeria',
      code: 'dz'
    },
    company: 'Benton, John B Jr',
    date: '2015-09-13',
    status: 'unqualified',
    verified: true,
    activity: 17,
    representative: {
      name: 'Ioni Bowcher',
      image: 'ionibowcher.png'
    },
    balance: 70663
  },
  {
    id: 1000,
    name: 'James Butt',
    country: {
      name: 'Algeria',
      code: 'dz'
    },
    company: 'Benton, John B Jr',
    date: '2015-09-13',
    status: 'unqualified',
    verified: true,
    activity: 17,
    representative: {
      name: 'Ioni Bowcher',
      image: 'ionibowcher.png'
    },
    balance: 70663
  },
  {
    id: 1000,
    name: 'James Butt',
    country: {
      name: 'Algeria',
      code: 'dz'
    },
    company: 'Benton, John B Jr',
    date: '2015-09-13',
    status: 'unqualified',
    verified: true,
    activity: 17,
    representative: {
      name: 'Ioni Bowcher',
      image: 'ionibowcher.png'
    },
    balance: 70663
  },
]);

</script>
