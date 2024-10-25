<template>
    <div class="text-primary" v-if="neighborhood?.ancestors?.length">
        <span v-for="ancestorPoly in neighborhood.ancestors" :key="ancestorPoly.id">{{ancestorPoly.title}} > </span>
        <span>{{neighborhood.title}}</span>
    </div>
</template>

<script setup lang="ts">

const propertyStore = usePropertyStore()

const neighborhood = computed(() => propertyStore.selectedNeighbor)
</script>