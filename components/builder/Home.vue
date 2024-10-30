<script setup lang="ts">
import { useBuilderStore } from '~/stores/builderStore';

const authStore = useAuthStore()
const builderStore = useBuilderStore()


watch(
  () => [builderStore.search], 
  () => {
    builderStore.curPage = 1
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
      <BaseAlphaBetaFilter
      @click="builderStore.isInputing = false" 
      v-model="builderStore.search"/>
      <input 
      type="text" 
      v-model="builderStore.search" 
      @change="builderStore.isInputing = true"
      class="w-full sm:max-w-[240px]" 
      :placeholder="$t('builder.list.searchBy.placeholder_bps')"/>
    </div>
    <template v-if="builderStore.isLoading">
      <div class="flex justify-center py-20">
        <BaseRippleProgress />
      </div>
    </template>
    <template v-else>
      <div
      v-if="builderStore.items.length" 
      class="flex flex-col gap-4 my-4">
        <BasePagination is-big v-model="builderStore.curPage" :total-pages="builderStore.totalPage"/>
        <BuilderItem :key="item.id" :item="item" v-for="item of builderStore.items" />
        <BasePagination is-big v-model="builderStore.curPage" :total-pages="builderStore.totalPage"/>
      </div>
      <div v-else 
      class="text-xl p-10 flex justify-center items-center">
        {{ $t('builder.list.not_found') }}
      </div>
    </template>
  </div>
</template>
