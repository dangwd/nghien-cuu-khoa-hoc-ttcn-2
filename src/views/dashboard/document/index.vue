<template>
  <h1 class="p-3 font-bold text-xl">Quản lý tài liệu</h1>

  <a-table :dataSource="dataSource" :columns="columns" />
</template>
<script>
export default {
  setup() {
    return {
      dataSource: [
        {
          key: '1',
          name: 'Đăng',
          age: 20,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ],

      columns: [
        {
          title: 'STT',
          dataIndex: 'key',
          key: 'key'
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
      ],
    };
  },
};
</script>