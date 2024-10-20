<script setup lang="ts">
import Swal from 'sweetalert2';
import type { FormSubmitEvent } from '#ui/types'
import type { InferType } from 'yup'

const authStore = useAuthStore();
const recaptchaError = ref(false)

type Schema = InferType<typeof AuthOnlyEmailSchema>

const state = reactive({
  email: '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  recaptchaError.value = !authStore.isValid
  if(authStore.isValid) {
    authStore.sendMagicLoginLink(event.data.email).then(() => {
      Swal.mixin({
        icon: 'success',
        title: 'Magic Link Sent!',
        text: 'Your magic link to sign in to RealtyWalk site has been sent to your email!',
        confirmButtonColor: '#012e55'
      }).fire()
    }).catch(() => {
      Swal.mixin({
        icon: 'error',
        title: 'There was an error',
        text: 'Invalid email',
        confirmButtonColor: '#012e55'
      }).fire()
    })
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
      {{ $t('auth.login.btn_submit_magic_link') }}
    </button>
    <div>
      {{ $t('auth.login.text_login_with_password') }}
      <NuxtLink to="/user/signin-with-password">
        {{ $t('auth.login.link_login_with_password') }}
      </NuxtLink>
    </div>
  </UForm>
</template>

<style lang="css" scoped>
a {
  @apply text-blue-600 hover:text-primary cursor-pointer hover:underline normal-case;
}
</style>
