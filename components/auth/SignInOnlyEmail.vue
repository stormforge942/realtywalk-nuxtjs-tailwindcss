<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { AuthOnlyEmailSchema } from '@/utils/schemas'
import { RecaptchaV2, useRecaptcha } from "vue3-recaptcha-v2";
import type { InferType } from 'yup'

const authStore = useAuthStore();
const homeStore = useHomeStore();
console.log(homeStore.fetchFloodZoneLegends)

type Schema = InferType<typeof AuthOnlyEmailSchema>

const state = reactive({
  email: '',
})

const { handleGetResponse } = useRecaptcha();

const handleWidgetId = (widgetId: number) => {
  console.log("Widget ID: ", widgetId);
  handleGetResponse(widgetId);
};

onMounted(() => {

})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data

}
</script>

<template>
  <UForm
    :schema="AuthOnlyEmailSchema"
    :state="state"
    @submit="onSubmit"
    class="w-full max-w-[500px] px-6 mx-auto py-4 flex flex-col gap-y-6"
  >
    <UFormGroup :label="$t('auth.login.form.labels.email')" name="email">
      <input type="text" v-model="state.email" />
    </UFormGroup>
    <RecaptchaV2 @widget-id="handleWidgetId" />
    <button type="submit">
      {{ $t('auth.login.btn_submit_magic_link') }}
    </button>
    <div>
      {{ $t('auth.login.text_login_with_password') }}
      <NuxtLink to="/users/signin-with-password">
        {{ $t('auth.login.link_login_with_password') }}
      </NuxtLink>
    </div>
  </UForm>
</template>

<style lang="css" scoped>
a {
  @apply text-blue-600 hover:text-primary cursor-pointer hover:underline normal-case;
}
</style>
