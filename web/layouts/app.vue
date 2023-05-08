<template>
  <div>
    <!-- header -->
    <AppHeader />

    <!-- side navigations -->
    <AppSideNav />

    <!-- the app childs component -->
    <main class="flex">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
