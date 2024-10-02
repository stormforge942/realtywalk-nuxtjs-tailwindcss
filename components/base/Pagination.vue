<script lang="ts" setup>
const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  modelValue: {
    type: Number,
    default: 1,
  },
})

const currentPage = ref(props.modelValue)

const emit = defineEmits(['update:modelValue'])
const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    currentPage.value = page
    emit('update:modelValue', page)
  }
}

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  const half = Math.floor(maxVisible / 2)

  let start = Math.max(1, currentPage.value - half)
  let end = Math.min(props.totalPages, currentPage.value + half)

  if (start === 1) {
    end = Math.min(props.totalPages, maxVisible)
  }

  if (end === props.totalPages) {
    start = Math.max(1, props.totalPages - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const showFirstPage = computed(() => visiblePages.value[0] > 1)
const showLastPage = computed(
  () => visiblePages.value[visiblePages.value.length - 1] < props.totalPages
)
const showStartEllipsis = computed(() => visiblePages.value[0] > 2)
const showEndEllipsis = computed(
  () => visiblePages.value[visiblePages.value.length - 1] < props.totalPages - 1
)
</script>

<template>
  <div class="pagination flex gap-2">
    <!-- Previous Button -->
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="pagination-btn"
      :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
    >
      Prev
    </button>

    <!-- First Page Button -->
    <button v-if="showFirstPage" @click="goToPage(1)" class="pagination-btn">
      1
    </button>
    <span v-if="showStartEllipsis" class="ellipsis">...</span>

    <!-- Dynamic Page Buttons -->
    <button
      v-for="page in visiblePages"
      :key="page"
      :class="[
        'pagination-btn',
        { 'pagination-btn-active': currentPage === page },
      ]"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>

    <!-- End Ellipsis -->
    <span v-if="showEndEllipsis" class="ellipsis">...</span>

    <!-- Last Page Button -->
    <button
      v-if="showLastPage"
      @click="goToPage(totalPages)"
      class="pagination-btn"
    >
      {{ totalPages }}
    </button>

    <!-- Next Button -->
    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="pagination-btn"
      :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
    >
      Next
    </button>
  </div>
</template>

<style lang="css" scoped>
@apply flex gap-2;

.pagination-btn {
  @apply px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100 cursor-pointer;
}

.pagination-btn-active {
  @apply bg-blue-500 text-white;
}

.pagination-btn[disabled] {
  @apply opacity-50 cursor-not-allowed;
}

.ellipsis {
  @apply px-3 py-1;
}
</style>
