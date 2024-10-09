<script setup lang="ts">
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const isOpen = ref(false)

eventBus.on(ADDRESS_LOOKUP, () => {
  isOpen.value = !isOpen.value
})

const handleOutSideClick = (e: MouseEvent) => {
  const lookup = document.querySelector('#address-lookup')
  const button = document.querySelector('#lookup-button')

  if (
    lookup &&
    !lookup.contains(e.target as Node) &&
    button &&
    !button.contains(e.target as Node)
  ) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutSideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutSideClick)
})
</script>

<template>
  <div
    v-if="isOpen"
    id="address-lookup"
    class="absolute top-full right-0 flex p-4 bg-white border-primary shadow-md w-[320px]"
  >
    <input type="text" placeholder="Enter an address" />
    <button>
      <FontAwesome :icon="faMagnifyingGlass" />
    </button>
  </div>
</template>

<style lang="css" scoped>
button {
  @apply text-base bg-primary hover:bg-dark text-white text-center w-12 flex items-center justify-center;
}
</style>
