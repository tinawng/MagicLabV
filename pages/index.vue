<template>
  <div class="w-full">
    <div class="page__top_nav">
      <h4>Presets</h4>
      <ui-icon class="h-4 w-4 mx-4" variant="chevron-right" :stroke="3.5"/>
      <h4>Explore</h4>
    </div>
    <div class="page__container">
      <tables-presets  class="flex-grow py-24 px-16"/>
      <div class="w-80 bg-brand-200"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss">
.page__top_nav {
  @apply h-28 w-full;
  @apply flex justify-start items-center;
}

.page__container {
  @apply bg-brand-100;
  @apply flex;
}
</style>
