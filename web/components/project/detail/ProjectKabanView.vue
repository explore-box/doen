<!-- Kanban Project View -->
<template>
  <div class="flex gap-7 w-full h-[calc(100vh-160px)] pb-10">
    <template v-for="index in 4">
      <!-- item list board -->
      <div
        class="flex flex-col p-2 rounded-2xl outline-2 outline-dashed outline-gray-200 w-[345px] h-full relative overflow-hidden"
      >
        <!-- header -->
        <div class="flex items-center gap-3 px-2 pt-2">
          <h5 class="flex text-lg font-medium">🥝 Todo</h5>
          <span
            class="flex justify-center items-center text-sm font-medium bg-white h-6 w-6 rounded-full"
            >9</span
          >
          <div class="flex flex-1"></div>
          <IconButton :show-background="false"
            ><i class="fi fi-rr-menu-dots"></i
          ></IconButton>
        </div>

        <!-- list of tasks -->
        <div
          class="flex flex-col gap-2 mt-4 h-full pb-28 overflow-y-auto task-list"
        >
          <template v-for="index in 10">
            <TaskKanbanItem />
          </template>
        </div>

        <!-- sticky button -->
        <FlatButton
          class="bg-brand-purple-dark text-white absolute bottom-4 inset-x-4"
          ><i class="fi fi-rr-add"></i> Add task</FlatButton
        >
      </div>
    </template>
  </div>
</template>

<style scoped>
.task-list::-webkit-scrollbar {
  @apply hidden;
}
.task-list {
  scroll-behavior: smooth;
}
</style>
