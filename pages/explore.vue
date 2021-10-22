<template>
  <div class="page__container">
    <section class="w-1/2 mx-auto flex flex-wrap">
      <utils-input
        class="w-full"
        icon="magnify"
        placeholder="Search for type, instrument or keyword"
        @update:value="search = $event"
      />
      <div>
        <p>{{suggested_instruments}}</p>
        <p>{{suggested_types}}</p>
      </div>
    </section>

    <section class="mt-36 flex flex-col justify-center items-center">
      <h1 class="small">Sound explorer</h1>
      <h5 class="mt-3 small">Find your next preset or search for any type, instrument, etc.</h5>
    </section>

    <section v-show="false" class="mt-36">
      <!-- TODO: show if there is something to show -->
      <!-- tab: keyword in subtype & comment / preset name / type / instrument / bank name / designer -->
      <utils-tabs
        class="w-96"
        :headers="[{id: 'tab_one', name: 'Presets'}, {id: 'tab_two', name: 'Tab Two'}, {id: 'tab_three', name: 'Tab Three'}]"
      >
        <template #tab_one> One </template>
        <template #tab_two> Two </template>
        <template #tab_three> Three </template>
      </utils-tabs>
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

    this.instrument_list = Object.keys(this.instrument_reduced);
    this.type_list = Object.keys(this.type_reduced);
  },

  data: () => ({
    search: "",

    presets: [],
    bank_name_reduced: [],
    type_reduced: [],
    instrument_reduced: [],

    type_list: [],
    instrument_list: [],

    suggested_instruments: [],
    suggested_types: [],
  }),

  watch: {
    search: function (search) {
      if (search.length >= 2) {
        this.suggested_instruments = this.instrument_list.filter((el) =>
          el.toLowerCase().includes(search.toLowerCase())
        );
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.page__container {
  @apply max-w-6xl;
}
</style>