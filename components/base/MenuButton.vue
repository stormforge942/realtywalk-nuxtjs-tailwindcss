<script setup lang="ts">
const isActive = ref(false);

const toggleMenu = () => {
    isActive.value = !isActive.value;
}
</script>

<template>
<div :class="['menu-btn', isActive && 'active']" @click="toggleMenu">
    <div class="line line1"></div>
    <div class="line line2"></div>
    <div class="line line3"></div>
</div>
</template>

<style lang="css" scoped>
    .menu-btn {
      @apply flex flex-col justify-between w-9 h-7 cursor-pointer
    }

    .line {
      @apply w-full h-1 bg-secondary transition-all duration-300 ease-in-out
    }

    .line1 {
      transform-origin: top left;
    }

    .line3 {
      transform-origin: bottom left;
    }

    .menu-btn.active .line1 {
      transform: rotate(45deg);
    }

    .menu-btn.active .line2 {
      opacity: 0;
    }

    .menu-btn.active .line3 {
      transform: rotate(-45deg);
    }
</style>