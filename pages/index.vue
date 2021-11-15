<template>
  <div class="page__container">
      <section></section>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('settings/setApiPort',this.$route.query.api_port);
  }
}
</script>

<style lang="postcss" scoped>

</style>