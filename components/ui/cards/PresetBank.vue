<template>
  <div class="card__container">
    <img class="h-36 shadow-xl" src="/images/lofi.jpg" alt="thumbnail" />
    <h3 class="mt-6">Lo-fi Nightlight</h3>
    <h5 class="mt-1">Sounds for sweet dreams</h5>
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
.card__container {
  @apply w-64;
  @apply p-10 pb-8;
  @apply bg-brand-100 border border-brand-300 rounded-lg;
  @apply flex flex-col items-center;
  @apply transition-all;
  @apply cursor-pointer;
}
.card__container:hover {
  @apply bg-brand-200 border-brand-500 border-opacity-30;
  @apply transform -translate-y-0.5;
}
.card__container:active {
  @apply shadow-inner;
  @apply transform translate-y-0;
}
</style>