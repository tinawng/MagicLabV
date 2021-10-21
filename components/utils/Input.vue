<template>
  <div class="input__container">
    <utils-icon class="h-full mr-2.5 text-brand-900" :variant="icon" />
    <input :class="{capitalize: capitalize}" :type="type" v-model="value" :name="name" :placeholder="placeholder" />
    <utils-icon class="h-full ml-2.5 text-brand-900" variant="x" @click.native="value = ''" />
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    type: { type: String, default: "text" },
    name: String,
    placeholder: String,
    disabled: Boolean,
    capitalize: Boolean,
  },
  data: () => ({ value: "" }),
  watch: {
    value: function (value) {
      this.$emit("update:value", value);
    },
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