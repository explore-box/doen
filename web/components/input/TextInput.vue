<!-- the text type of input -->
<!-- using to catch and define the input for string text -->

<template>
  <div class="flex group flex-col w-full" :class="class">
    <label
      :for="`${name}-input`"
      v-show="label"
      class="flex text-[15px] font-medium text-gray-600 mb-3 ml-3"
      >{{ label }}</label
    >
    <div
      class="flex items-center gap-0 bg-gray-50 h-[60px] rounded-[20px] px-5 border-2 border-transparent focus-within:border-brand-pink transition-all duration-300"
    >
      <i v-show="preIcon" class="text-lg" :class="preIcon"></i>
      <input
        :id="`${name}-input`"
        :name="name"
        type="text"
        v-model="value"
        :placeholder="placeholder"
        class="flex flex-1 text-[17px] placeholder:text-base placeholder:text-gray-500 bg-transparent border-transparent ring-transparent focus:border-transparent focus:ring-transparent"
      />
    </div>
    <span
      v-show="errorMessage"
      class="flex ml-3 text-base text-red-600 w-10/12 mt-4 leading-normal"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

interface TextInputProps {
  name: string
  label?: string
  placeholder?: string
  value?: any
  preIcon?: string
  class?: string
}

const props = defineProps<TextInputProps>()
const { errorMessage, value } = useField(() => props.name)
</script>
