<script lang="ts" setup>
defineProps({
    label: String,
    type: String,
    value: String,
})
</script>

<template>
    <div>
        <label v-if="label">{{ label }}</label>
        <input :type="type" :value="value"/>
    </div>
</template>