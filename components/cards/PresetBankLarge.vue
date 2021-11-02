<template>
  <div class="card__container">
    <div class="p-10 pb-8 bg-brand-200 rounded-lg">
      <img class="h-36 w-36 shadow-xl" src="/images/lofi.jpg" alt="thumbnail" />
    </div>
    <div class="pl-10 flex flex-col">
      <h3 class="mt-2 text-xl">Lo-fi Nightlight</h3>
      <h3 class="mt-1">Sounds for sweet dreams</h3>
      <h5 class="mt-6">36 presets · 8 Instruments</h5>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
.card__container {
  @apply bg-brand-100 border border-brand-300 rounded-lg;
  @apply flex items-center;
  @apply transition-all;
  @apply cursor-pointer;
}
.card__container:hover {
  @apply bg-brand-150 border-brand-500 border-opacity-30;
  @apply transform -translate-y-0.5;
}
.card__container:active {
  @apply shadow-inner;
  @apply transform translate-y-0;
}
</style>