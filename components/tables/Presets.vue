<template>
  <div class="data_table__container">
    <div class="data_table__header">
      <div v-for="header in headers" :key="header.name">
        <h5>{{ header.name }}</h5>
        <div v-if="header.sorter" class="flex flex-col">
          <utils-button
            :size="0.75"
            icon="chevron-up"
            :icon_size="14"
            @click.native="
              () => {
                orderBy(header.sorter, 'asc');
              }
            "
          />
          <utils-button
            :size="0.75"
            icon="chevron-down"
            :icon_size="14"
            @click.native="
              () => {
                orderBy(header.sorter, 'desc');
              }
            "
          />
        </div>
      </div>
    </div>

    <div
      class="data_table__row"
      v-for="(preset, index) in preset_list.slice(0, 100)"
      :key="index"
      :ref="`table-row-${index}`"
      @click="selectRow(index)"
    >
      <h3>⭐</h3>
      <h3>⭐</h3>
      <h3>{{preset.preset_name}}</h3>
      <h3>{{preset.type}}</h3>
      <h3>{{preset.designer}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    this.preset_list = await this.$http.$get("json/presets.json");
  },

  data: () => ({
    headers: [
      { name: "Fav.", sorter: "favorite" },
      { name: "Feat.", sorter: "f_order" },
      { name: "Name", sorter: "name" },
      { name: "Type", sorter: "type" },
      { name: "Designer", sorter: "designer" },
    ],
    preset_list: [],
  }),

  methods: {
    getRowsDOMElementsList() {
      var dom_elements_list = [];
      for (const ref in this.$refs) {
        dom_elements_list.push(this.$refs[ref][0]);
      }
      return dom_elements_list;
    },
    orderBy(header, direction) {
      this.preset_list = this.preset_list.sort((a, b) => {
        var res = a[header] > b[header];
        res = res == 0 ? res - 1 : res;
        return direction == "asc" ? res : -res;
      });

      // this.getRowsDOMElementsList().forEach((el) => {
      //   el.classList.add("data_table__row_hide");
      // });

      // 💫 Wait for animation to end
      // setTimeout(() => {
      //   this.preset_list = this.preset_list.sort((a, b) => {
      //     var res = a[header] > b[header];
      //     res = res == 0 ? res - 1 : res;
      //     return direction == "asc" ? res : -res;
      //   });
      //   setTimeout(() => {
      //     // this.getRowsDOMElementsList().forEach((el) => {
      //     //   el.classList.remove("data_table__row_hide");
      //     // });
      //   }, 50);
      // }, 300);
    },
    selectRow(index) {
      this.getRowsDOMElementsList().forEach((el) => {
        el.classList.remove("data_table__row_selected");
      });
      this.$refs[`table-row-${index}`][0].classList.add("data_table__row_selected");
    },
    reviewMethodIcon(review_method) {
      switch (review_method) {
        case "note-and-comment":
          return "star-empty";
        case "closest":
          return "order";
        default:
          return "ab";
      }
    },
    openModal(selected_recording) {
      this.$nuxt.$emit("modal-open:recording", selected_recording);
    },
  },
};
</script>

<style lang="postcss" scoped>
.data_table__container {
  @apply max-h-screen;
  @apply overflow-scroll;
}

.data_table__header {
  @apply mx-10 pb-6;
  @apply grid;
  grid-template-columns: 6rem 6rem 1fr 1fr 1fr;
}
.data_table__header > * {
  @apply mr-4 pr-3;
  @apply flex justify-between;
}
.data_table__header > :last-of-type {
  @apply border-none;
}

.data_table__row {
  @apply h-14;
  @apply px-10;
  @apply grid items-center;
  grid-template-columns: 6rem 6rem 1fr 1fr 1fr;
  @apply cursor-pointer;
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.15s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}
.data_table__row:hover,
.data_table__row_selected {
  @apply bg-brand-800 text-brand-100;
}
.data_table__row:active {
  @apply bg-brand-900 text-brand-100;
}
.data_table__row_hide {
  @apply opacity-0;
}
.data_table__row__icon {
  @apply h-12 w-12;
  @apply mr-4;
  @apply bg-brand-100 rounded-full;
  @apply flex justify-center items-center;
  @apply text-xl;
}
</style>