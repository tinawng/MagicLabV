<template>
  <div class="button__container">
    <div
      class="button__clickable"
      :class="{'button__rounded': rounded}"
      @mouseenter="mouse_hover = true"
      @mouseleave="mouse_hover = false"
    >
      <ui-icon class="button__icon" :variant="icon" :stroke="icon_stroke" />
    </div>
    <transition name="slide-fade-short" mode="out-in">
      <h5
        v-if="!this.$slots.text_hover || (!mouse_hover && !!this.$slots.text_hover)"
        key="0"
        class="pt-1.5 text-center font-medium"
      >
        <slot name="text"></slot>
      </h5>
      <h5 v-else key="1" class="pt-1.5 text-center font-medium">
        <slot name="text_hover"></slot>
      </h5>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    icon_stroke: {
      type: Number,
      default: 1.8,
    },
    color: String,
    rounded: Boolean,
  },

  data: () => ({
    mouse_hover: false,
  }),
};
</script>

<style lang="postcss" scoped>
.button__clickable {
  @apply h-12 w-24;
  @apply rounded-lg border border-brand-300 bg-brand-100 text-brand-900 shadow;
  @apply flex justify-center items-center;
  @apply transition-colors;
}
.button__clickable:hover {
  @apply border-brand-accent text-brand-accent;
  @apply transform -translate-y-0.5 transition-transform;
}
.button__clickable:active {
  @apply shadow-inner;
}

.button__rounded {
  @apply h-11 w-11;
  @apply rounded-full;
}
.button__icon {
  @apply h-5 w-5;
}
</style>