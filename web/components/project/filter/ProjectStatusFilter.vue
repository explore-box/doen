<template>
  <div class="flex relative group/filter">
    <button
      type="button"
      class="flex cursor-pointer gap-3 bg-white rounded-2xl px-5 h-[52px] border border-gray-100 items-center focus:ring-2 focus:ring-brand-pink"
      @focusin="showDropdown"
      tabindex="0"
      @focusout="hideDropdown"
    >
      <span class="flex flex-1 text-gray-500">Select Status</span>
      <i class="fi fi-rr-angle-small-down text-gray-500"></i>
    </button>

    <!-- button dropdown -->
    <div
      class="flex flex-col absolute w-[240px] bg-white rounded-2xl border border-gray-100 px-2 py-3 shadow-sm top-[72px]"
      v-show="showDrop"
    >
      <span class="flex font-medium border-b border-b-gray-100 px-2 pb-2"
        >Status</span
      >

      <ul class="flex flex-col list-none w-full mt-3">
        <template v-for="(status, index) in statusLists">
          <li
            class="flex gap-3 items-center h-12 relative transition-all duration-300 hover:bg-slate-50 hover:-translate-x-1 px-2 rounded-xl cursor-pointer"
            @click="changeStatus(status.label, $event)"
          >
            <div
              class="flex h-4 w-4 rounded-full"
              :style="{ background: status.color }"
            ></div>
            <span>{{ status.label }}</span>

            <div
              class="absolute w-full border-b border-gray-50 bottom-0"
              v-show="index >= 0 && index < statusLists.length - 1"
            ></div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const showDrop = ref<boolean>(false)

interface StatusFilter {
  label: string
  color: string
}

// Filter status data
// this can be dynamically changes
const statusLists: StatusFilter[] = [
  {
    label: 'Planned',
    color: '#D2D2DA'
  },
  {
    label: 'In progress',
    color: '#6532F8'
  },
  {
    label: 'Completed',
    color: '#56C783'
  }
]

const changeStatus = (label: string, e: any) => {
  console.log(label)
}

const showDropdown = () => {
  showDrop.value = true
}

const hideDropdown = () => {
  showDrop.value = false
}
</script>

<style scoped></style>
