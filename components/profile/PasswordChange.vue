<script setup lang="ts">
import { type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types'

type Schema = InferType<typeof PasswordChangeSchema>

const state = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
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
        <button type="submit">Update</button>
    </UForm>
</template>