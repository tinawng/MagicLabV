<template>
  <div class="preset_player__container">
    <ui-button-icon class="mr-1" small icon="chevron-left" />
    <ui-button-icon class="mr-6" small icon="chevron-right" />
    <div class="mr-4 flex flex-col justify-center items-end">
      <h2>Blanket</h2>
      <h5>Clavinet V · Keys</h5>
    </div>
    <img class="preset_player__thumbnail" src="/images/tokyo_88.jpg" alt="thumbnail" />
  </div>
</template>

<script>
export default {
  async fetch() {
    this.preset = await this.$http.$get("json/preset.json");
  },

  data: () => ({
    preset: {},
  }),
};
</script>

<style lang="postcss" scoped>
.preset_player__container {
  @apply h-24;
  @apply p-4;
  @apply bg-brand-100 rounded-lg;
  @apply flex items-center;
}
.preset_player__thumbnail {
  @apply h-full;
}
</style>