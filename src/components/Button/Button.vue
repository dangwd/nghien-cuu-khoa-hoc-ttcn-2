<template>
  <div v-if="btnIcon == 'default'">
    <button @click="config.click()" class="rounded-lg text-sm px-4 py-2" :class="btnClass">
      <span :class="config.labelClass">{{ config.label }}</span>
    </button>
  </div>
  <div v-if="btnIcon == 'icon'">
    <button @click="config.click()" class="rounded-lg text-sm px-4 py-2" :class="btnClass">
      <span :class="config.labelClass"><i :class="iconBtnClass"></i> {{ config.label }}</span>
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
    btnIcon: {
      type: String,
      default: "default"
    },
    iconBtnClass: {
      type: String,
      default: 'bx bxs-cog'
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