<template>
    <div>
        <div class="text-3xl my-4">Neighborhoods</div>
        <div v-if="neighborhood?.descendants">
            <NeighborTreeItem v-for="item in neighborhood.descendants" :item="item" :key="item.id"/>
        </div>
        
    </div>
</template>

<script setup lang="ts">
const propertyStore = usePropertyStore()

const neighborhood = computed(() => propertyStore.selectedNeighbor)

</script>