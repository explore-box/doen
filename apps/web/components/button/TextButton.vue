<!-- Text Button -->
<!-- showing the button using the text style -->
<template>
  <button
    :type="type"
    @click.prevent="link ? openLink() : emit('click')"
    class="flex gap-4 items-center text-base font-medium leading-tight px-2 py-1 cursor-pointer"
    :class="class"
  >
    <slot>Text Button</slot>
  </button>
</template>

<script setup lang="ts">
// button props interface
interface TextButtonProps {
  type?: 'button' | 'submit'
  class?: string
  link?: string
}

const props = withDefaults(defineProps<TextButtonProps>(), {
  type: 'button'
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

// open the link if provided
const openLink = async () => {
  if (props.link?.includes('https://') || props.link?.includes('http://')) {
    window.open(props.link)
  } else {
    await navigateTo(props.link)
  }
}
</script>

<style lang="postcss">
button i {
  @apply text-2xl;
}
</style>
