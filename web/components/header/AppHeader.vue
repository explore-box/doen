<!-- App Header -->
<!-- The header components to showing in apps -->
<template>
  <header
    id="app-header"
    class="header flex fixed z-10 top-0 inset-x-0 items-center px-10 py-2 bg-white border-b border-b-gray-100 ml-[72px]"
  >
    <!-- breadscrumbs -->
    <div class="flex items-center">
      <ul class="flex items-center gap-3 text-gray-600">
        <template v-for="({ label, path }, index) in breadscrumbs">
          <i class="fi fi-rr-angle-small-right" v-show="index % 2 == 1"></i>
          <li class="flex items-center">
            <NuxtLink :to="path">
              {{ label }}
            </NuxtLink>
          </li>
        </template>
      </ul>
    </div>

    <!-- spacer -->
    <div class="flex flex-1"></div>

    <!-- menus -->
    <ul class="flex items-center list-none gap-10 mr-10">
      <li class="flex">
        <FlatButton class="text-sm" size="small"
          ><i class="fi fi-rr-add text-lg"></i> Add project</FlatButton
        >
      </li>
      <li class="flex justify-center items-center">
        <button
          class="relative cursor-pointer"
          type="button"
          @click="showNotification"
        >
          <i class="fi fi-rr-bell text-xl"></i>
          <span
            class="absolute flex h-3 w-3 rounded-full bg-red-500 -top-1 -right-1"
          ></span>
        </button>
      </li>
    </ul>

    <!-- avatar account menus -->
    <div class="flex">
      <NuxtImg
        src="/images/avatar-placeholder.png"
        height="44"
        width="44"
        alt="Username"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
const showNotification = () => {
  // TODO: Add the notification to show in modal
}

// define the breadscrumbs of
// projects
const breadscrumbs: {
  label: string
  path: string
}[] = [
  {
    label: 'Projects',
    path: '/app/project'
  },
  {
    label: 'Create Wireframe',
    path: '/app/project/create-wireframe'
  }
]
</script>
