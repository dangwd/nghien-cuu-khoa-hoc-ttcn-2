<template>
  <div :class="styleClass">
    <label :for="labelField" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ title }}</label>
    <input @input="inputChange" v-model="valueText" :type="typeInput" :id="labelField"
      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      required />
  </div>
</template>
<script>
export default {
  data() {
    return {
      valueText: this.value
    }
  },
  props: {
    styleClass: {
      type: String,
      default: ""
    },
    labelField: {
      type: String,
      default: ""
    },
    typeInput: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  methods: {
    inputChange() {
      this.$emit('input-change', this.valueText)
    }
  }
}
</script>
<style></style>