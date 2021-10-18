<template>
  <div class="page__container">
    <div class="page__top_nav"></div>
    <section class="hero">
      <img class="hero__thumbnail" src="/images/cover.jpg" alt="cover" />
      <div>
        <h1>{{preset.title}}</h1>
        <h3 class="mt-2">{{preset.baseline}}</h3>
        <div class="mt-6 flex">
          <ui-button-icon icon="shopping-bag" />
        </div>
      </div>
    </section>

    <section class="mt-12 flex gap-x-12">
      <div class="info_panel">
        <div class="info_panel__nav">
          <h2
            class="info_panel__nav__item"
            :class="{'selected': info_panel_state == 'description'}"
            @click="info_panel_state = 'description'"
          >
            Bank infos
          </h2>
          <h2
            v-if="preset.presets"
            :class="{'selected': info_panel_state == 'presets'}"
            class="info_panel__nav__item"
            @click="info_panel_state = 'presets'"
          >
            Presets · {{preset.presets.length}}
          </h2>
        </div>
        <hr class="mb-4" />

        <transition name="slide-fade" mode="out-in">
          <div v-if="info_panel_state == 'description'" key="description">
            <h3 class="mt-12 mb-4">Description</h3>
            <h3 class="leading-relaxed">
              {{preset.description}}
            </h3>

            <h3 class="mt-12 mb-4">Details</h3>
            <h3>Designer: {{preset.designer}}</h3>
            <h3>Released: {{preset.date}}</h3>
          </div>
          <div v-else-if="info_panel_state == 'presets'" key="presets">
            <h3 class="mt-12 mb-4">Presets</h3>

            <h3 v-for="preset in preset.presets" :key="preset">{{preset}}</h3>
          </div>
        </transition>
      </div>
      <div style="flex: 1 1 35%">
        <h2 class="ml-1 mb-3">Instruments</h2>
        <div class="p-6 rounded-lg bg-brand-200 flex flex-wrap gap-x-6 gap-y-2">
          <h3 v-for="instrument in preset.instruments" :key="instrument">{{instrument}}</h3>
        </div>
        <h2 class="ml-1 mt-12 mb-3">Tags</h2>
        <div class="p-6 rounded-lg bg-brand-200 flex flex-wrap gap-x-6 gap-y-2">
          <h3 v-for="tag in preset.tags" :key="tag">{{tag}}</h3>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data: () => ({
    preset: {},
    info_panel_state: "description", // ["description", "presets"]
  }),

  async fetch() {
    this.preset = await this.$http.$get("json/preset.json");
  },
};
</script>

<style lang="postcss" scoped>
.page__top_nav {
  @apply h-24 w-full;
  @apply flex justify-start items-center;
}

.page__container {
  @apply w-full max-w-5xl;
  @apply mx-auto;
  @apply bg-brand-100;
  @apply overflow-scroll;
}
.hero {
  @apply w-full;
  @apply p-24;
  @apply flex justify-start items-center gap-x-12;
  @apply rounded-lg bg-brand-200;
}
.hero__thumbnail {
  @apply h-64 w-64;
  @apply shadow-xl;
}

.info_panel {
  flex: 1 1 65%;
}
.info_panel__nav {
  @apply flex gap-x-8;
}
.info_panel__nav__item {
  @apply pb-4;
  @apply border-b border-brand-800 border-opacity-0;
  @apply opacity-50;
  @apply transition-all cursor-pointer;
}
.info_panel__nav__item:hover {
  @apply opacity-80;
}
.info_panel__nav__item.selected {
  @apply opacity-100 border-opacity-100;
}
</style>
