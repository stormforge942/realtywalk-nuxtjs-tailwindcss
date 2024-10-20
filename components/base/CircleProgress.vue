<script setup lang="ts">
interface Props {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'
}

const props = defineProps<Props>()

const sizeClass = computed(() => {
  if(props.size === 'xs') return 'w-2 h-2'
  else if(props.size === 'sm') return 'w-3 h-3'
  else if(props.size === 'md') return 'w-4 h-4'
  else if(props.size === 'lg') return 'w-5 h-5'
  else if(props.size === 'xl') return 'w-6 h-6'
  else if(props.size === '2xl') return 'w-7 h-7'
  else if(props.size === '3xl') return 'w-8 h-8'
  else if(props.size === '4xl') return 'w-9 h-9'
  else if(props.size === '5xl') return 'w-10 h-10'
  else if(props.size === '6xl') return 'w-11 h-11'
  else if(props.size === '7xl') return 'w-12 h-12'
  else if(props.size === '8xl') return 'w-13 h-13'
  else return 'w-14 h-14'
})

</script>

<template>
  <div :class="sizeClass">
    <span></span>
  </div>
</template>

<style lang="css" scoped>
div {
  @apply inline-block border-t-2 border-r-2 border-solid rounded-full border-b-2 border-l-2 border-b-transparent border-l-transparent border-current;
  animation: rotate 0.45s linear infinite;
}

span {
  @apply border-0 w-px h-px m-[-1px] p-0 overflow-hidden whitespace-nowrap absolute;
  clip: rect(0px, 0px, 0px, 0px);
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>