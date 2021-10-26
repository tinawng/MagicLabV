<template>
  <div class="page__container">
    <section class="search__section">
      <utils-input
        class="w-full"
        icon="magnify"
        placeholder="Search for instrument, type or keyword"
        @update:value="search = $event"
      />
    </section>

    <section v-show="false" class="h-24 pt-4">
      <transition name="slide-fade">
        <div
          v-show="(exact_match_instrument || exact_match_type) && search.length"
          class="w-full flex justify-center items-center"
        >
          <utils-pill v-show="exact_match_instrument" class="mr-2">{{exact_match_instrument}}</utils-pill>
          <utils-pill v-show="exact_match_type" class="mr-2">{{exact_match_type}}</utils-pill>
          <h6>press tab to add filter</h6>
        </div>
      </transition>
    </section>

    <section class="filter__section">
      <transition name="slide-fade">
        <utils-tabs
          v-if="show_filters"
          :headers="[{id: 'instruments', name: 'Instruments'}, {id: 'types', name: 'Types'}]"
        >
          <template #instruments>
            <div class="flex flex-wrap gap-2">
              <utils-pill
                v-for="instrument in instrument_list"
                :key="instrument"
                interactive
                small
                :highlight="instrument_filter.includes(instrument)"
                @click.native="instrument_filter.push(instrument)"
              >
                {{instrument}}
              </utils-pill>
            </div>
          </template>
          <template #types>
            <div class="flex flex-wrap gap-2">
              <utils-pill
                v-for="type in type_list"
                :key="type"
                interactive
                small
                :highlight="type_filter.includes(type)"
                @click.native="type_filter.push(type)"
              >
                {{type}}
              </utils-pill>
            </div>
          </template>
        </utils-tabs>
      </transition>
      <utils-button-icon
        class="ml-auto"
        icon="filter"
        rounded
        small
        :enabled="show_filters"
        @click.native="show_filters = !show_filters"
      />
    </section>

    <section class="results__section">
      <div class="flex flex-col">
        <div v-for="preset in suggested_presets.slice(0, 100)" :key="preset.key_id" class="preset_row">
          <div class="flex items-center">
            <img class="h-7 w-7 mr-3 rounded" src="/images/lofi.jpg" alt="" />
            <h3>{{preset.preset_name}}</h3>
            <h4 class="mx-1">·</h4>
            <h5>{{preset.bank_name}}</h5>
          </div>
          <utils-icon class="mr-1 h-4 w-4 opacity-30" variant="heart" />
          <h5>{{preset.instrument}}</h5>
          <div class="flex flex-wrap items-center">
            <h5>{{preset.type}}</h5>
            <h4 class="mx-1">·</h4>
            <h6>{{preset.subtype}}</h6>
          </div>
          <h5>{{preset.designer}}</h5>
        </div>
      </div>
      <div v-if="suggested_preset_bank.length" class="ml-12 flex flex-wrap justify-end">
        <div v-for="preset_bank in suggested_preset_bank" :key="preset_bank">
          <cards-preset-bank v-for="i in 3" :key="i" class="mb-8" />
        </div>
      </div>
    </section>

    <section v-if="suggested_presets.length == 0" class="mt-12 flex flex-col justify-center items-center">
      <h1 class="small">Sound explorer</h1>
      <h5 class="mt-3 small">Find your next preset or search for any type, instrument, etc.</h5>
    </section>
    <section v-else></section>

    <section v-show="false" class="mt-36">
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

    suggested_presets: [],
    suggested_preset_bank: [],
    suggested_instruments: [],
    suggested_types: [],

    exact_match_instrument: "",
    exact_match_type: "",

    show_filters: false,
    instrument_filter: [],
    type_filter: [],
  }),

  watch: {
    search: function (search) {
      if (search.length >= 3) {
        this.suggested_presets = this.presets
          .filter((el) => {
            if (typeof el.preset_name === "number") el.preset_name = el.preset_name.toString();
            return (
              el.preset_name.toLowerCase().includes(search.toLowerCase()) ||
              el.subtype.toLowerCase().includes(search.toLowerCase())
            );
          })
          .sort((a, b) => a.f_order - b.f_order);
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
  @apply pt-32;
}
.search__section {
  @apply w-2/3;
  @apply mx-auto;
  @apply flex flex-wrap;
}

.filter__section {
  @apply w-2/3;
  @apply mb-12 mx-auto pt-4 pl-2 pr-1;
  @apply flex gap-4;
}

.results__section {
  @apply grid;
  grid-template-columns: 1fr auto;
}

.preset_row {
  @apply px-4 py-3;
  @apply border-b border-brand-300 rounded-lg;
  @apply grid items-center gap-4;
  grid-template-columns: 2fr auto 0.65fr 1fr 1fr;
  @apply transition-colors;
  @apply cursor-pointer;
}

.preset_row:hover {
  @apply bg-brand-200;
}

/* 💫 Transition animations */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition-property: transform, opacity;
  transition-timing-function: ease;
  transition-duration: 0.2s;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-0.4rem);
  opacity: 0;
}
</style>