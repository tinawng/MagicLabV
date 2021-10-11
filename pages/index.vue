<template>
  <div class="w-full">
    <div class="page__top_nav">
      <h4>Preset Explorer</h4>
    </div>
    <div class="page__container">
      <tables-presets />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss">
.page__top_nav {
  @apply h-28 w-full;
  @apply flex justify-between items-center;
}

.page__container {
  @apply bg-brand-100;
  @apply py-24 px-16;
}
</style>
