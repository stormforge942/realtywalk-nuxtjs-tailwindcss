<script setup lang="ts">
import { faFile } from '@fortawesome/free-solid-svg-icons';

const builderStore = useBuilderStore()
const builder = computed(() => builderStore.curBuilder)

const builderDocuments = computed(() => (builder.value.item?.media || []).filter(m => m.collection_name == "builder_documents"))
</script>

<template>
    <div>{{ builder.item?.profile_headline }}</div>
    <div v-html="builder.item?.descr "></div>
    <div v-if="builder.item?.website || builder.item?.email || builder.item?.phone">
        <NuxtLink 
        v-if="builder.item.website" 
        target="_blank"
        class="text-xl" 
        :href="builder.item.website">
            {{ builder.item?.website_label ? builder.item?.website_label : builder.item?.website }}
        </NuxtLink>
        <div v-if="builder.item?.email">
            <NuxtLink :to="`mailto:${builder.item?.email}}`">{{ builder.item?.email }}</NuxtLink>
            <span v-if="builder.item?.email_info">{{ builder.item?.email_info }}</span>
        </div>
        <div v-if="builder.item?.phone">
            <NuxtLink :to="`tel:${builder.item?.phone}`">{{ builder.item?.phone }}</NuxtLink>
            <span v-if="builder.item?.phone_info">{{ builder.item?.phone_info }}</span>
        </div>
        <div v-if="builder.item?.additional_phones"
        v-for="(phone, index) in builder.item?.additional_phones" :key="index">
            <NuxtLink :to="`tel:${phone.phone}`">{{ phone.phone }}</NuxtLink>
            <span v-if="phone.info">{{ phone.info }}</span>
        </div>
    </div>
    <div v-if="builder.item?.services">
        <span>{{ $t('builder.singleProperty.service_list') }}</span>
        <span>{{ builder.item?.services?.join(', ') }}</span>
    </div>

    <h4 class="font-semibold text-xl">{{ $t('builder.singleProperty.sectionTitles.title_2') }}</h4>
    <div v-if="builderDocuments.length" v-for="(builderDocument, builderDocumentIndex) in builderDocuments" :key="builderDocumentIndex">
        <NuxtLink 
        target="_BLANK" download
        :to="builderDocument.fullUrl">
            <FontAwesome :icon="faFile"/>
            {{ builderDocument.file_name }}
        </NuxtLink>
    </div>
    <div v-else>
        No records found
    </div>
</template>

<style lang="css" scoped>

a {
  @apply text-primary1 hover:text-primary cursor-pointer hover:underline normal-case;
}

</style>