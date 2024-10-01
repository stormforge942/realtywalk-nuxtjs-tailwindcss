<script lang="ts" setup>
defineProps({
    label: String,
    type: String,
    value: String,
    placeholder: String,
})
</script>

<template>
    <div class="flex flex-col w-full">
        <label v-if="label">{{ label }}</label>
        <input  
        :type="type" 
        :value="value"
        class="text-base px-3 py-[6px] outline-none border-2 border-gray-300 focus:border-primary"
        />
    </div>
</template>