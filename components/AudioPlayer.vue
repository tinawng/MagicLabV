<template>
  <div class="flex items-center">
    <utils-button-icon
      rounded
      :disabled="!audio_player_ready"
      :icon="audio_player_is_playing ? 'pause' : 'play'"
      :icon_stroke="1.5"
      :callback="play"
    />
    <h5 class="ml-4">Audio Demo 0{{audio_index+1}}</h5>
    <utils-button-icon
      class="ml-auto mr-1"
      rounded
      small
      :disabled="!audio_player_ready"
      icon="chevron-left"
      @click.native="previous"
    />
    <utils-button-icon
      class=""
      rounded
      small
      :disabled="!audio_player_ready"
      icon="chevron-right"
      @click.native="next"
    />
    <audio ref="audio_player" :src="audio_src" />
  </div>
</template>

<script>
export default {
  props: {
    srcs: Array,
  },
  data: () => ({
    audio_index: 0,
    audio_player_ready: false,
    audio_player_is_playing: false,
  }),

  computed: {
    audio_player: function () {
      return this.$refs?.audio_player || null;
    },
    audio_src: function () {
      if (this.srcs) return this.srcs[this.audio_index];
      else return "";
    },
  },

  mounted() {
    this.audio_player.addEventListener("canplay", () => {
      this.audio_player_ready = true;
      this.audio_player_is_playing = false;
    });
    this.audio_player.addEventListener("play", () => {
      this.audio_player_is_playing = true;
    });
    this.audio_player.addEventListener("pause", () => {
      this.audio_player_is_playing = false;
    });
    this.audio_player.addEventListener("ended", () => {
      this.next();
      this.$nextTick(() => {
        this.play();
      });
    });

    this.$nuxt.$on("audio-player:play", () => {
      this.play();
    });
  },

  beforeDestroy() {
    this.$nuxt.$off("audio-player:play");
  },

  methods: {
    play() {
      if (this.audio_player_is_playing) this.audio_player.pause();
      else this.audio_player.play();
    },
    previous() {
      this.audio_index = this.audio_index > 0 ? --this.audio_index : this.srcs.length - 1;
    },
    next() {
      this.audio_index = this.audio_index < this.srcs.length - 1 ? ++this.audio_index : 0;
    },
  },
};
</script>

<style lang="postcss" scoped>
</style>