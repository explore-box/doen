<template>
  <button
    @click="emit('click')"
    :type="type"
    :id="id"
    :disabled="disabled"
    class="flex cursor-pointer bg-brand-pink rounded-[20px] text-brand-purple-dark px-8 py-4 text-[17px] font-medium gap-4 items-center justify-center"
    :class="class"
  >
    <slot>Button</slot>
  </button>
</template>

<script setup lang="ts">
interface FlatButtonProps {
  id?: string
  type?: 'submit' | 'button'
  class?: string
  disabled?: boolean
}
interface FlatButtonEmit {
  (e: 'click'): void
}

const props = withDefaults(defineProps<FlatButtonProps>(), {
  type: 'button'
})
const emit = defineEmits<FlatButtonEmit>()
</script>
