<script setup lang="ts">
const authStore = useAuthStore()
const neighborStore = useNeighborStore()


watch(
  () => [neighborStore.search], 
  () => {
    neighborStore.curPage = 1
})
</script>

<template>
  <div class="p-4">
    <div
      class="text-2xl pb-2" 
      v-if="authStore.user && authStore.authenticated">
        {{ $t('general.welcome', {user: authStore.user?.name}) }}
      </div>
    <div class="flex flex-col sm:flex-row gap-4 items-start">
      <BaseAlphaBetaFilter v-model="neighborStore.search"/>
      <input type="text" v-model="neighborStore.search" class="w-full sm:max-w-[240px]" :placeholder="$t('builder.list.searchBy.placeholder')"/>
    </div>
    <template v-if="neighborStore.isLoading">
      <div class="flex justify-center py-20">
        <BaseRippleProgress />
      </div>
    </template>
    <template v-else>
      <div class="flex flex-col gap-4 my-4">
        <BasePagination is-big v-model="neighborStore.curPage" :total-pages="neighborStore.totalPage"/>
        <div>
          <NeighborhoodItem :key="item.id" :item="item" v-for="item of neighborStore.items" />
        </div>
        <BasePagination is-big v-model="neighborStore.curPage" :total-pages="neighborStore.totalPage"/>
      </div>
    </template>
  </div>
</template>
