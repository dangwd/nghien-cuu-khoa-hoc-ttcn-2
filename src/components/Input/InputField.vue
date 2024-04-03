<template>
  <div :class="styleClass">
    <!-- Select Option -->
    <div v-if="type == 'select'">
      <label :for="labelField" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ title }}</label>
      <select v-model="selected" :id="labelField" @select-change="$emit('select-change', selected)"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        <option :value="opt.value" v-for="(opt, index) in options" :key="index">{{ opt.text }}</option>
      </select>
    </div>

    <!-- Input -->
    <div v-else>
      <label :for="labelField" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ title }}</label>
      <input @input="inputChange" v-model="valueText" :type="typeInput" :id="labelField" :disabled="disabled"
        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        required />
    </div>
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
    disabled: {
      type: Boolean,
      default: false
    },
    labelField: {
      type: String,
      default: ""
    },
    value: {
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
    },
    type: {
      type: String,
    },
    options: {
      type: Array,
      required: false
    }
  },
  computed: {
    selected: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('select-change', value)
      }
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