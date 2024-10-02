<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { AuthOnlyEmailSchema } from '@/utils/schemas'
import { useReCaptcha } from 'vue-recaptcha-v3'
import type { InferType } from 'yup'

type Schema = InferType<typeof AuthOnlyEmailSchema>

const state = reactive({
  email: '',
})

const recaptcha = ref<() => Promise<string>>()
onMounted(() => {
  const recaptchaInstance = useReCaptcha()

  recaptcha.value = async () => {
    await recaptchaInstance?.recaptchaLoaded()
    const token = await recaptchaInstance?.executeRecaptcha('bridge')
    return token || ''
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(process.env.RECAPTCHA_SITE_KEY)
  if (recaptcha.value) {
    const token = await recaptcha.value()
    console.log(token)
  }
  console.log(event.data)
}
</script>

<template>
  <UForm
    :schema="AuthOnlyEmailSchema"
    :state="state"
    @submit="onSubmit"
    class="w-full max-w-[400px] mx-auto py-4 flex flex-col gap-y-6"
  >
    <UFormGroup label="Email" name="email">
      <input
        type="text"
        v-model="state.email"
      />
    </UFormGroup>
    <button
    >
      {{ $t('auth.login.btn_submit_magic_link') }}
    </button>
    <div>
      {{ $t('auth.login.text_login_with_password') }}
      <NuxtLink
        to="/users/signin-with-password"
      >
        {{ $t('auth.login.link_login_with_password') }}
      </NuxtLink>
    </div>
  </UForm>
</template>

<style lang="css" scoped>
a {
  @apply text-blue-600 hover:text-primary cursor-pointer hover:underline normal-case;
}
input {
  @apply text-base w-full px-3 py-[6px] outline-none border-2 border-gray-300 focus:border-primary;
}
button {
  @apply text-base w-full bg-primary hover:bg-dark text-white text-center py-[6px] rounded-sm;
}
</style>
