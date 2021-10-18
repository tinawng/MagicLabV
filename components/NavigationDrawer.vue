<template>
  <div class="nav_drawer__container">
    <!-- <div class="nav_drawer__brand">
      <ui-icon class="ml-0.5 mr-1" variant="disc" :size="44" />
      <h3 class="text-base font-extrabold">Contrast.</h3>
    </div> -->

    <div class="nav_drawer__menu">
      <NuxtLink tag="a" to="/" class="nav_drawer__item">
        <ui-icon class="nav_drawer__item__icon" variant="headphones" />
        <h3>Play</h3>
      </NuxtLink>
      <h3 class="nav_drawer__item">Stage</h3>
      <NuxtLink tag="a" to="/" class="nav_drawer__item">
        <ui-icon class="nav_drawer__item__icon" variant="list" />
        <h3>Playlist</h3>
      </NuxtLink>
      <NuxtLink tag="a" to="/" class="nav_drawer__item">
        <ui-icon class="nav_drawer__item__icon" variant="cast" />
        <h3>Live</h3>
      </NuxtLink>
      <h3 class="nav_drawer__item">Library</h3>
      <NuxtLink tag="a" to="/" class="nav_drawer__item">
        <ui-icon class="nav_drawer__item__icon" variant="home" />
        <h3>Home</h3>
      </NuxtLink>
      <NuxtLink tag="a" to="/" class="nav_drawer__item">
        <ui-icon class="nav_drawer__item__icon" variant="grid" />
        <h3>Explore</h3>
      </NuxtLink>
      <NuxtLink tag="a" to="/" class="nav_drawer__item">
        <ui-icon class="nav_drawer__item__icon" variant="shopping-bag" />
        <h3>Store</h3>
      </NuxtLink>
      <hr class="my-1 ml-6 w-2/3">
      <NuxtLink tag="a" to="/" class="nav_drawer__item">
        <ui-icon class="nav_drawer__item__icon" variant="heart" />
        <h3>Favorite</h3>
      </NuxtLink>
      <NuxtLink tag="a" to="/" class="nav_drawer__item">
        <ui-icon class="nav_drawer__item__icon" variant="folder" />
        <h3>My Presets</h3>
      </NuxtLink>
      <NuxtLink tag="a" to="/" class="nav_drawer__item">
        <ui-icon class="nav_drawer__item__icon" variant="history" />
        <h3>History</h3>
      </NuxtLink>
    </div>

    <!-- <div class="nav_drawer__footer">
      <div class="nav_drawer__item">
        <ui-icon class="nav_drawer__item__ui-icon" variant="log-out" :size="20" :stroke="2.5" />
        <h3>Log Out</h3>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
.nav_drawer__container {
  width: 14rem;
  min-width: 14rem;
  @apply pt-14 py-4;
  @apply border-r border-brand-400;
}

.nav_drawer__brand {
  @apply mt-3 mb-5 mx-4;
  @apply flex items-center;
  @apply cursor-pointer;
}
.nav_drawer__item {
  @apply mx-4 py-2.5 pl-3.5 pr-4;
  @apply flex items-center;
  @apply transition-colors;
  @apply cursor-pointer;
}
h3.nav_drawer__item {
  @apply mt-3;
}
a.nav_drawer__item:hover {
  @apply text-brand-800;
  @apply rounded-lg bg-brand-200;
  @apply transform -translate-y-0.5 transition-transform;
  transition-duration: 200ms;
}
.nav_drawer__item__icon {
  @apply h-4 w-4;
  @apply mr-4;
}
.nav_drawer__footer {
  @apply flex-grow;
  @apply flex flex-col justify-end;
}
</style>