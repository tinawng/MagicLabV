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
      :class="{'opacity-50': recording.is_reviewed}"
      v-for="(recording, index) in recording_list"
      :key="index"
      :ref="`table-row-${index}`"
      @click="
        selectRow(index);
        openModal(recording);
      "
    >
      <h4>date</h4>
      <div class="flex items-center">
        <div class="data_table__row__icon">{{ recording.title_emoji }}</div>
        <div class="flex items-center">
          <h3 class="mr-3 font-medium capitalize">{{ recording.title }}</h3>
          <h4 class="mr-3">•</h4>
          <h4>{{ recording.product }}</h4>
        </div>
        <utils-icon v-show="recording.is_hidden" class="ml-auto mr-7" variant="hidden" :size="16" />
      </div>
      <h3 v-if="recording.author" class="capitalize">
        {{ recording.author.firstname }} {{ recording.author.lastname }}
      </h3>
      <utils-icon class="mx-auto" :variant="reviewMethodIcon(recording.review_method)" :size="20" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    headers: [
      { name: "Fav.", sorter: "date" },
      { name: "Feat.", sorter: "date" },
      { name: "Name", sorter: "date" },
      { name: "Type", sorter: "product" },
      { name: "Designer", sorter: "author" }
    ],
    recording_list: [],
  }),
  async created() {
    //  TODO: get list
  },
  methods: {
    getRowsDOMElementsList() {
      var dom_elements_list = [];
      for (const ref in this.$refs) {
        dom_elements_list.push(this.$refs[ref][0]);
      }
      return dom_elements_list;
    },
    orderBy(header, direction) {
      this.getRowsDOMElementsList().forEach((el) => {
        el.classList.add("data_table__row_hide");
      });

      // 💫 Wait for animation to end
      setTimeout(() => {
        this.recording_list = this.recording_list.sort((a, b) => {
          var res = a[header] > b[header];
          res = res == 0 ? res - 1 : res;
          return direction == "asc" ? res : -res;
        });
        setTimeout(() => {
          this.getRowsDOMElementsList().forEach((el) => {
            el.classList.remove("data_table__row_hide");
          });
        }, 50);
      }, 300);
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
.data_table__header {
  @apply mx-10 pb-6;
  @apply grid;
  grid-template-columns: auto auto 1fr 1fr 1fr;
  @apply border-b border-brand-300;
}
.data_table__header > * {
  @apply mr-4 pr-3;
  @apply border-r border-brand-300;
  @apply flex justify-between;
}
.data_table__header > :last-of-type {
  @apply border-none;
}

.data_table__row {
  @apply h-20;
  @apply px-10;
  @apply grid items-center;
  grid-template-columns: 1fr 60% 1fr 100px;
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