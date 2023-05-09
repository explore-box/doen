<template>
  <div class="flex relative group/filter">
    <button
      type="button"
      class="flex cursor-pointer gap-3 bg-white rounded-2xl px-5 h-[52px] border border-gray-100 items-center focus:ring-2 focus:ring-brand-pink"
      @focusin="showDropdown"
      tabindex="0"
      @focusout="hideDropdown"
    >
      <span class="flex flex-1 text-gray-500">Sort by</span>
      <i class="fi fi-rr-angle-small-down text-gray-500"></i>
    </button>

    <!-- button dropdown -->
    <div
      class="flex flex-col absolute w-[240px] bg-white rounded-2xl border border-gray-100 px-2 py-3 shadow-sm top-[72px]"
      v-show="showDrop"
    >
      <span class="flex font-medium border-b border-b-gray-100 px-2 pb-2"
        >Sort by</span
      >

      <ul class="flex flex-col list-none w-full mt-3">
        <template v-for="sort in sortLists">
          <li
            class="flex gap-3 items-center h-12 relative transition-all duration-300 hover:bg-slate-50 hover:-translate-x-1 px-2 rounded-xl cursor-pointer"
            @click="changeSort(sort.label, $event)"
          >
            <i :class="sort.icon"></i>
            <span>{{ sort.label }}</span>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const showDrop = ref<boolean>(false)

interface SortFilter {
  label: string
  icon: string
}

// Sort the project
const sortLists: SortFilter[] = [
  {
    label: 'Timeline',
    icon: 'fi fi-rr-calendar'
  },
  {
    label: 'Created Date',
    icon: 'fi fi-rr-clock-three'
  }
]

const changeSort = (label: string, e: any) => {}

const showDropdown = () => {
  showDrop.value = true
}

const hideDropdown = () => {
  showDrop.value = false
}
</script>

<style scoped></style>
