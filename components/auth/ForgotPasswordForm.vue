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
    class="w-full max-w-[500px] px-6 mx-auto py-4 flex flex-col gap-y-6"
  >
    <div>{{ $t('auth.forgot_password.caption') }}</div>
    <UFormGroup :label="$t('auth.forgot_password.form.labels.email')" name="email">
      <input
        type="text"
        v-model="state.email"
      />
    </UFormGroup>
    <button type="submit">
      {{ $t('auth.forgot_password.btn_submit') }}
    </button>
    <div>
      {{ $t('auth.forgot_password.text_login') }}
      <NuxtLink
        to="/users/signin-with-password"
      >
        {{ $t('auth.forgot_password.link_login') }}
      </NuxtLink>
    </div>
  </UForm>
</template>

<style lang="css" scoped>
a {
  @apply text-blue-600 hover:text-primary cursor-pointer hover:underline normal-case;
}
</style>
