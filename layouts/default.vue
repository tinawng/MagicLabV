<template>
  <div class="layout__container">
    <navigation-drawer />

    <div class="fixed top-0 left-56 p-6 flex">
      <ui-button-icon rounded icon="arrow-left" :icon_stroke="2" />
      <preset-player />
    </div>

    <Nuxt />
  </div>
</template>

<style lang="postcss">
.layout__container {
  @apply max-h-screen;
  @apply min-h-screen;
  max-width: 100vw;
  @apply w-screen;
  min-width: 100vw;

  @apply flex overflow-hidden;
}
</style>
