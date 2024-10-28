<script lang="ts" setup>
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const router = useRouter()
const authStore = useAuthStore()

const isActive = ref(false)

const button = ref<HTMLDivElement>()
const drawer = ref<HTMLDivElement>()
const search = ref<string>('')
const isOpen = ref<boolean>(false)

const toggleMenu = () => {
  isActive.value = !isActive.value
}


const onEnter = () => {
  router.push(`/address-lookup?q=${search.value}`) 
  isOpen.value = false
  isActive.value = false
}

const onPressEnter = (e: KeyboardEvent) => {
  if(e.key === 'Enter') {
    onEnter()
  }
}

const handleOutSideClick = (e: MouseEvent) => {
  if (
    drawer.value &&
    !drawer.value.contains(e.target as Node) &&
    button.value &&
    !button.value.contains(e.target as Node)
  ) {
    isActive.value = false
  }
}

const onClose = () => {
  isActive.value = false;
}

onMounted(() => {
  document.addEventListener('click', handleOutSideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutSideClick)
})

watch(() => [isActive], () => {
  isOpen.value = false
  search.value = ''
})
</script>

<template>
  <div
    ref="button"
    :class="['flex items-center h-[100px] lg:hidden z-[1000] top-0 right-8', isActive ? 'fixed' : 'absolute']"
  >
    <BaseMenuButton :is-active="isActive" @toggle-menu="toggleMenu" />
  </div>
  <ul
    ref="drawer"
    :class="[
      isActive ? 'right-0' : '-right-[300px]',
      'fixed z-[40] top-0  w-[300px] h-screen bg-primary',
      'pt-[100px] shadow-[-11px_1px_13px_-6px_#0000003F]',
    ]"
  >
    <div
      class="flex flex-col items-center justify-start max-h-[calc(100vh - 100px)] overflow-x-hidden overflow-y-auto"
    >
      <li class="relative w-full">
        <div
        @click="isOpen = !isOpen" 
        class="w-full text-center">
          <NuxtLink class="cursor-pointer">{{ $t('menu.address_lookup') }}</NuxtLink>
        </div>
        <div
          v-if="isOpen"
          class="flex p-4 bg-white border-primary shadow-md w-full"
        >
          <input 
          type="text" 
          @keypress="onPressEnter"
          v-model="search"
          class="text-primary"
          :placeholder="$t('menu.enter_address')" />
          <button
          @click="onEnter" 
          class="bg-primary hover:bg-primary1 min-w-10">
            <FontAwesome :icon="faMagnifyingGlass" />
          </button>
        </div>
      </li>
      <li @click="onClose()">
        <NuxtLink to="/about">{{ $t('menu.about') }}</NuxtLink>
      </li>
      <li @click="onClose()">
        <NuxtLink to="/neighborhoods">{{ $t('menu.neighborhoods') }}</NuxtLink>
      </li>
      <!-- <li @click="onClose()">
        <NuxtLink to="/builders">{{ $t('menu.builder') }}</NuxtLink>
      </li> -->

      <template v-if="authStore.authenticated">
        <li @click="onClose()">
          <NuxtLink to="/user/favorites">{{ $t('menu.favorite') }}</NuxtLink>
        </li>
        <li @click="onClose()">
          <NuxtLink to="/user/profile">{{ $t('menu.my_profile') }}</NuxtLink>
        </li>
        <li @click="onClose()">
          <span @click="eventBus.emit(LOG_OUT)"><NuxtLink to="/">{{ $t('menu.log_out') }}</NuxtLink></span>
        </li>
      </template>

      <template v-else>
        <li @click="onClose()">
          <NuxtLink to="/user/register">{{ $t('menu.register') }}</NuxtLink>
        </li>
        <li @click="onClose()">
          <NuxtLink to="/user/signin">{{ $t('menu.sign_in') }}</NuxtLink>
        </li>
      </template>

      <li @click="onClose()">
        <NuxtLink to="/user/favorites">{{ $t('menu.favorite') }}</NuxtLink>
      </li>
      <li @click="onClose()">
        <NuxtLink to="/report-bug">{{ $t('menu.report_bug') }}</NuxtLink>
      </li>
      <BaseWatchDemo />
    </div>
  </ul>
</template>

<style lang="css" scoped>
a {
  @apply text-xl p-3 w-max hover:text-secondary;
}
li {
  @apply block m-3;
}
</style>
