<template>
  <div class="flex justify-around flex-wrap">
    <div
      v-for="items in displayItems"
      :key="items[1].value"
      class="p-5 relative bg-gray-500 border rounded-lg bg-gray-50 m-30 ..."
    >
      <img class="block mx-auto w-20" :src="items[3].img" />
      <div
        @click="emitChangeShowSetting"
        class="absolute top-5 right-5 cursor-pointer hover:opacity-50"
        title="settings"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 cursor-pointer"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      </div>

      <b v-for="(item, idx) in items" :key="idx">
        <div
          class="leading-10 h-10 w-96 rounded-sm text-gray-200 border-t-2 border-gray-300 mt-30 mb-30 mr-30 ml-30 ..."
          :title="item.name"
        >
          <p>
            <i class="ml-2" :class="item.icon"></i> {{ item.name }}
            <font class="float-right mr-4"
              >{{ item.value }}{{ item.unit }}</font
            >
          </p>
        </div>
      </b>
    </div>
  </div>
</template>
<script>
export default {
  name: "weatherList",
  props: {
    displayItems: {
      type: Array,
      required: true,
    },
  },
  methods: {
    emitChangeShowSetting() {
      this.$emit("emitChangeShowSetting");
    },
  },
};
</script>
