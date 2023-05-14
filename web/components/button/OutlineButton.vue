<!-- Outline Button -->
<template>
  <button
    type="button"
    class="flex justify-center items-center gap-3 px-4 h-11 text-base rounded-full border border-gray-100 outline-button transition-all duration-300 hover:-translate-y-1"
  >
    <slot>Button</slot>
  </button>
</template>

<script setup lang="ts"></script>

<style scoped>
:slotted(i) {
  @apply text-lg;
}
</style>
