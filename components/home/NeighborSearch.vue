<script setup lang="ts">
import { faAngleDown, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import {debounce} from 'lodash-es'

const homeStore = useHomeStore();

const isOpen = ref(false);
const searchWord = ref('');
const searchAborter = ref(new AbortController());
const loading = ref(false);
const result = ref<any[]>([]);
const element = ref<HTMLDivElement>();
const inputElement = ref<HTMLInputElement>()

const handleOutSideClick = (e: MouseEvent) => {
  if (element.value && !element.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

watch(isOpen, () => {
    if(isOpen) {
        inputElement.value?.focus();
        if(searchAborter.value) {
            searchAborter.value.abort()
        }
        searchAborter.value = new AbortController();
    } else {
        searchWord.value = '';
        loading.value = false;
    }
});

const fetchNeighbor = debounce(async (searchTerm: string) => {
    if(searchAborter.value) {
        searchAborter.value.abort();
        loading.value = false;
    }
    searchAborter.value = new AbortController();
    if(searchTerm) {
        try {
            loading.value = true
            const data = await $fetch(`${homeStore.API_ENDPOINT}/api/neighborhood/searchText/${searchTerm}/true`, {
                signal: searchAborter.value.signal
            })
            if(data) {
                result.value = data as any[];
            } else {
                result.value = [];
            }
        } catch {
            result.value = [];
        }
    }
}, 300)

watch(searchWord, (newSearch) => {
    if(newSearch) {
        fetchNeighbor(newSearch)
    } else {
        result.value = []
    }
})

onMounted(() => {
  document.addEventListener('click', handleOutSideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutSideClick)
})
</script>

<template>
    <div class="relative" ref="element">
        <div class="w-full h-10 flex">
            <input type="text" v-model="searchWord" ref="inputElement" @click="isOpen = true"/>
            <span
            @click="isOpen = !isOpen" 
            class="min-w-10 h-10 text-white flex items-center justify-center bg-primary">
                <FontAwesome :class="[isOpen && 'rotate-180']" :icon="faAngleDown"/>
            </span>
        </div>
        <div
        :class="[isOpen ? 'opacity-100 h-max' : 'opacity-0 h-0']"  
        class="absolute z-10 bg-white border border-primary shadow-md w-full mt-1 max-h-72 overflow-y-scroll px-3">
            <div 
            v-if="searchWord.length === 0"
            class="text-gray-800 text-sm min-h-10 inline-flex items-center gap-x-1 animate-pulse duration-200">
                <FontAwesome :icon="faMagnifyingGlass" class="mb-1"/>
                {{ $t('home.map.label_type_search') }}
            </div>
            <template v-else>
                <div
                v-if="loading" 
                class="text-gray-800 text-sm min-h-10 inline-flex items-center gap-x-1">
                    <FontAwesome :icon="faSpinner" class="animate-spin mb-1" />
                    {{ $t('home.map.label_loading') }}
                </div>
                <template v-else>
                    <div
                    v-if="result.length === 0" 
                    class="text-gray-800 text-sm min-h-10 inline-flex items-center">
                        {{ $t('home.map.label_no_result') }}
                    </div>
                    <div v-else>

                    </div>
                </template>
            </template>
        </div>
    </div>
</template>