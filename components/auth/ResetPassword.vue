<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import Swal from 'sweetalert2';
import type { InferType } from 'yup'

const authStore = useAuthStore()
const router = useRouter()

type Schema = InferType<typeof SignInWithPasswordSchema>

const state = reactive({
  email: '',
  password: '',
})
const recaptchaError = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  recaptchaError.value = !authStore.isValid
  if(authStore.isValid) {
    const data = await authStore.signInUsingPassword(event.data)
    if(data) {
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('token', data.token)
      router.push('/')
    } else {
      Swal.mixin({
        icon: 'error',
        title: 'There was an error',
        text: 'Invalid login details',
        confirmButtonColor: '#012e55'
      }).fire()
    }
  }
  eventBus.emit(RESET_RECAPTCHA)
}
</script>

<template>
  <UForm
    :schema="SignInWithPasswordSchema"
    :state="state"
    @submit="onSubmit"
    class="w-full max-w-[500px] px-6 mx-auto py-4 flex flex-col gap-y-6"
  >
    <UFormGroup :label="$t('auth.login.form.labels.email')" name="email">
      <input type="text" v-model="state.email" />
    </UFormGroup>
    <UFormGroup :label="$t('auth.login.form.labels.password')" name="password">
      <input type="password" v-model="state.password" />
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
      {{ $t('auth.login.btn_submit') }}
    </button>
    <div class="text-center">
      <NuxtLink to="/user/signin">{{
        $t('auth.login.link_login_without_password')
      }}</NuxtLink>
      <div>
        {{ $t('auth.login.text_remember') }}
        <NuxtLink to="/user/forgot-password">{{
          $t('auth.login.link_remember')
        }}</NuxtLink>
      </div>
      <div>
        {{ $t('auth.login.text_register') }}
        <NuxtLink to="/user/register">{{
          $t('auth.login.link_register')
        }}</NuxtLink>
      </div>
    </div>
  </UForm>
</template>

<style lang="css" scoped>
a {
  @apply text-blue-600 hover:text-primary cursor-pointer hover:underline normal-case;
}
</style>
