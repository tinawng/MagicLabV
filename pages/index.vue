<template>
  <div class="page__container">
    <div class="page__top_nav"></div>
    <section class="page__hero">
      <img class="page__hero__thumbnail" src="/images/cover.jpg" alt="cover" />
      <div>
        <h1>Lo-fi Nightlight</h1>
        <h3 class="mt-2">Sounds for sweet dreams</h3>
      </div>
    </section>

    <section class="mt-12 flex gap-x-12">
      <div style="flex: 1 1 65%">
        <h2>Bank infos</h2>
        <hr class="my-4" />
        <h3 class="mt-12 mb-4">Description</h3>
        <h3 class="leading-relaxed">
          Chilled, piano, retro, tape
          <br>
          Kick back and bathe in vibes with a sublime selection of lo-fi keyboard presets
          for Analog Lab. Whether you’re studying or working, meditating or watching the world go by, breathe in the
          sounds of lush keyboards, mellow pads, and laid-back pianos, oozing with VHS ambience and retro cassette
          grain. Perfect for beat makers and hip hop producers.
        </h3>
        
        <h3 class="mt-12 mb-4">Details</h3>
        <h3>Designer: Victor Morello, Simon Gallifet</h3>
        <h3>Released: October 2021</h3>

      </div>
      <div style="flex: 1 1 35%">
        <h2 class="ml-1 mb-3">Instruments</h2>
        <div class="p-6 rounded-lg bg-brand-200">
          <h3>Analog Lab V</h3>
          <h3>Piano V</h3>
          <h3>Mini V</h3>
          <h3>Juno V</h3>
        </div>
        <h2 class="ml-1 mt-12 mb-3">Tags</h2>
        <div class="p-6 rounded-lg bg-brand-200">
          <h3>Electric Piano</h3>
          <h3>Keys</h3>
          <h3>Organ</h3>
          <h3>Pad</h3>
          <h3>Piano</h3>
          <h3>Sound Effects</h3>
          <h3>Strings</h3>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss">
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
.page__hero {
  @apply w-full;
  @apply p-24;
  @apply flex justify-start items-center gap-x-12;
  @apply rounded-lg bg-brand-200;
}
.page__hero__thumbnail {
  @apply h-64 w-64;
  @apply shadow-xl;
}
</style>
