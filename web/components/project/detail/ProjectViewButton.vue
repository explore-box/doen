<!-- Project View Button -->
<template>
  <button
    class="flex items-center justify-center font-medium bg-slate-50 h-12 px-6 rounded-tl-2xl rounded-tr-2xl relative"
  >
    <span class="caret-left"></span>
    <span class="caret-right"></span>
    <slot>🍀 View Button</slot>
  </button>
</template>

<script setup lang="ts"></script>

<style scoped>
.caret-left {
  @apply absolute h-5 w-5 bg-slate-50 bottom-0 -left-5;
}
.caret-left::before {
  @apply content-[''] absolute h-5 w-5 bg-white bottom-0 left-0;
  clip-path: circle(102.3% at 0 0);
}
.caret-right {
  @apply absolute h-5 w-5 bg-slate-50 bottom-0 -right-5;
}
.caret-right::before {
  @apply content-[''] absolute h-5 w-5 bg-white bottom-0 right-0;
  clip-path: circle(102.3% at 100% 0);
}
</style>
