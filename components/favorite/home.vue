<template>
    <div v-if="authStore.isLoading"
    class="flex justify-center py-20">
        <BaseRippleProgress />
    </div>
    <div v-else class="flex flex-col p-5">
        <div v-if="authStore.favItems.length > 0">
            <LookupItem :key="item.id" :item="item" v-for="item in authStore.favItems"/>
        </div>
        <div class="text-center p-12" v-else>
            {{ $t('favorite.list.no_data') }}
        </div>
    </div>
</template>


<script setup lang="ts">


const authStore = useAuthStore()

onBeforeMount(() => {
    authStore.fetchFavoriteData()
})
</script>