<template>
  <div class="w-400">
    <div ref="citiesList">
      <div
        :ref="itemList[1].value"
        v-for="itemList in displayItems"
        :key="itemList[1].value"
        class="bg-gray-300 flex justify-between items-center mb-1 hover:bg-gray-200 cursor-pointer"
        :class="{ selected: isSelected }"
        :data-type="itemList[1].value"
        title="drag'n'drop"
        draggable="true"
        @dragover.prevent="(event) => emitToDragOver(event, itemList[1].value)"
        @dragstart="emitToDragStart"
        @dragend="emitToDragEnd"
      >
        <div class="flex justify-center align-center svg-rotate">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 ml-1 cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            />
          </svg>
        </div>
        <div>
          <span>{{ itemList[1].value }}/{{ itemList[2].value }}</span>
        </div>
        <div>
          <i
            class="mr-1 fa-solid fa-close cursor-pointer"
            title="delete"
            @click="() => emitToDeleteCity(itemList[1].value)"
          ></i>
        </div>
      </div>
    </div>
    <form @keydown.enter.prevent="emitSearch">
      <input
        type="search"
        id="fname"
        name="fname"
        class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search for a location..."
        required
        v-model="queriedLocation"
      />
    </form>
    <div class="flex justify-between">
      <button
        @click="emitSearch"
        type="button"
        class="bg-gray-300 rounded-lg mt-3 py-3.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-lg hover:bg-white"
      >
        Search
      </button>
      <button
        v-if="displayItems.length > 0"
        @click="emitChangeShowSetting"
        type="button"
        class="mt-3 py-3.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg hover:bg-gray-300"
      >
        Close
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "weatherSettings",
  props: {
    displayItems: {
      type: Array,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      queriedLocation: "",
    };
  },
  watch: {
    queriedLocation(data) {
      this.$emit("emitQueriedLocation", data);
    },
  },
  methods: {
    emitToDragOver(event, value) {
      this.$emit("emitToDragOver", event, value);
    },
    emitToDeleteCity(value) {
      this.$emit("emitToDeleteCity", value);
    },
    emitToDragStart(event) {
      this.$emit("emitToDragStart", event);
    },
    emitToDragEnd(event) {
      this.$emit("emitToDragEnd", event);
    },
    emitSearch() {
      this.$emit("emitSearch");
    },
    emitChangeShowSetting() {
      this.$emit("emitChangeShowSetting");
    },
  },
};
</script>
