<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import Swal from 'sweetalert2';
import type { InferType } from 'yup'

const route = useRoute()

const {t} = useI18n()
const authStore = useAuthStore()

type Schema = InferType<typeof ResetPasswordSchema>

const token = route.params.token

const state = reactive({
  email: '',
  password: '',
  cpassword: '',
  resetToken: token
})


async function onSubmit(event: FormSubmitEvent<Schema>) {
  const success = await authStore.passwordReset(event.data)
  if(success) {
    Swal.mixin({
      icon: 'success',
      title: 'Success!',
      text: 'Password Reset was successful',
      confirmButtonColor: '#012e55'
    }).fire()
  } else {
    Swal.mixin({
      icon: 'error',
      title: 'There was an error',
      text: 'Password Reset was failed',
      confirmButtonColor: '#012e55'
    }).fire()
  }
}
</script>

<template>
  <UForm
    :schema="ResetPasswordSchema"
    :state="state"
    @submit="onSubmit"
    class="w-full max-w-[500px] px-6 mx-auto py-4 flex flex-col gap-y-4"
  >
    <div class="text-center">{{ $t('auth.reset_password.caption') }}</div>
    <UFormGroup
      :label="$t('auth.reset_password.form.labels.email')"
      name="email"
    >
      <input type="text" v-model="state.email" disabled/>
    </UFormGroup>
    <UFormGroup
      :label="$t('auth.reset_password.form.labels.password')"
      name="password"
    >
      <input type="password" v-model="state.password" />
    </UFormGroup>
    <UFormGroup
      :label="$t('auth.reset_password.form.labels.password_confirmation')"
      name="cpassword"
    >
      <input type="password" v-model="state.cpassword" />
    </UFormGroup>

    <button
    :disabled="authStore.isLoading" 
    type="submit">
      <BaseCircleProgress 
      v-if="authStore.isLoading"
      class="text-white mb-1" size="md"/>
      {{ $t('auth.reset_password.btn_submit') }}
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
