<script setup lang="ts">
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import type { PolygonNode } from '~/composables/googleMap';

const props = defineProps<{node: PolygonNode}>()
const homeStore = useHomeStore();

const onCheckItem = () => {
    if(props.node.state.checked) {

    } else {
        
    }
}
</script>

<template>
  <label 
    class="flex min-h-10 items-center py-1 text-secondary pr-4 cursor-pointer hover:bg-primary1">
        <span
        class="min-w-[20px] inline-flex justify-end"
        v-if="node.zoom < homeStore.level + 1">
            <FontAwesome 
            class="mb-1"
            :icon="faAngleDown" 
            :class="[node.state.expanded && 'rotate-180']"/>
        </span>
        <span v-else class="min-w-[20px]"></span>
        <BaseCheckbox
        :model-value="node.state.checked"
        @update:model-value="onCheckItem"
        color="secondary" class="mb-1 px-2"/>
        <span
        class="w-full"
        >{{ props.node.text }}</span>
    </label>
    <template v-if="node.children">

    </template>
</template>

