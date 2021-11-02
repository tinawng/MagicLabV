<template>
  <div class="page__container">
    <section class="flex flex-col justify-center items-center">
      <h1 class="small">Sound Store</h1>
      <h5 class="mt-3 small">collections of presets for your instruments</h5>
    </section>

    <section class="w-11/12 mt-12 mx-auto flex flex-wrap justify-between gap-y-2 gap-x-16">
      <div class="w-full"><h2 class="text-xl">New this month</h2></div>
      <cards-preset-bank-large v-for="i in 2" :key="i" class="flex-grow" @click.native="$router.push('/preset-bank/lo-fi-nightlight')" />
    </section>
    <section class="w-11/12 mt-8 mx-auto flex flex-wrap justify-between gap-6">
      <div class="w-full"><h2></h2></div>
      <cards-preset-bank v-for="i in 28" :key="i" @click.native="$router.push('/preset-bank/lo-fi-nightlight')" />
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
</style>