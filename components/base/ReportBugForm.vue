<script setup lang="ts">
import Swal from "sweetalert2"
import type { InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { ReportBugFormSchema } from '@/utils/schemas'

type Schema = InferType<typeof ReportBugFormSchema>

const config = useRuntimeConfig().public
const authStore = useAuthStore()

const state = reactive({
  name: '',
  email: '',
  url: '',
  body: '',
})

const isLoading = ref(false);

onMounted(() => {
  state.url = window.location.href;
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if(!authStore.isValid) {
    return
  }
  isLoading.value = true;
  try {
    await $fetch(`${config.API_ENDPOINT}/api/report-bug`, {
      method: 'POST',
      body: event.data
    })
    Swal.mixin({
        icon: 'success',
        title: 'Success!',
        text: 'Your bug report has been submitted.',
        confirmButtonColor: '#012e55'
      }).fire()
  } catch (e) {
    Swal.mixin({
        icon: 'error',
        title: 'There was an error',
        text: getErrorMessage(e),
        confirmButtonColor: '#012e55'
      }).fire()
  } finally {
    eventBus.emit(REPORT_MODAL, false)
    isLoading.value = false;
  }
  
}
</script>

<template>
  <UForm
    :schema="ReportBugFormSchema"
    :state="state"
    @submit="onSubmit"
    class="w-full max-w-[500px] min-w-[400px] px-6 mx-auto py-4 flex flex-col gap-y-4"
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
    <UFormGroup :label="$t('report_bug.bug')" name="body">
      <textarea v-model="state.body"></textarea>
    </UFormGroup>
    <BaseRecaptcha />
    <button type="submit">{{ $t('report_bug.submit') }}</button>
  </UForm>
</template>

<style lang="css" scoped>
a {
  @apply text-blue-600 hover:text-primary cursor-pointer hover:underline normal-case;
}
input:not([type='checkbox']),
textarea {
  @apply text-base w-full px-3 py-[6px] outline-none border-2 border-gray-300 focus:border-primary;
}
button {
  @apply text-base w-full bg-primary hover:bg-dark text-white text-center py-[6px] rounded-sm;
}
</style>
