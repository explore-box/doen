<!-- Detail Projects -->
<!-- Including the project detail info and open the tasks in tray -->
<template>
  <div class="w-full h-full">
    <!-- project header -->
    <ProjectDetailHeader />

    <!-- all tasks views -->
    <ProjectView />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'main'
})
</script>
