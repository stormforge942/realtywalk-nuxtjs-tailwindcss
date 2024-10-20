<script setup lang="ts">
import type { InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import Swal from 'sweetalert2';

const authStore = useAuthStore()

const state = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})
const recaptchaError = ref(false)

const hasPassword = ref(false)
const isAgree = ref(false)

const onSuccess = () => {
  Swal.mixin({
        icon: 'success',
        title: 'Account Registered!',
        text: 'Your account has been successfully created. To complete the activation process, please check your email and click on the activation link we\'ve sent you. If you don\'t see the email, check your spam or junk folder.',
        confirmButtonColor: '#012e55'
      }).fire()
} 

const onFailed = () => {
  Swal.mixin({
        icon: 'error',
        title: 'There was an error',
        text: 'Something went wrong Please try again',
        confirmButtonColor: '#012e55'
      }).fire()
}

async function onSubmit(event: FormSubmitEvent<InferType<typeof SignUpWithPasswordSchema>>) {
  // Do something with event.data
  if(!isAgree) {
    Swal.mixin({
        icon: 'error',
        title: 'There was an error',
        text: 'Please agree to our Terms of Service and Privacy Policy',
        confirmButtonColor: '#012e55'
      }).fire()
  }
  recaptchaError.value = !authStore.isValid
  if(authStore.isValid) {
    const data = await authStore.createUser(event.data)
    if(data) {
      onSuccess()
    } else {
      onFailed()
    }
  }
  eventBus.emit(RESET_RECAPTCHA)
}

watch(() => [hasPassword], () => {
  state.password = ''
  state.confirmPassword = ''
})
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
    <UFormGroup
      v-if="hasPassword"
      :label="$t('auth.register.form.labels.password')"
      name="password"
    >
      <input type="password" v-model="state.password" />
    </UFormGroup>
    <UFormGroup
      v-if="hasPassword"
      :label="$t('auth.register.form.labels.password_confirmation')"
      name="confirmPassword"
    >
      <input type="password" v-model="state.confirmPassword" />
    </UFormGroup>
    <NuxtLink>
      <span @click="hasPassword = !hasPassword">
        {{
          hasPassword
            ? $t('auth.register.dont_set_password')
            : $t('auth.register.set_password')
        }}
      </span>
    </NuxtLink>
      <BaseCheckbox v-model="isAgree" color="primary">
        <span>
          {{ $t('auth.register.form.labels.aggrement') }}
          <NuxtLink to="/terms-of-service">{{
          $t('auth.register.form.labels.link_tos')
          }}</NuxtLink>
          {{ $t('auth.register.form.labels.and') }}
          <NuxtLink to="/privacy-policy">{{
          $t('auth.register.form.labels.link_privacy_policy')
          }}</NuxtLink>
        </span>
      </BaseCheckbox>
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
      {{ $t('auth.register.btn_submit') }}
    </button>
    <div class="text-center">
      {{ $t('auth.register.text_registered') }}
      <NuxtLink to="/user/signin">{{
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
