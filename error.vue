<script setup lang="ts">

const error = useError();

console.log(error.value)

</script>

<template>
  <NuxtLayout>
    <div class="prose">
        <template v-if="error?.statusCode === 404">
          <div class="w-screen px-[10%] h-[calc(100vh-170px)] flex flex-col items-center justify-center">
            <h1 class="text-7xl mb-4">404</h1>
            <p class="my-2 text-3xl text-center">{{ $t('pages.not_found.caption') }}</p>
            <NuxtLink to="/">{{ $t('general.navigation.back_to_home') }}</NuxtLink>
          </div>
        </template>
        <template v-else>
          <h1>Dang</h1>
                <p>
                  <strong>{{ error?.message }}</strong>
                </p>
          <p>It looks like something broke.</p>
          <p>Sorry about that.</p>
      </template>
    </div>
  </NuxtLayout>
</template>