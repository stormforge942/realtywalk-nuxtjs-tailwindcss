<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore()

const token = route.params.token as string;

onMounted(async () => {
    if(authStore.authenticated) {
        router.push('/')
    }
    const data = await authStore.attemptMagicLogin(token)
    if(data) {
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', data.token)
        router.push('/user/signin')
    } else {
        setTimeout(() => {
            router.push('/user/signin')
        }, 1000)
    }
})

</script>

<template>
    <div class="flex items-center justify-center min-h-10">
        <p v-if="authStore.isLoading">Logging you in, please wait ...</p>
        <p v-else>Invalid or expired magic login link. Redirecting to login ...</p>
    </div>
</template>