<template>
  <div class="relative">
    <slot />
    <transition name="zoom">
      <span
        v-if="value"
        class="absolute -top-1 -right-1 h-3 w-3  rounded-full  flex justify-center items-center text-2xs transition-colors"
        :class="[dark ? 'bg-brand-800 bg-opacity-80 text-brand-100' : ' bg-brand-100 text-brand-800 border border-brand-400']"
        >{{value}}</span
      >
    </transition>
  </div>
</template>

<script>
export default {
  props: { value: Number, dark: Boolean },
};
</script>

<style lang="postcss" scoped>
/* 💫 Transition animations */
.zoom-enter-active,
.zoom-leave-active {
  transition-property: transform;
  transition-timing-function: ease;
  transition-duration: 0.1s;
}
.zoom-enter,
.zoom-leave-to {
  transform: scale(0.5);
}
</style>