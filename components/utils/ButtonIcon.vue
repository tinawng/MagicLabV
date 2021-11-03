<template>
  <div class="button__container">
    <div
      class="button__clickable"
      :class="{'button__rounded': rounded, 'button__small': small, 'button__disabled': disabled, 'button__enabled': enabled}"
      :style="css_vars"
      @mouseenter="mouse_hover = true"
      @mouseleave="mouse_hover = false"
      @click="callback"
    >
      <utils-icon class="button__icon" :variant="icon" :stroke="icon_stroke" />
    </div>
    <div v-if="!!this.$slots.text_hover">
      <transition name="slide-fade" mode="out-in">
        <h5 v-if="!mouse_hover" key="0" class="pt-1.5 text-center font-medium">
          <slot name="text"></slot>
        </h5>
        <h5 v-else key="1" class="pt-1.5 text-center font-medium">
          <slot name="text_hover"></slot>
        </h5>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    icon_stroke: { type: Number, default: 1.8 },
    color: { type: String, default: undefined },
    rounded: Boolean,
    small: Boolean,
    disabled: Boolean,
    enabled: Boolean,
    callback: { type: Function, default: () => {} },
  },
  data: () => ({
    mouse_hover: false,
  }),
  computed: {
    css_vars: function () {
      return (
        `--border-hover-color: ${this.color ? this.color : "hsla(0,0%,100%,0.1)"};` +
        `--color-hover-color: ${this.color ? this.color : "hsla(0,0%,100%,0.3)"};` +
        `--background-hover-color: ${this.color ? "hsla(0,0%,100%,0.07)" : "hsla(0,0%,100%,0.1)"};`
      );
    },
  },
};
</script>

<style lang="postcss" scoped>
.button__clickable {
  @apply h-12 w-24;
  @apply rounded-lg border text-brand-800 shadow;

  background-color: hsla(0, 0%, 100%, 0.1);
  border-color: hsla(0, 0%, 100%, 0.06);
  @apply flex justify-center items-center;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1) 0s;
  @apply cursor-pointer select-none;
}
.button__clickable:hover {
  border-color: var(--border-hover-color);
  color: var(--color-hover-color);
  background: var(--background-hover-color);

  @apply transform -translate-y-px;
}
.button__clickable:active {
  @apply shadow-inner;
  @apply text-brand-100;
  background: var(--color-hover-color);
}

.button__rounded {
  @apply h-11 w-11;
  @apply rounded-full;
}
.button__small.button__rounded {
  @apply h-7 w-7;
  @apply rounded-full;
}
.button__small:not(.button__rounded) {
  @apply h-7 w-11;
}

.button__icon {
  @apply h-5 w-5;
}
.button__small > .button__icon {
  @apply h-3.5 w-3.5;
}

.button__disabled {
  @apply opacity-40;
  @apply pointer-events-none;
}
.button__enabled {
  @apply bg-brand-800 text-brand-100;
}

/* 💫 Transition animations */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition-property: transform, opacity;
  transition-timing-function: ease;
  transition-duration: 0.1s;
}
.slide-fade-enter {
  transform: translateY(-0.2rem);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(0.2rem);
  opacity: 0;
}
</style>