<template>
  <form :class="class" @submit.prevent="onSubmit">
    <slot>Your form</slot>
  </form>
</template>

<script setup lang="ts">
import { FormContext } from 'vee-validate'

interface FormProps {
  class?: string
  context: FormContext
}

interface FormEmits {
  (e: 'submit', data: any): void
}

const props = defineProps<FormProps>()
const emit = defineEmits<FormEmits>()

const { handleSubmit } = props.context
const onSubmit = handleSubmit((data) => {
  emit('submit', data)
})
</script>
