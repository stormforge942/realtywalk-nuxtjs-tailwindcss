<script setup lang="ts">
import { RecaptchaV2, useRecaptcha } from "vue3-recaptcha-v2";
const authStore = useAuthStore()

const { handleGetResponse, handleReset, handleExecute } = useRecaptcha();

const widgetIdRef = ref(0);

const handleWidgetId = (widgetId: number) => {
    handleGetResponse(widgetId);
    widgetIdRef.value = widgetId
};
 
const handleLoadCallback = (response: any) => {
    authStore.recaptchaToken = response as string
    authStore.isValid = true;
};

const handleErrorCalback = () => {
    authStore.isValid = false;
}

const handleExpiredCallback = () => {
    handleReset(widgetIdRef.value)
    authStore.isValid = false;
}

onMounted(() => {
    authStore.isValid = false;
    authStore.recaptchaToken = ''
    eventBus.on(RESET_RECAPTCHA, () => {
        authStore.isValid = false
        handleReset(widgetIdRef.value)
    })
})

onUnmounted(() => {
    eventBus.off(RESET_RECAPTCHA)
})
</script>

<template>
    <RecaptchaV2 
    @error-callback="handleErrorCalback"
    @expired-callback="handleExpiredCallback"
    @load-callback="handleLoadCallback"
    @widget-id="handleWidgetId" />
</template>