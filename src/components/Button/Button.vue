<template>
  <div>
    <button @click="config.click()" class="rounded-lg text-sm px-4 py-2" :class="btnClass">
      <span :class="config.labelClass">{{ config.label }}</span>
    </button>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Button",
  props: {
    btnClass: {
      type: String,
      default: "bg-blue-700 text-white"
    },
    config: {
      label: "",
      labelClass: "",
      click() { }
    }
  }
}
</script>
<style></style>