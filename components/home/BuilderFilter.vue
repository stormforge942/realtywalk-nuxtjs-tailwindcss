<template>
    <div class="w-full border-l border-l-primary h-full p-4 xl:py-0">
        <div class="text-lg">{{ $t('builder.filterBy.title') }}</div>
        <div class="bg-[#D7E4EA] h-[50px] flex items-center px-2">
            <BaseCheckbox 
            color="primary" 
            :intermediate="intermediate"
            @update:model-value="onToggleSelectAll()"
            v-model="propertyStore.selectAllBuilders">
                <span class="mt-1">{{ $t('builder.filterBy.select_all') }}</span>
            </BaseCheckbox>
        </div>
        <div class="max-h-[calc(100%-100px)] h-full overflow-y-auto flex flex-col gap-1">
            <template v-if="propertyStore.loadingBuilders">
                <div class="flex w-full h-full items-center justify-center">
                    <BaseRippleProgress />
                </div>
            </template>
            <template v-else>
                <div 
                class="capitalize hover:bg-gray-100 py-1 px-2 hover:underline"
                :key="item.key"
                v-for="item in propertyStore.associatedBuilders">
                    <BaseCheckbox color="primary" v-model="item.checked" @update:model-value="onUpdate()"><span class="mt-1">{{ item.s }}</span></BaseCheckbox>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
const intermediate = ref<boolean>(false)

const propertyStore = usePropertyStore()

propertyStore.fetchAssociatedBuilders()

onBeforeMount(() => {
    propertyStore.fetchAssociatedBuilders()
})

const onToggleSelectAll = () => {
    propertyStore.associatedBuilders.forEach(item => {
        item.checked = !propertyStore.selectAllBuilders
    })
    intermediate.value = false
    eventBus.emit(SEARCH_CRITERIA)
}

const onUpdate = () => {
    let count = 0
    propertyStore.associatedBuilders.forEach(item => {
        if(item.checked) {
            count ++;
        }
    })
    intermediate.value = count > 0 && count < propertyStore.associatedBuilders.length
    propertyStore.selectAllBuilders = count === propertyStore.associatedBuilders.length
    eventBus.emit(SEARCH_CRITERIA)
}
</script>