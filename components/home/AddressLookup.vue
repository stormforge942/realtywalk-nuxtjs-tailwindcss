<script setup lang="ts">
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const router = useRouter()
const isOpen = ref(false)
const search = ref('')

eventBus.on(ADDRESS_LOOKUP, () => {
  isOpen.value = !isOpen.value
})

const onEnter = () => {
  router.push(`/address-lookup?q=${search.value}`)  
  isOpen.value = false
}

const onPressEnter = (e: KeyboardEvent) => {
  if(e.key === 'Enter') {
    onEnter()
  }
}


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
    <input 
    @keydown="onPressEnter" 
    type="text" 
    class="text-primary"
    v-model="search" 
    :placeholder="$t('menu.enter_address')" />
    <button @click="onEnter()">
      <FontAwesome :icon="faMagnifyingGlass" />
    </button>
  </div>
</template>

<style lang="css" scoped>
button {
  @apply text-base bg-primary hover:bg-dark text-white text-center w-12 flex items-center justify-center;
}
</style>
