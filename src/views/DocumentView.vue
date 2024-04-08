<template>
  <div class="max-w-4xl mx-auto">
    <AsideView></AsideView>
    <h1>Tài liệu</h1>

  </div>
</template>
<script>
import AsideView from '@/components/AsideView.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
  components: {
    AsideView,
  },
  data() {
    return {
      editor: ClassicEditor,
    };
  }
}
</script>
<style></style>