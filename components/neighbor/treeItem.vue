<script setup lang="ts">
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const props = defineProps<{
    item: NeighborhoodTreeItem
}>()

const isExpand = ref(false)

</script>

<template>
    <div>
        <div class="flex items-center hover:bg-gray-100 cursor-pointer">
            <div
            @click="isExpand = !isExpand" 
            :class="[isExpand && 'rotate-90']"
            class="inline-flex items-center justify-center w-8 h-8 ">
                <FontAwesome :icon="faAngleRight" v-if="item.children.length"/>
            </div>
            <NuxtLink :to="item.path_url" class="p-2 w-full capitalize hover:underline">{{ item.text }}</NuxtLink>
        </div>
        <div v-if="item.children.length > 0 && isExpand" class="ml-4">
            <NeighborTreeItem :key="child.id" :item="child" v-for="child in item.children"/>
        </div>
    </div>
</template>