<script lang="ts" setup>
const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  isBig: {
    type: Boolean,
    required: true
  },
  modelValue: {
    type: Number,
    default: 1,
  },
})

const sizeClass = computed(() => {
  if(!props.isBig) {
    return 'px-3 py-1'
  } else {
    return 'px-4 py-2'
  }
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
  <div class="pagination flex flex-wrap">
    <!-- Previous Button -->
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="pagination-btn font-semibold"
      :class="[currentPage === 1 ?'opacity-50 cursor-not-allowed' : '', sizeClass]"
    >
      <
    </button>

    <!-- First Page Button -->
    <button v-if="showFirstPage" @click="goToPage(1)" :class="sizeClass" class="pagination-btn">
      1
    </button>
    <span v-if="showStartEllipsis" class="ellipsis">...</span>

    <!-- Dynamic Page Buttons -->
    <button
      v-for="page in visiblePages"
      :key="page"
      :class="[
        'pagination-btn',
        sizeClass,
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
      :class="sizeClass"
      class="pagination-btn"
    >
      {{ totalPages }}
    </button>

    <!-- Next Button -->
    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="pagination-btn font-semibold"
      :class="[currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : '', sizeClass]"
    >
      >
    </button>
  </div>
</template>

<style lang="css" scoped>
.pagination-btn {
  @apply border border-gray-300 bg-white text-primary hover:bg-primary hover:text-white cursor-pointer;
}

.pagination-btn-active {
  @apply bg-primary1 text-white;
}

.pagination-btn[disabled] {
  @apply opacity-50 cursor-not-allowed;
}

.ellipsis {
  @apply px-3 py-1;
}
</style>
