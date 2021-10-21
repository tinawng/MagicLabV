<template>
  <div class="layout__container">
    <navigation-drawer />

    <div class="fixed-bar">
      <ui-button-icon rounded icon="arrow-left" :icon_stroke="2" @click.native="$router.go(-1)"/>
      <preset-player/>
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

.fixed-bar {
  @apply fixed top-0 left-56;
  @apply h-24;
  width: calc(100% - 14rem);
  @apply p-6;
  @apply flex justify-between items-center;
}

.page__container {
  @apply w-full ;
  @apply pt-28;
  @apply mx-auto;
  @apply bg-brand-100;
  @apply overflow-scroll;
}
</style>
