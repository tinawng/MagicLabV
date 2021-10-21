<template>
  <div v-if="presets.length" class="preset_player__container">
    <utils-button-icon
      class="mr-1"
      rounded
      small
      icon="chevron-left"
      :disabled="preset_index == 0"
      :callback="()=>{--preset_index}"
    />
    <utils-button-icon
      class="mr-1"
      rounded
      small
      icon="chevron-right"
      :disabled="preset_index == presets.length-1"
      :callback="()=>{++preset_index}"
    />
    <div class="ml-auto mr-4 flex flex-col justify-center items-end">
      <transition name="slide-fade-custom" mode="out-in">
        <h2 :key="presets[preset_index].name" style="--transition-duration: 150ms">{{presets[preset_index].name}}</h2>
      </transition>
      <transition name="slide-fade-custom" mode="out-in">
        <h5
          class="text-right"
          :key="presets[preset_index].name"
          style="--transition-duration: 150ms; --transition-delay: 45ms"
        >
          {{presets[preset_index].instrument}} · <span class="capitalize">{{presets[preset_index].type}}</span>
        </h5>
      </transition>
    </div>
    <img class="preset_player__thumbnail" src="/images/tokyo_88.jpg" alt="thumbnail" />
  </div>
</template>

<script>
export default {
  async fetch() {
    this.presets = (await this.$http.$get("json/preset.json")).presets;
  },

  data: () => ({
    presets: [],
    preset_index: 0,
  }),
};
</script>

<style lang="postcss" scoped>
.preset_player__container {
  @apply h-20 w-80;
  @apply mt-4 p-4;
  @apply bg-brand-100 rounded-lg border border-brand-300;
  @apply flex items-center;
}
.preset_player__thumbnail {
  @apply h-full;
  @apply rounded;
}
</style>