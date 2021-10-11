<template>
  <div class="nav_drawer__container">
    <!-- <div class="nav_drawer__brand">
      <ui-icon class="ml-0.5 mr-1" variant="disc" :size="44" />
      <h3 class="text-base font-extrabold">Contrast.</h3>
    </div> -->

    <div class="nav_drawer__menu">
      <div class="nav_drawer__item">
        <ui-icon class="nav_drawer__item__icon" variant="home" />
        <h3>Home</h3>
      </div>
      <div class="nav_drawer__item">
        <ui-icon class="nav_drawer__item__icon" variant="grid" />
        <h3>Explore</h3>
      </div>
      <div class="nav_drawer__item">
        <ui-icon class="nav_drawer__item__icon" variant="shopping-bag" />
        <h3>Store</h3>
      </div>
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
  width: 85px;
  min-width: 85px;
  @apply py-4;
  @apply flex flex-col;
  @apply overflow-x-hidden;
  transition-property: width, min-width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.6s;
}
.nav_drawer__container:hover {
  min-width: 15rem;
  width: 15rem;
}

.nav_drawer__brand {
  @apply w-52;
  @apply mt-3 mb-5 mx-4;
  @apply flex items-center;
  @apply cursor-pointer;
}
.nav_drawer__item {
  @apply w-52;
  @apply mx-4 py-3 pl-3.5 pr-4;
  @apply flex items-center;
  @apply transition-colors;
  @apply cursor-pointer;
}
.nav_drawer__item:hover {
  @apply rounded-sm bg-brand-300;
}
.nav_drawer__item__icon {
  @apply h-6 w-6;
  @apply mr-4;
}
.nav_drawer__footer {
  @apply flex-grow;
  @apply flex flex-col justify-end;
}
</style>