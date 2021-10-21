<template>
  <div class="page__container">
    <section class="hero">
      <img class="hero__thumbnail" src="/images/lofi.jpg" alt="thumbnail" />
      <div>
        <h1>{{preset.title}}</h1>
        <h3 class="mt-3">{{preset.baseline}}</h3>
        <div class="mt-8 flex gap-x-6">
          <ui-button-icon icon="headphones" color="#518ECC" @click.native="playAudioDemo">
            <template #text> Listen </template>
            <template #text_hover> Listen to demos </template>
          </ui-button-icon>
          <ui-button-icon icon="synth" color="#518ECC" @click.native="highlightPlayablePresets">
            <template #text> Try </template>
            <template #text_hover> Try presets </template>
          </ui-button-icon>
          <ui-button-icon icon="shopping-bag" color="#518ECC">
            <template #text> ${{preset.price}} </template>
            <template #text_hover> Buy </template>
          </ui-button-icon>
        </div>
      </div>
    </section>

    <section class="mt-12 flex gap-x-12">
      <div class="details_panel">
        <div class="details_panel__nav">
          <h2
            class="details_panel__nav__item"
            :class="{'selected': details_panel_state == 'description'}"
            @click="details_panel_state = 'description'"
          >
            Bank infos
          </h2>
          <h2
            v-if="preset.presets"
            :class="{'selected': details_panel_state == 'presets'}"
            class="details_panel__nav__item"
            @click="details_panel_state = 'presets'"
          >
            Presets · {{preset.presets.length}}
          </h2>
        </div>
        <hr class="mb-4" />

        <transition name="slide-fade" mode="out-in">
          <!-- ~~~~~~~ Description Panel ~~~~~~~ -->
          <div v-if="details_panel_state == 'description'" key="description">
            <h3 class="mt-12 mb-4">Audio demo</h3>
            <audio-player id="audio-player" :srcs="preset.audio_demos" />
            <h3 class="mt-12 mb-4">Description</h3>
            <h3 class="leading-relaxed">
              {{preset.description}}
            </h3>
            <h3 class="mt-12 mb-4">Details</h3>
            <h3>Designer: {{preset.designer}}</h3>
            <h3>Released: {{preset.date}}</h3>
          </div>

          <!-- ~~~~~~~ Presets Panel ~~~~~~~ -->
          <div v-else-if="details_panel_state == 'presets'" key="presets" ref="preset_list">
            <h3 class="mt-12 mb-4"></h3>

            <div v-for="(preset, index) in preset.presets" :key="preset.name" class="mb-8" :ref="ref => { 'presets' }">
              <div class="mb-2 ml-1 flex items-center">
                <h3 class="font-medium">{{preset.name}}</h3>
                <h5 class="ml-2">
                  for {{preset.instrument}} <span class="mx-1">·</span> <span class="capitalize">{{preset.type}}</span>
                </h5>
                <h3
                  v-if="preset.playable"
                  class="ml-auto flex items-center"
                  :class="{'bounce': preset.playable}"
                  :style="`--anim-delay: ${index*0.4}s`"
                >
                  <ui-icon class="h-4 w-4 mr-1" variant="synth" />Try it
                </h3>
              </div>
              <div class="p-3 border rounded-lg">
                <h4 class="leading-relaxed">{{preset.comment}}</h4>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div style="flex: 1 1 35%">
        <h3 class="ml-1 mb-3">Instruments</h3>
        <div class="p-6 rounded-lg bg-brand-200 flex flex-wrap gap-x-6 gap-y-2">
          <NuxtLink tag="a" v-for="instrument in preset.instruments" :key="instrument" to="/">
            <h4>{{instrument}}</h4>
          </NuxtLink>
        </div>
        <h3 class="ml-1 mt-12 mb-3">Tags</h3>
        <div class="p-6 rounded-lg bg-brand-200 flex flex-wrap gap-x-6 gap-y-2">
          <NuxtLink tag="a" v-for="tag in preset.tags" :key="tag" to="/">
            <h4>{{tag}}</h4>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  async fetch() {
    this.preset = await this.$http.$get("json/preset.json");
  },

  data: () => ({
    preset: {},
    details_panel_state: "description", // ["description", "presets"]
  }),

  methods: {
    playAudioDemo() {
      let wait_for_transition = false;
      if (this.details_panel_state !== "description") {
        this.details_panel_state = "description";
        wait_for_transition = true;
      }

      // 💫 Wait for transition animation to end
      setTimeout(
        () => {
          this.$nuxt.$emit("audio-player:play");
          // this.$el.querySelectorAll("#audio-player")[0].scrollIntoView({ behavior: "smooth", block: "center" });
        },
        wait_for_transition ? 600 : 0
      );
    },
    highlightPlayablePresets() {
      if (this.details_panel_state === "presets") {
        // Get all playable preset divs
        let els = this.$refs.preset_list.querySelectorAll(".bounce");
        // Remove previous animation class
        els.forEach((el) => el.classList.remove("bounce"));
        // Scroll to the first one
        els[0].scrollIntoView({ behavior: "smooth" });
        // Add animation class on next tick
        this.$nextTick(() => {
          els.forEach((el) => el.classList.add("bounce"));
        });
      } else {
        this.details_panel_state = "presets";
        // 💫 Wait for transition animation to end
        setTimeout(() => {
          // Scroll to the first one
          this.$refs.preset_list.querySelectorAll(".bounce")[0].scrollIntoView({ behavior: "smooth", block: "center" });
        }, 600);
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.page__container {
  @apply max-w-5xl;
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

.details_panel {
  flex: 1 1 65%;
}
.details_panel__nav {
  @apply flex gap-x-8;
}
.details_panel__nav__item {
  @apply pb-4;
  @apply border-b border-brand-800 border-opacity-0;
  @apply opacity-50;
  @apply transition-all cursor-pointer;
}
.details_panel__nav__item:hover {
  @apply opacity-80;
}
.details_panel__nav__item.selected {
  @apply opacity-100 border-opacity-100;
}

.bounce {
  animation: bounce 0.8s ease-in-out calc(0.5s + var(--anim-delay));
}
</style>
