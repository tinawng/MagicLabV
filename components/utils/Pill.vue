<template>
  <h5 v-if="small" class="pill__container" :class="{'pill__highlight': highlight, 'pill__interactive': interactive}">
    <slot />
  </h5>
  <h4 v-else class="pill__container" :class="{'pill__highlight': highlight, 'pill__interactive': interactive}">
    <slot />
  </h4>
</template>

<script>
export default {
  props: { small: Boolean, highlight: Boolean, interactive: Boolean },
};
</script>

<style lang="postcss" scoped>
.pill__container {
  @apply py-1 px-2;
  @apply bg-brand-200 rounded-lg;
}
.pill__highlight {
  @apply bg-brand-800 text-brand-100;
}
.pill__interactive {
  @apply cursor-pointer select-none;
}
</style>