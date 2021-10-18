<template>
  <div class="button__container">
    <ui-icon class="h-5 w-5" :variant="icon"/>
  </div>
</template>

<script>
export default {
  props: {
    icon: String
  }
}
</script>

<style lang="postcss" scoped>
.button__container {
  @apply h-12 w-24;
  @apply rounded-lg border border-brand-300 bg-brand-100 text-brand-900;
  @apply flex justify-center items-center;
}
</style>