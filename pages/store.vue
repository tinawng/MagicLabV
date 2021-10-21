<template>
  <div class="page__container">
    <section class="flex flex-col justify-center items-center">
      <h1 class="small">Sound Store</h1>
      <h5 class="mt-3 small">collections of presets for your instruments</h5>
    </section>

    <section class="mt-12 flex flex-wrap justify-center gap-6" @click="$router.push('/preset-bank/lo-fi-nightlight')">
      <ui-cards-preset-bank v-for="i in 28" :key="i" />
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
</style>