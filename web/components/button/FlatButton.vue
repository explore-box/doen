<template>
  <button
    @click="emit('click')"
    :type="type"
    :id="id"
    :disabled="disabled"
    class="flex cursor-pointer bg-brand-pink text-brand-purple-dark font-medium gap-3 items-center justify-center"
    :class="mappedClass"
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
  size?: 'small' | 'medium' | 'large'
}
interface FlatButtonEmit {
  (e: 'click'): void
}

const props = withDefaults(defineProps<FlatButtonProps>(), {
  type: 'button',
  size: 'medium'
})

const emit = defineEmits<FlatButtonEmit>()

// modify and computes the button classname
// adjust using size, effect and other things
const mappedClass = computed(() => {
  let sizeClass = ''

  // modify the size class
  switch (props.size) {
    case 'small':
      sizeClass = 'h-11 text-sm px-5 rounded-[12px]'
      break
    case 'medium':
      sizeClass = 'h-12 text-base px-6 rounded-[16px]'
      break
    default:
      sizeClass = 'h-14 text-base px-8 rounded-[20px]'
      break
  }

  return `${props.class} ${sizeClass}`
})
</script>
