<template>
  <div class="page__container">
    <section class="flex justify-center">
      <utils-input
        class="w-1/2"
        icon="magnify"
        placeholder="Search for type, instrument or keyword"
        @update:value="search = $event"
      />
    </section>
    <section class="mt-36 flex flex-col justify-center items-center">
      <h1 class="small">Sound explorer</h1>
      <h5 class="mt-3 small">Find your next preset or search for any type, instrument, etc.</h5>
    </section>

    <section>
      <!-- TODO: show if there is something to show -->
      <!-- tab: keyword in subtype & comment / preset name / type / instrument / bank name / designer -->
    </section>
  </div>
</template>

<script>
export default {
  async fetch() {
    this.presets = await this.$http.$get("json/presets.json");

    this.bank_name_reduced = this.presets.reduce((r, a) => {
      r[a.bank_name] = r[a.bank_name] || [];
      r[a.bank_name].push(a);
      return r;
    }, Object.create(null));
    this.type_reduced = this.presets.reduce((r, a) => {
      r[a.type] = r[a.type] || [];
      r[a.type].push(a);
      return r;
    }, Object.create(null));
    this.instrument_reduced = this.presets.reduce((r, a) => {
      r[a.instrument] = r[a.instrument] || [];
      r[a.instrument].push(a);
      return r;
    }, Object.create(null));
  },

  data: () => ({
    search: "",
    presets: [],
    bank_name_reduced: [],
    type_reduced: [],
    instrument_reduced: [],
  }),

  watch: {
    search: function (search) {
      // TODO: start search if search.length >= 3
    },
  },
};
</script>

<style lang="postcss" scoped>
</style>