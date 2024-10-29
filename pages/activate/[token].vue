<script setup lang="ts">
import Swal from 'sweetalert2';

definePageMeta({
  layout: false,
})

useHead({
  title: 'Activate Account - Realty WALK',
})

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore()

const token = route.params.token as string;

onMounted(() => {
    if(authStore.authenticated) {
        router.push('/')
    }
    authStore.attemptActivateAccount(token)
    .then(async () => {
        await Swal.mixin({
            icon: 'success',
            title: 'Account Activated!',
            text: 'Your account is now active. You can log in using your credentials.',
            confirmButtonColor: '#012e55',
            confirmButtonText: 'Continue Sign In'
        }).fire()
        router.push('/user/signin')
    })
    .catch(async () => {
        await Swal.mixin({
            icon: 'success',
            title: 'There was an error!',
            confirmButtonColor: '#012e55',
            confirmButtonText: 'Continue'
        }).fire()
        router.push('/user/signin')
    })
})
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{ $t('activation.title') }}</template>
  </NuxtLayout>
</template>
