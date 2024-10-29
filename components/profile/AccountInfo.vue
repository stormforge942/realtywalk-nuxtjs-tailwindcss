<script setup lang="ts">
import { type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types'
import Swal from 'sweetalert2';

const {t} = useI18n()

const authStore = useAuthStore()

type Schema = InferType<typeof ProfileSchema>

const state = reactive<{
    name: string,
    picture: any
}>({
  name: '',
  picture: ''
})

const fileRef = ref<HTMLInputElement>()
const rawImgRef = ref()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  const success = await authStore.updateProfile(event.data)
  if(success) {
    localStorage.setItem('user', JSON.stringify(authStore.user))
    await Swal.mixin({
        icon: 'success',
        title: t('profile.user.notifications.success.title'),
        text: t('profile.user.notifications.success.message'),
        confirmButtonColor: '#012e55',
        confirmButtonText: 'OK'
    }).fire()
  } else {
    await Swal.mixin({
        icon: 'error',
        title: 'There was an error',
        text: 'Invalid profile information',
        confirmButtonColor: '#012e55',
        confirmButtonText: 'OK'
    }).fire()
  }
}

const onClickImage = () => {
    fileRef.value?.click()
}

const onFileChange = async (event: any) => {
    const file = event.target?.files?.[0]
    state.picture = file
    rawImgRef.value = URL.createObjectURL(file)
}

onMounted(() => {
    state.name = authStore.user?.name || ''
})
</script>

<template>
    <UForm
    :schema="ProfileSchema"
    :state="state"
    @submit="onSubmit"
    class="max-w-[80%] sm:max-w-[60%] mx-auto flex flex-col gap-6 my-12">
        <UFormGroup :label="$t('profile.user.form.labels.name')" name="name">
            <input type="text" v-model="state.name"/>
        </UFormGroup>
        <UFormGroup :label="$t('profile.user.form.labels.picture')" name="picture">
            <input 
            type="file" 
            class="hidden" 
            ref="fileRef"
            @change="onFileChange"  
            accept="image/*"/>
            <div 
            @click="onClickImage"
            class="w-full flex items-center justify-center aspect-square border-2 border-gray-300 hover:opacity-90 hover:border-dashed cursor-pointer min-h-24">
                <NuxtImg v-if="rawImgRef || authStore.user?.picture_path" :src="rawImgRef || authStore.user?.picture_path"/>
                <span v-else>Drag and drop or open image</span>
            </div>
        </UFormGroup>
        <button type="submit" :disabled="authStore.isLoading" class="disabled:bg-gray-800">
            {{ authStore.isLoading ? $t('profile.user.btn_submit_processing') : $t('profile.user.btn_submit') }}
        </button>
    </UForm>
</template>