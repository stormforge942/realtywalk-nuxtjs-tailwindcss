<template>
    <div class="hidden md:flex px-16 justify-center items-center text-white h-[50px] bg-primary">
        <div class="text-sm w-[280px]">
            &copy; Realty Walk &#124; {{ $t('footer.copyright') }}
        </div>
        <div>
            <NuxtLink to="/">{{ $t('menu.home') }}</NuxtLink>
            <NuxtLink to="/about">{{ $t('menu.about') }}</NuxtLink>
            <NuxtLink to="/neighborhoods">{{ $t('menu.neighborhoods') }}</NuxtLink>
            <NuxtLink to="/register">{{ $t('menu.register') }}</NuxtLink>
            <NuxtLink to="/signin">{{ $t('menu.sign_in') }}</NuxtLink>
            <NuxtLink to="/report-bug">{{ $t('menu.report_bug') }}</NuxtLink>
        </div>
    </div>
</template>

<style lang="css" scoped>
a {
    @apply px-2 mx-2 min-w-max hover:text-secondary font-semibold normal-case
}
</style>