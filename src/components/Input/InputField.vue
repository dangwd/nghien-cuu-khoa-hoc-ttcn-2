<template>
  <div :class="styleClass">
    <!-- Select Option -->
    <div v-if="type == 'select'">
      <label :for="labelField" class="block mb-2 text-sm font-semibold text-gray-700">{{ title
        }}</label>
      <select v-model="selected" :id="labelField" @select-change="$emit('select-change', selected)"
        class="bg-gray-50 border border-gray-300 text-gray-700 text-base rounded-xl focus:ring-green-700 focus:border-green-700 block w-full p-1.5 transition ease-in-out duration-150">
        <option :value="opt.value" v-for="(opt, index) in options" :key="index">{{ opt.text }}</option>
      </select>
    </div>
    <div v-else-if="type == 'select-name'">
      <label :for="labelField" class="block mb-2 text-sm font-semibold text-gray-700 dark:text-white">{{ title
        }}</label>
      <select v-model="selected" :id="labelField" @select-change="$emit('select-change', selected)"
        class="bg-gray-50 border border-gray-300 text-gray-700 text-base rounded-lg focus:ring-green-700 focus:border-green-700 block w-full p-1.5 transition ease-in-out duration-150">
        <option :value="opt.id" v-for="(opt, index) in options" :key="index">{{ opt.name }}</option>
      </select>
    </div>
    <!-- Input file -->
    <div v-else-if="type == 'file'">
      <div class="flex items-center justify-center w-full py-2">
        <label :for="labelField"
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 20 16">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p class="mb-2 text-sm text-gray-500 "><span class="font-semibold">Click to
                upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          <input @change="handleFileChange" :id="labelField" type="file" class="opacity-0" />
        </label>
      </div>
    </div>
    <div v-else-if="type == 'file-input'">
      <label class="block mb-2 text-sm font-semibold text-gray-700" :for="labelField">
        {{ title }}</label>
      <input @change="handleFileChange"
        class="block w-full text-xs text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
        :id="labelField" type="file">
    </div>
    <div v-else-if="type == 'ckeditor'">
      <ckeditor @input="inputChange" :editor="editor" v-model="valueText"></ckeditor>
    </div>
    <div v-else-if="type == 'custom-input'">
      <label :for="labelField" class="block text-sm font-semibold text-gray-700">{{ title }}</label>
      <input @input="inputChange" :placeholder="placeholder" v-model="valueText" :type="typeInput" :id="labelField"
        :disabled="disabled" :class="customClass" required />
    </div>
    <!-- Input -->
    <div v-else>
      <label :for="labelField" class="block mb-2 text-sm font-semibold text-gray-700">{{ title }}</label>
      <input @input="inputChange" :placeholder="placeholder" v-model="valueText" :type="typeInput" :id="labelField"
        :disabled="disabled"
        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-green-700 focus:border-green-700 transition ease-in-out duration-150 focus:ring-1 block w-full p-2"
        required />
    </div>
  </div>
</template>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  data() {
    return {
      valueText: this.value,
      editor: ClassicEditor,
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
    placeholder: {
      type: String,
      default: ""
    },
    options: {
      type: [Array, Object],
      required: false
    },
    customClass: {
      type: String,
      default: "shadow-sm bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
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
    },
    handleFileChange(event) {
      this.$emit('input-file', event.target.files[0])
    }
  }
}
</script>
<style></style>