<script setup lang="ts">
import { useReCaptcha } from 'vue-recaptcha-v3'

const recaptcha = ref<() => Promise<string>>()
onMounted(() => {
  const recaptchaInstance = useReCaptcha()

  recaptcha.value = async () => {
    await recaptchaInstance?.recaptchaLoaded()
    const token = await recaptchaInstance?.executeRecaptcha('bridge')
    return token || ''
  }
})
</script>

<template>
  <div class="w-full max-w-[400px] mx-auto">
    <BaseTextInput label="Email" type="text" />
    <BaseTextInput label="Password" type="password" />

    <button
      class="text-base w-full bg-primary text-white text-center py-[6px] rounded-sm"
    >
      {{ $t('auth.login.btn_submit_magic_link') }}
    </button>
    <div>
      {{ $t('auth.login.text_login_with_password') }}
      <span
        class="text-blue-600 hover:text-blue-800 cursor-pointer hover:underline"
      >
        {{ $t('auth.login.link_login_with_password') }}
      </span>
    </div>
  </div>
</template>
