<script setup lang="ts">
import YouTube from 'vue3-youtube';

const isOpen = ref(false)
const youtube = ref()

const toggle = (val: boolean) => {
  isOpen.value = val
}

watch(() => [isOpen], () => {
  if(isOpen.value) {
    youtube.value?.playVideo()
  } else {
    youtube.value?.stopVideo()
  }
})

onMounted(() => {
  eventBus.on(DEMO_MODAL, () => {
    isOpen.value = true
  })

})

onUnmounted(() => {
  eventBus.off(DEMO_MODAL)
})
</script>

<template>
  <BaseModal
  :isOpen="isOpen" @toggle="toggle">
    <template #title>{{ $t('menu.watch_the_demo') }}</template>
    <template #body>
        <YouTube
      ref="youtube"
      class="w-full h-full aspect-video" 
      src="https://www.youtube.com/watch?v=z98-EokDUW4"/>    </template>
  </BaseModal>
</template>
