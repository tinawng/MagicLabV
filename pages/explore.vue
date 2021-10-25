<template>
  <div class="page__container">
    <section class="search__container">
      <utils-input
        class="w-full"
        icon="magnify"
        placeholder="Search for instrument, type or keyword"
        @update:value="search = $event"
      />
      <transition name="slide-fade-short">
        <div v-show="exact_match_instrument && search.length" class="w-full mt-4 flex justify-center items-center">
          <utils-pill class="mr-2">{{exact_match_instrument}}</utils-pill>
          <utils-pill class="mr-2">{{exact_match_type}}</utils-pill>
          <h6>press tab to add filter</h6>
        </div>
      </transition>
    </section>
    {{type_list}}

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
    this.instrument_reduced = this.presets.reduce((r, a) => {
      r[a.instrument] = r[a.instrument] || [];
      r[a.instrument].push(a);
      return r;
    }, Object.create(null));
    this.type_reduced = this.presets.reduce((r, a) => {
      r[a.type] = r[a.type] || [];
      r[a.type].push(a);
      return r;
    }, Object.create(null));

    this.preset_bank_list = Object.keys(this.bank_name_reduced);
    this.instrument_list = Object.keys(this.instrument_reduced);
    this.type_list = Object.keys(this.type_reduced);
  },

  data: () => ({
    search: "",

    presets: [],
    bank_name_reduced: [],
    instrument_reduced: [],
    type_reduced: [],

    instrument_list: [],
    type_list: [],

    suggested_preset: [],
    suggested_preset_bank: [],
    suggested_instruments: [],
    suggested_types: [],

    exact_match_instrument: "",
    exact_match_type: "",
  }),

  watch: {
    search: function (search) {
      if (search.length >= 2) {
        this.suggested_preset = this.presets.filter((el) => {
          if (typeof el.preset_name === "number") el.preset_name = el.preset_name.toString();
          return (
            el.preset_name.toLowerCase().includes(search.toLowerCase()) ||
            el.subtype.toLowerCase().includes(search.toLowerCase())
          );
        });
        this.suggested_preset_bank = this.preset_bank_list.filter((el) =>
          el.toLowerCase().includes(search.toLowerCase())
        );
        this.suggested_instruments = this.instrument_list.filter((el) =>
          el.toLowerCase().includes(search.toLowerCase())
        );
        this.suggested_types = this.type_list.filter((el) => el.toLowerCase().includes(search.toLowerCase()));

        this.exact_match_instrument = this.instrument_list.find((el) => el.toLowerCase() === search.toLowerCase());
        this.exact_match_type = this.type_list.find((el) => el.toLowerCase() === search.toLowerCase());
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.page__container {
  @apply max-w-6xl;
}
.search__container {
  @apply w-2/3;
  @apply mx-auto;
  @apply flex flex-wrap;
}
</style>