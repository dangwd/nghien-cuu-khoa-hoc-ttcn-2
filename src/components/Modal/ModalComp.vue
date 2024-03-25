<template>
  <label :for="modalIdProps" :class="customClass">
    {{ labelBtn }}
  </label>
  <input type="checkbox" :id="modalIdProps" class="modal-toggle" />
  <div class="modal" role="dialog">
    <div :class="'modal-box max-w-' + size">
      <h3 :class="['modalTitle', modalTitleClass]">
        <slot name="header"></slot>
      </h3>
      <p class="py-4">
        <slot name="content"></slot>
      </p>
      <p class="pt-4">
        <slot name="footer"></slot>
      </p>
      <div class="modal-action">
        <label :for="modalIdProps" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  customClass: {
    type: String,
    default: "btn "
  },
  btnModalColor: {
    type: String,
    default: ""
  },
  labelBtn: {
    type: String,
    default: ""
  },
  modalTitleClass: {
    type: String,
    default: ""
  },
  modalIdProps: {
    type: String,
    default: ""
  },
  size: {
    type: String,
    default: ""
  }
})
</script>

<style></style>