<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import Swal from 'sweetalert2';
import type { InferType } from 'yup'

const {t} = useI18n()
const authStore = useAuthStore()

type Schema = InferType<typeof AuthOnlyEmailSchema>

const state = reactive({
  email: '',
})
const recaptchaError = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  recaptchaError.value = !authStore.isValid
  if(authStore.isValid) {
    const success = await authStore.resetPassword(event.data.email)
    if(success) {
        Swal.mixin({
            icon: 'success',
            title: t('auth.forgot_password.notifications.sent.title'),
            text: t('auth.forgot_password.notifications.sent.message'),
            confirmButtonColor: '#012e55'
        }).fire()
    } else {
        Swal.mixin({
            icon: 'error',
            title: t('auth.forgot_password.notifications.error.title'),
            confirmButtonColor: '#012e55'
        }).fire()
    }
  }
  eventBus.emit(RESET_RECAPTCHA)
}
</script>

<template>
  <UForm
    :schema="AuthOnlyEmailSchema"
    :state="state"
    @submit="onSubmit"
    class="w-full max-w-[500px] px-6 mx-auto py-4 flex flex-col gap-y-6"
  >
    <div class="text-center">{{ $t('auth.forgot_password.caption') }}</div>
    <UFormGroup :label="$t('auth.login.form.labels.email')" name="email">
      <input type="text" v-model="state.email" />
    </UFormGroup>
    <span
    v-if="recaptchaError"
    class="text-red-500">{{ $t('general.captcha_help') }}</span>
    <BaseRecaptcha />
    <button
    :disabled="authStore.isLoading" 
    type="submit">
      <BaseCircleProgress 
      v-if="authStore.isLoading"
      class="text-white mb-1" size="md"/>
      {{ $t('auth.forgot_password.btn_submit') }}
    </button>
    <div class="text-center">
      {{ $t('auth.forgot_password.text_login') }}
      <NuxtLink to="/user/signin-with-password">
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
