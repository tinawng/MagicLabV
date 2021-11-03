<template>
  <div class="nav_drawer__container">
    <div class="nav_drawer__brand">
      <img class="w-full" src="/images/analoglabv.png" alt="alv-logo" />
    </div>

    <div class="nav_drawer__menu">
      <NuxtLink tag="a" to="/" class="nav_drawer__item">
        <utils-icon class="nav_drawer__item__icon" variant="home" :stroke="1.5" />
        <h3>Home</h3>
      </NuxtLink>
      <NuxtLink tag="a" to="/explore" class="nav_drawer__item">
        <utils-icon class="nav_drawer__item__icon" variant="compass" :stroke="1.5" />
        <h3>Explore</h3>
      </NuxtLink>
      <NuxtLink tag="a" to="/store" class="nav_drawer__item">
        <utils-icon class="nav_drawer__item__icon" variant="shopping-bag" :stroke="1.5" />
        <h3>Store</h3>
      </NuxtLink>

      <hr class="w-2/3 mt-2 mb-1 ml-6" />

      <h3 class="nav_drawer__item">My Library</h3>
      <NuxtLink tag="a" to="/explore" class="nav_drawer__item">
        <utils-icon class="nav_drawer__item__icon" variant="heart" :stroke="1.5" />
        <h3>Favorites</h3>
      </NuxtLink>
      <NuxtLink tag="a" to="/explore" class="nav_drawer__item">
        <utils-icon class="nav_drawer__item__icon" variant="folder" :stroke="1.5" />
        <h3>My Presets</h3>
      </NuxtLink>
      <NuxtLink tag="a" to="/explore" class="nav_drawer__item">
        <utils-icon class="nav_drawer__item__icon" variant="history" :stroke="1.5" />
        <h3>History</h3>
      </NuxtLink>
      <NuxtLink tag="a" to="/" class="nav_drawer__item">
        <utils-icon class="nav_drawer__item__icon" variant="grid" :stroke="1.5" />
        <h3>My Banks</h3>
      </NuxtLink>
    </div>

    <!-- <div class="nav_drawer__footer">
      <div class="nav_drawer__item">
        <utils-icon class="nav_drawer__item__utils-icon" variant="log-out" :size="20" :stroke="2.5" />
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
  @apply py-4;
  @apply bg-brand-90 border-r border-brand-300;
}

.nav_drawer__brand {
  @apply my-3 ml-7 mr-10;
}
.nav_drawer__item {
  @apply mx-4 py-2.5 pl-3.5 pr-4;
  @apply flex items-center;
  @apply transition-colors cursor-pointer;
  transition-duration: 100ms;
}
h3.nav_drawer__item {
  @apply mt-3;
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