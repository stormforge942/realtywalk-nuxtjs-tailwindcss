<script setup lang="ts">
import type { InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { ReportBugFormSchema } from '@/utils/schemas'

type Schema = InferType<typeof ReportBugFormSchema>

const state = reactive({
  name: '',
  email: '',
  url: '',
  bug: ''
})


async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
}
</script>

<template>
  <UForm
    :schema="ReportBugFormSchema"
    :state="state"
    @submit="onSubmit"
    class="w-full max-w-[500px] px-6 mx-auto py-4 flex flex-col gap-y-4"
  >
    <UFormGroup :label="$t('report_bug.name')" name="name">
      <input type="text" v-model="state.name" />
    </UFormGroup>
    <UFormGroup :label="$t('report_bug.email')" name="email">
      <input type="text" v-model="state.email" />
    </UFormGroup>
    <UFormGroup :label="$t('report_bug.url')" name="url">
      <input type="text" v-model="state.url" />
    </UFormGroup>
    <UFormGroup :label="$t('report_bug.bug')" name="bug">
      <textarea v-model="state.bug"></textarea>
    </UFormGroup>
    <button>{{ $t('report_bug.submit') }}</button>
  </UForm>
</template>

<style lang="css" scoped>
a {
  @apply text-blue-600 hover:text-primary cursor-pointer hover:underline normal-case;
}
input:not([type='checkbox']), textarea {
  @apply text-base w-full px-3 py-[6px] outline-none border-2 border-gray-300 focus:border-primary;
}
button {
  @apply text-base w-full bg-primary hover:bg-dark text-white text-center py-[6px] rounded-sm;
}
</style>
