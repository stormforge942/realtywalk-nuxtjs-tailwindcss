<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { SignInWithPasswordSchema } from '@/utils/schemas'
import type { InferType } from 'yup'

type Schema = InferType<typeof SignInWithPasswordSchema>

const state = reactive({
  email: '',
  password: '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
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
    <button>{{ $t('auth.login.btn_submit') }}</button>
    <div>
      <NuxtLink to="/users/signin">{{
        $t('auth.login.link_login_without_password')
      }}</NuxtLink>
      <div>
        {{ $t('auth.login.text_remember') }}
        <NuxtLink to="/users/forgot-password">{{
          $t('auth.login.link_remember')
        }}</NuxtLink>
      </div>
      <div>
        {{ $t('auth.login.text_register') }}
        <NuxtLink to="/users/register">{{
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
input {
  @apply text-base w-full px-3 py-[6px] outline-none border-2 border-gray-300 focus:border-primary;
}
button {
  @apply text-base w-full bg-primary hover:bg-dark text-white text-center py-[6px] rounded-sm;
}
</style>
