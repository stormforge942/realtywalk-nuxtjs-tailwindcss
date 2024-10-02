<script setup lang="ts">
import type { InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { SignUpOnlyEmailSchema, SignUpWithPasswordSchema } from '@/utils/schemas'

type Schema = InferType<typeof SignUpOnlyEmailSchema> | InferType<typeof SignUpWithPasswordSchema>

const state = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const hasPassword = ref(false);
const isAgree = ref(false);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
}
</script>

<template>
  <UForm
    :schema="hasPassword ? SignUpWithPasswordSchema : SignUpOnlyEmailSchema"
    :state="state"
    @submit="onSubmit"
    class="w-full max-w-[500px] px-6 mx-auto py-4 flex flex-col gap-y-4"
  >
    <UFormGroup :label="$t('auth.register.form.labels.name')" name="name">
      <input type="text" v-model="state.name" />
    </UFormGroup>
    <UFormGroup :label="$t('auth.register.form.labels.email')" name="email">
      <input type="text" v-model="state.email" />
    </UFormGroup>
    <UFormGroup v-if="hasPassword" :label="$t('auth.register.form.labels.password')" name="password">
      <input type="password" v-model="state.password" />
    </UFormGroup>
    <UFormGroup v-if="hasPassword" :label="$t('auth.register.form.labels.password_confirmation')" name="confirmPassword">
      <input type="password" v-model="state.confirmPassword" />
    </UFormGroup>
    <NuxtLink>
        <span @click="hasPassword = !hasPassword">
        {{
            hasPassword ? 
            $t('auth.register.dont_set_password'):
            $t('auth.register.set_password')
        }}
        </span>
    </NuxtLink>
    <label class="cursor-pointer">
        <input type="checkbox" v-model="isAgree"/>
        {{ $t('auth.register.form.labels.aggrement') }}
        <NuxtLink to="/terms-of-service">{{
          $t('auth.register.form.labels.link_tos')
        }}</NuxtLink>
        {{ $t('auth.register.form.labels.and') }}
        <NuxtLink to="/privacy-policy">{{
          $t('auth.register.form.labels.link_privacy_policy')
        }}</NuxtLink>
    </label>
    <button type="submit">{{ $t('auth.register.btn_submit') }}</button>
    <div>
        {{ $t('auth.register.text_registered') }}
        <NuxtLink to="/users/signin">{{
          $t('auth.register.link_registered')
        }}</NuxtLink>
    </div>
  </UForm>
</template>

<style lang="css" scoped>
a {
  @apply text-blue-600 hover:text-primary cursor-pointer hover:underline normal-case;
}
</style>
