<script setup lang="ts">

import { MaskInput } from 'vue-3-mask';
import Swal from 'sweetalert2';
import type { FormSubmitEvent } from '#ui/types'
import type { InferType } from 'yup'

const authStore = useAuthStore();
const propertyStore = usePropertyStore()
const recaptchaError = ref(false)

type Schema = InferType<typeof ScheduleViewSchema>

const state = reactive({
    email: '',
    message: '',
    name: '',
    phone_number: '',
    property_id: propertyStore.selectedProperty?.id || -1,
    scheduleDate: '',
    scheduleDateTime: '',
    scheduleTime: ''
})

onMounted(() => {
    const json = localStorage.getItem('schedule')
    const cache = json ? JSON.parse(json) as (typeof state) : null
    if(cache) {
        state.email = cache.email
        state.message = cache.message
        state.name = cache.name
        state.phone_number = cache.phone_number
        state.scheduleDate = cache.scheduleDate
        state.scheduleTime = cache.scheduleTime
    }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    event.data.scheduleDateTime = `${event.data.scheduleDate} ${event.data.scheduleTime}`
    console.log(event.data)
    localStorage.setItem('schedule', JSON.stringify(state))
    recaptchaError.value = !authStore.isValid
  if(authStore.isValid) {
    const success = await propertyStore.scheduleViewing(event.data).finally(() => eventBus.emit(OPEN_SCHEDULE_VIEWING, false))
    if(success) {
        Swal.mixin({
        icon: 'success',
        title: 'Success!',
        text: 'Your viewing request as been sent, an agent should be in touch soon.',
        confirmButtonColor: '#012e55'
      }).fire()
    } else {
        Swal.mixin({
        icon: 'error',
        title: 'There was an error',
        text: 'You can not schedule viewing for this property as it is not active',
        confirmButtonColor: '#012e55'
      }).fire()
    }
  }
  eventBus.emit(RESET_RECAPTCHA)
}

</script>

<template>
    <UForm
    :schema="ScheduleViewSchema"
    :state="state"
    @submit="onSubmit"
    class="flex flex-col gap-y-4 min-w-[400px]"
    >
        <UFormGroup :label="$t('schedule.listing.form.labels.date')" name="scheduleDate">
            <MaskInput mask="202#-##-##" type="text" v-model="state.scheduleDate" :placeholder="$t('schedule.listing.form.placeholders.date')"/>
        </UFormGroup>
        <UFormGroup :label="$t('schedule.listing.form.labels.time')" name="scheduleTime">
            <MaskInput mask="##:##" type="text" v-model="state.scheduleTime" :placeholder="$t('schedule.listing.form.placeholders.time')"/>
        </UFormGroup>
        <UFormGroup :label="$t('schedule.listing.form.labels.name')" name="name">
            <input type="text" v-model="state.name" :placeholder="$t('schedule.listing.form.placeholders.name')"/>
        </UFormGroup>
        <div>
            Fill either email or phone number below as contact information
        </div>
        <UFormGroup :label="$t('schedule.listing.form.labels.email')" name="email">
            <input type="text" v-model="state.email" :placeholder="$t('schedule.listing.form.placeholders.email')"/>
        </UFormGroup>
        <UFormGroup :label="$t('schedule.listing.form.labels.phone')" name="phone_number">
            <MaskInput type="text" 
            mask="###-###-####"
            v-model="state.phone_number" 
            :placeholder="'***-***-****'"/>
        </UFormGroup>
        <UFormGroup :label="$t('schedule.listing.form.labels.message')" name="message">
            <textarea v-model="state.message" :placeholder="$t('schedule.listing.form.placeholders.message')"></textarea>
        </UFormGroup>
        <span
        v-if="recaptchaError"
        class="text-red-500">{{ $t('general.captcha_help') }}</span>
        <BaseRecaptcha />
        <button
        @click="console.log(state)"
        :disabled="propertyStore.isSubmit" 
        type="submit">
        <BaseCircleProgress 
        v-if="propertyStore.isSubmit"
        class="text-white mb-1" size="md"/>
        {{ $t('schedule.listing.btn_submit') }}
        </button>
    </UForm>
</template>