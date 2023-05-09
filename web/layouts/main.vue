<template>
  <div>
    <!-- header -->
    <AppHeader />

    <!-- side navigations -->
    <AppSideNav />

    <!-- the app childs component -->
    <main class="flex flex-1 ml-32 py-32">
      <slot />
    </main>
  </div>
</template>
