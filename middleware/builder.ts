export default defineNuxtRouteMiddleware((to, from) => {
    if (!Boolean(useRuntimeConfig().public.IS_BUILDER)) {
        return '/';
    }
})