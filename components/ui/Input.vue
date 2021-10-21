<template>
  <div class="input__container">
    <ui-icon class="h-full mr-2.5 text-brand-900" variant="magnify" />
    <input :class="{capitalize: capitalize}" :type="type" v-model="value" :name="name" :placeholder="placeholder" />
    <ui-icon class="h-full ml-2.5 text-brand-900" variant="x" />
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    width: Number,
    icon_right: Boolean,
    type: { type: String, default: "text" },
    name: String,
    placeholder: String,
    default_value: String,
    suggested_values: Array,
    disabled: Boolean,
    capitalize: Boolean
  },
};
</script>

<style lang="postcss" scoped>
.input__container {
  @apply relative;
  @apply h-10;
  @apply p-2.5;
  @apply bg-brand-200 rounded-lg;
  @apply flex items-center;
  @apply transition-colors;
}
.input__container:hover {
  @apply bg-brand-300;
}

input {
  @apply w-full;
  @apply text-sm text-brand-600;
}
</style>