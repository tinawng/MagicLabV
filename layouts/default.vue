<template>
  <div class="layout__container">
    <navigation-drawer />

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
