<script setup lang="ts">
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
  model: {
    type: Object as PropType<PolygonNode>,
    required: true
  }
})

const homeStore = useHomeStore();

const isFolder = computed(() => {
  return typeof props.model.children === 'object'
})

const toggle = (e: MouseEvent) => {
    props.model.state.indeterminate = true;
    props.model.state.expanded = !props.model.state.expanded;
    //onNeighborhoodClicked(e, props.model)
}

const isCheckBoxVisible = computed(() => {
    if(homeStore.level === 0) return false;
    else if(homeStore.level === 1) return props.model.zoom < 2 && isFolder;
    else if(homeStore.level === 2) return typeof props.model.children === 'object'
    else return false;
})

const isVisible = computed(() => {
    if(props.model.state.checked) return true;
    else if(homeStore.showUnselected) return typeof props.model.children === 'object' || props.model.state.checked;
})

const onChangeCheck = () => {
    props.model.state.checked ? onUncheckPoly(props.model) : onCheckPoly(props.model)
    props.model.state.checked = !props.model.state.checked
}

</script>

<template>
  <div
  :class="[isVisible ? 'flex' : 'hidden']" 
  class="flex-col w-full">
    <div
      :class="[props.model.state.indeterminate ? 'font-semibold bg-dark hover:bg-darkHover' : 'hover:bg-primary1']"
      class="flex items-center min-h-10 py-2 w-full gap-x-2 text-secondary cursor-pointer px-3">
      <span @click="toggle">
        <FontAwesome v-if="isCheckBoxVisible" class="px-[1px]" :class="model.state.expanded && '-rotate-180'" :icon="faAngleDown"/>
        <span v-else class="pl-4"></span>
      </span>
      <BaseCheckbox color="secondary" :model-value="model.state.checked" @update:model-value="onChangeCheck()"/>
      <span @click="toggle" class="w-full">{{ model.text }}</span>
    </div>
    <div v-show="model.state.expanded" v-if="isFolder" class="flex flex-col w-full pl-5">
      <HomeTreeNode
        v-for="model in model.children"
        :model="model">
      </HomeTreeNode>
    </div>
  </div>
</template>