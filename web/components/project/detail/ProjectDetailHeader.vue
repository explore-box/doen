<template>
  <div class="flex flex-col w-full bg-white px-10 py-6 relative">
    <h2 class="text-3xl">Doen - todo list application</h2>

    <!-- the badge -->
    <div class="flex flex-wrap gap-x-4 gap-y-3 mt-10">
      <FlatButton
        class="rounded-full !h-11 transition-all duration-300 hover:-translate-y-1"
        >🚀 In progress</FlatButton
      >
      <OutlineButton>40 Tasks</OutlineButton>
      <OutlineButton
        ><i class="fi fi-rr-calendar"></i> Sun, 25 July 2023</OutlineButton
      >
      <OutlineButton><i class="fi fi-rr-hourglass"></i> 12 hours</OutlineButton>
    </div>

    <!-- view button -->
    <div class="flex gap-10 items-center mt-5 relative -bottom-6">
      <ProjectViewButton>🎉 Status</ProjectViewButton>
      <ProjectViewButton>💘 Tasks</ProjectViewButton>
      <TextButton><i class="fi fi-rr-add text-lg"></i> Add View</TextButton>
    </div>

    <!-- more buttons -->
    <div class="flex items-center gap-2 absolute right-10 top-10">
      <IconButton><i class="fi fi-rr-badge"></i></IconButton>
      <IconButton><i class="fi fi-rr-document"></i></IconButton>
      <IconButton><i class="fi fi-rr-menu-dots"></i></IconButton>
    </div>
  </div>
</template>
