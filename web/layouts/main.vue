<template>
  <div>
    <!-- header -->
    <AppHeader />

    <!-- side navigations -->
    <AppSideNav />

    <!-- the app childs component -->
    <main class="flex flex-1 pt-[60px] pl-[76px]">
      <slot />
    </main>
  </div>
</template>
