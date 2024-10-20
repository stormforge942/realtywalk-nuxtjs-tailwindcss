<script setup lang="ts">
import { type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types'
import Swal from 'sweetalert2';

const {t} = useI18n()

const router = useRouter()
const authStore = useAuthStore()

type Schema = InferType<typeof PasswordChangeSchema>

const state = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  const success = await authStore.updatePassword(event.data)
  if(success) {
    await Swal.mixin({
        icon: 'success',
        title: t('profile.user.notifications.password_updated.title'),
        text: t('profile.user.notifications.password_updated.message'),
        confirmButtonColor: '#012e55',
        confirmButtonText: 'OK'
    }).fire()
    authStore.logout()
    localStorage.setItem('user', 'null')
    localStorage.setItem('token', '')
    router.push('/user/signin-with-password')
  } else {
    await Swal.mixin({
        icon: 'error',
        title: 'There was an error',
        text: 'Your current password is incorrect',
        confirmButtonColor: '#012e55',
        confirmButtonText: 'OK'
    }).fire()
  }
}
</script>

<template>
    <UForm
    :schema="PasswordChangeSchema"
    :state="state"
    @submit="onSubmit" 
    class="max-w-[50%] mx-auto flex flex-col gap-6 my-12">
        <UFormGroup :label="$t('profile.user.form.labels.current_password')" name="currentPassword">
            <input type="password"  placeholder="********" v-model="state.currentPassword">
        </UFormGroup>
        <UFormGroup :label="$t('profile.user.form.labels.new_password')" name="newPassword">
            <input type="password"  placeholder="********" v-model="state.newPassword"/>
        </UFormGroup>
        <UFormGroup :label="$t('profile.user.form.labels.password_confirmation')" name="confirmPassword">
            <input type="password"  placeholder="********" v-model="state.confirmPassword"/>
        </UFormGroup>
        <button type="submit" :disabled="authStore.isLoading" class="disabled:bg-gray-800">
            {{ authStore.isLoading ? $t('profile.user.btn_submit_processing') : $t('profile.user.btn_submit') }}
        </button>
    </UForm>
</template>