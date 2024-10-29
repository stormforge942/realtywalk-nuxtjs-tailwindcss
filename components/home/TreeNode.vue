<script setup lang="ts">
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
  model: {
    type: Object as PropType<PolygonNode>,
    required: true
  }
})

const homeStore = useHomeStore();
const router = useRouter()

const isFolder = computed(() => {
  return typeof props.model.children === 'object'
})

const toggle = (e: MouseEvent) => {
    props.model.state.expanded = !props.model.state.expanded;
}

const isCheckBoxVisible = computed(() => {
    if(homeStore.level === 0) return false;
    else if(homeStore.level === 1) return props.model.zoom < 2 && isFolder;
    else if(homeStore.level === 2) return props.model.children?.length
    else return false;
})

const isVisible = computed(() => {
    if(props.model.state.checked) return true;
    else if(props.model.state.indeterminate) return true;
    else if(homeStore.showUnselected) return typeof props.model.children?.length || props.model.state.checked;
})

const onChangeCheck = () => {
    props.model.state.checked ? onUncheckPoly(props.model) : onCheckPoly(props.model)
    props.model.state.checked = !props.model.state.checked
}

const neighborhoodUrl = computed(() => {
  if(props.model.path === '/neighborhood/') return `/neighborhood/${props.model.text}`
  else return props.model.path
})
</script>

<template>
  <div
  :class="[isVisible ? 'flex' : 'hidden']" 
  class="flex-col w-full">
    <div
      class="flex items-center min-h-10 py-2 w-full gap-x-2 text-secondary cursor-pointer px-3">
      <span @click="toggle">
        <FontAwesome v-if="isCheckBoxVisible" class="px-[1px]" :class="model.state.expanded && '-rotate-180'" :icon="faAngleDown"/>
        <span v-else class="pl-4"></span>
      </span>
      <BaseCheckbox 
      color="secondary" 
      :model-value="model.state.checked"
      :intermediate="model.state.indeterminate" 
      @update:model-value="onChangeCheck()"/>
      <NuxtLink
      :to="neighborhoodUrl"
      target="_blank"
      :class="[model.state.checked && 'font-semibold']"
      class="w-full capitalize hover:underline">{{ model.text }}</NuxtLink>
    </div>
    <div v-show="model.state.expanded" v-if="isFolder" class="flex flex-col w-full pl-5">
      <HomeTreeNode
        v-for="model in model.children"
        :model="model">
      </HomeTreeNode>
    </div>
  </div>
</template>