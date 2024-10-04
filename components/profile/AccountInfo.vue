<script setup lang="ts">
import { type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types'

type Schema = InferType<typeof ProfileSchema>

const state = reactive({
  name: '',
  avatar: new Blob()
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
}
</script>

<template>
    <UForm
    :schema="ProfileSchema"
    :state="state"
    @submit="onSubmit"
    class="max-w-[50%] mx-auto flex flex-col gap-6 my-12">
        <UFormGroup :label="$t('profile.user.form.labels.name')" name="name">
            <input type="text"  />
        </UFormGroup>
        <UFormGroup :label="$t('profile.user.form.labels.picture')" name="avatar">
            <input type="file" class="hidden" />
            <div class="w-full aspect-square border-2 border-gray-300">
                <NuxtImg />
            </div>
        </UFormGroup>
        <button type="submit">Update</button>
    </UForm>
</template>