<template>
  <div class="page__container">
    <section class="search__section">
      <utils-input
        class="w-full"
        icon="magnify"
        placeholder="Search for instrument, type or keyword"
        @update:value="search = $event"
      >
        <div
          v-if="suggested_filter && !filters.includes(suggested_filter)"
          class="pr-0.5 flex items-center cursor-pointer"
          @click="updateFilters(suggested_filter)"
        >
          <utils-icon class="h-2.5 w-2.5 mr-1" variant="plus" :stroke="2.5" />
          <span class="whitespace-nowrap">{{suggested_filter}}</span>
        </div>
      </utils-input>
    </section>

    <section class="filter__section" :style="`height: ${show_filters ? '12':'3'}rem`">
      <transition name="fade">
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
                :highlight="filters.includes(instrument)"
                @click.native="updateFilters(instrument)"
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
                :highlight="filters.includes(type)"
                @click.native="updateFilters(type)"
              >
                {{type}}
              </utils-pill>
            </div>
          </template>
        </utils-tabs>
      </transition>

      <utils-macaron class="ml-auto" :value="filters.length" :dark="!show_filters">
        <utils-button-icon
          icon="filter"
          rounded
          small
          :enabled="show_filters"
          @click.native="show_filters = !show_filters"
        />
      </utils-macaron>
    </section>

    <section class="results__section">
      <div class="flex flex-col">
        <div v-for="preset in suggested_presets.slice(0, results_limit)" :key="preset.key_id" class="preset_row">
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

    // If page is called with query params, we already got filters
    if(this.filters.length) this.updateSearch();
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
    suggested_filter: "",

    show_filters: false,
    filters: [],
    instrument_filter: [],
    type_filter: [],

    results_limit: 50
  }),

  watch: {
    search: function () {
      this.updateSearch();
    },

    filters: function () {
      this.updateSearch();
    },
  },

  created() {
    if (this.$route.query.filters)
      this.filters = this.$route.query.filters.split(',');
  },

  methods: {
    updateSearch() {
      if (this.search.length >= 3) {
        console.log("search length > 3");
        this.suggested_presets = this.presets
          .filter((el) => {
            if (typeof el.preset_name === "number") el.preset_name = el.preset_name.toString();
            return (
              el.preset_name.toLowerCase().includes(this.search.toLowerCase()) ||
              el.subtype.toLowerCase().includes(this.search.toLowerCase())
            );
          })
          .sort((a, b) => a.f_order - b.f_order);

        this.suggested_preset_bank = this.preset_bank_list.filter((el) =>
          el.toLowerCase().includes(this.search.toLowerCase())
        );

        this.suggested_filter =
          this.instrument_list.find((el) => el.toLowerCase() === this.search.toLowerCase()) ||
          this.type_list.find((el) => el.toLowerCase() === this.search.toLowerCase());
      }

      if (this.filters.length)
        this.suggested_presets = this.presets
          .filter((el) => this.filters.includes(el.instrument) || this.filters.includes(el.type))
          .sort((a, b) => a.f_order - b.f_order);
    },
    updateFilters(filter) {
      if (this.filters.includes(filter)) this.filters = this.filters.filter((el) => el !== filter);
      else this.filters.push(filter);
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
}

.filter__section {
  @apply w-2/3;
  @apply mb-8 mx-auto pt-4 pl-2 pr-1;
  @apply flex gap-4;
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  @apply overflow-hidden;
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
  transition-duration: 150ms;
  @apply cursor-pointer;
}

.preset_row:hover {
  @apply bg-brand-200;
}

/* 💫 Transition animations */
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-timing-function: ease;
  transition-duration: 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>