<template>
  <nav
    class="flex flex-col fixed z-10 inset-y-0 left-0 bg-white border-r border-r-gray-100 py-6 px-3"
  >
    <div class="flex justify-center items-center">
      <NuxtImg src="/images/logo.png" height="40" width="40" alt="Doen App" />
    </div>

    <!-- main menus -->
    <!-- contain all the menus to navigate -->
    <ul class="flex flex-col items-center mt-10 gap-3">
      <template v-for="item in mainMenus">
        <li class="flex">
          <NuxtLink
            :to="item.link"
            class="flex justify-center items-center h-[52px] w-[52px] rounded-2xl text-gray-500 transition-all duration-300 hover:-translate-y-1 hover:scale-95 bg-slate-100"
            active-class="!text-brand-purple-dark !bg-brand-pink"
          >
            <i :class="item.icon" class="text-2xl"></i>
          </NuxtLink>
        </li>
      </template>
    </ul>

    <div class="flex flex-1"></div>

    <!-- secondary menus -->
    <!-- contain all the menus to navigate to other pages -->
    <ul
      class="flex flex-col items-center mt-10 gap-0 border-t border-t-gray-100 pt-10"
    >
      <template v-for="item in secondMenus">
        <li class="flex">
          <NuxtLink
            :to="item.link"
            class="flex justify-center items-center h-[52px] w-[52px] rounded-2xl text-gray-500 transition-all duration-300 hover:-translate-y-1 hover:scale-95"
            active-class="!text-brand-purple-dark bg-brand-pink"
          >
            <i :class="item.icon" class="text-2xl"></i>
          </NuxtLink>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script setup lang="ts">
interface Menu {
  label: string
  link: string
  icon: string
}

const mainMenus: Menu[] = [
  {
    icon: 'fi fi-rr-house-chimney-crack',
    label: 'Home',
    link: '/app'
  },
  {
    icon: 'fi fi-rr-paper-plane',
    label: 'Project',
    link: '/app/project'
  },
  {
    icon: 'fi fi-rr-calendar',
    label: 'Planning',
    link: '/app/plan'
  },
  {
    icon: 'fi fi-rr-bookmark',
    label: 'Labels',
    link: '/app/label'
  }
]

const secondMenus: Menu[] = [
  {
    icon: 'fi fi-rr-shield-check',
    label: 'Privacy',
    link: '/privacy'
  },
  {
    icon: 'fi fi-rr-settings',
    label: 'Settings',
    link: '/settings'
  }
]
</script>

<style scoped></style>
