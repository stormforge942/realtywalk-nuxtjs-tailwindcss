<script setup lang="ts">
import TextInput from '~/components/base/TextInput.vue';


definePageMeta({
    layout: false,
})

useHead({
    title: 'User Sign in - Realty Walk'
})

const verified = ref(false);
const recaptchaError = ref(false);

const onVerify = (response: any) => {
    if (response) {
    verified.value = true;
    recaptchaError.value = false;
    //this.recaptchaResponse = response;
    }
}

const onError = () => {
    verified.value = false;
    //recaptchaResponse.value = null;
}

const onExpired = () => {
    verified.value = false;
    //this.recaptchaResponse = null;
}
</script>

<template>
    <NuxtLayout name="main">
        <template #header>{{ $t('auth.login.title') }}</template>
        <div class="w-full max-w-[400px] mx-auto">
            <TextInput label="Email" type="text"/>

            <button class="text-base w-full bg-primary text-white text-center py-[6px] rounded-sm">
                {{ $t('auth.login.btn_submit_magic_link') }}
            </button>
            <div>{{ $t('auth.login.text_login_with_password') }} 
                <span class="text-blue-600 hover:text-blue-800 cursor-pointer hover:underline">
                    {{ $t('auth.login.link_login_with_password') }}
                </span>
            </div>
        </div>
    </NuxtLayout>
</template>