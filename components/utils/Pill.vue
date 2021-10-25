<template>
  <h5 v-if="small" class="pill__container">
    <slot />
  </h5>
  <h4 v-else class="pill__container">
    <slot />
  </h4>
</template>

<script>
export default {
  props: { small: Boolean },
};
</script>

<style lang="postcss" scoped>
.pill__container {
  @apply py-1 px-2;
  @apply bg-brand-200 rounded-lg;
}
</style>