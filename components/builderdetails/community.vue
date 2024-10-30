<script setup lang="ts">
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';


const builderStore = useBuilderStore()
const builder = computed(() => builderStore.curBuilder)

const show = ref<boolean>(false)

</script>


<template>
    <h4 class="font-semibold text-xl">{{ $t('builder.singleProperty.sectionTitles.title_5') }}</h4>
    <template v-if="builder.communities.length">
        <button 
        @click="show = !show"
        class="flex items-center gap-x-2 text-blue-600">
            <FontAwesome :icon="faAngleRight" :class="[show && 'rotate-90']" class="mb-1"/>
            <span>Click to {{ show ? 'hide' : 'see' }} list</span>
        </button>
        <div
        :class="[show ? 'h-max opacity-100' : 'h-0 opacity-0']" 
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 overflow-hidden px-4">
            <NuxtLink 
            :key="community.id"
            :to="community.path_url"
            v-for="community in builder.communities" >
                {{ community.title }}
            </NuxtLink>
        </div>
    </template>
    <template v-else>
        No records found
    </template>
</template>

<style lang="css" scoped>

a {
  @apply text-black hover:text-primary cursor-pointer hover:underline normal-case;
}

</style>