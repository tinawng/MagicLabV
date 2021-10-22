<template>
  <div class="tabs__container">
    <div class="tabs__header">
      <h2
        v-for="header in headers"
        :key="header.id"
        class="tabs__header__item"
        :class="{'selected': header.id === selected_tab}"
        @click="selected_tab = header.id"
      >
        {{header.name}}
      </h2>
    </div>
    <hr class="mb-4" />
    <div v-for="header in headers" :key="header.id">
      <slot v-if="header.id === selected_tab" :name="header.id"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: { headers: Array },
  data: () => ({ selected_tab: "" }),
};
</script>

<style lang="postcss" scoped>
.tabs__container {
  @apply w-full;
}

.tabs__header {
  @apply flex gap-x-8;
}
.tabs__header__item {
  @apply pb-4;
  @apply border-b border-brand-800 border-opacity-0;
  @apply opacity-50;
  @apply transition-all cursor-pointer;
}
.tabs__header__item:hover {
  @apply opacity-80;
}
.tabs__header__item.selected {
  @apply opacity-100 border-opacity-100;
}
</style>