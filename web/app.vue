<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  bodyAttrs: {
    class:
      'font-dm-sans text-base leading-normal bg-white text-black font-normal selection:bg-brand-pink selection:text-brand-purple-dark'
  }
})
</script>
