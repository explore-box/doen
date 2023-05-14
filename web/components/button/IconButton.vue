<!-- Icon Button -->
<template>
  <button
    type="button"
    class="flex justify-center items-center rounded-2xl transition-all duration-300 hover:-translate-y-1"
    :class="[mappedClass, props.class]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface IconButtonProps {
  class?: string
  showBackground?: boolean
}
const props = withDefaults(defineProps<IconButtonProps>(), {
  showBackground: true
})

const mappedClass = computed(() => {
  return `${props.showBackground ? 'h-11 w-11 bg-gray-100' : '!bg-transparent'}`
})
</script>

<style scoped>
:slotted(i) {
  @apply text-lg;
}
</style>
