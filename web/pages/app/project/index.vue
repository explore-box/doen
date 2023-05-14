<!-- Project List Page -->
<!-- list all project and show the current status -->

<template>
  <Head>
    <Title>Projects | Doen</Title>
    <Meta name="description"
      >Explore all the project and start collaborates</Meta
    >
  </Head>

  <div class="flex w-full ml-32 py-32">
    <!-- detail and all project show here -->
    <div class="flex flex-col w-9/12">
      <h3 class="flex text-4xl font-medium">Projects</h3>

      <!-- Filter and sorts -->
      <div class="flex items-center mt-7 gap-4">
        <ProjectStatusFilter />
        <ProjectSortFilter />
        <ProjectSearchFilter />
        <FlatButton class="bg-white !h-[52px] !w-[52px] !p-0">
          <i class="fi fi-rr-apps text-xl"></i>
        </FlatButton>
      </div>

      <!-- list of projects -->
      <div class="grid grid-cols-3 gap-x-5 gap-y-10 mt-10">
        <template v-for="index in 10">
          <ProjectGridItem />
        </template>
      </div>
    </div>

    <!-- this is showing the user project info -->
    <!-- must as fixed -->
    <ProjectSideInfo />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'main'
})
</script>

<style>
body {
  @apply !bg-slate-50;
}
</style>
