<template>
  <div class="dark:bg-slate-800 p-3 flex border border-gray-500 rounded-lg">
    <div>
      <p class="text-dark">{{ errorMsg }}</p>
    </div>
    <div>
      <button
        @click="emitToClose"
        type="button"
        class="ml-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <i class="mr-1 fa-solid fa-close cursor-pointer"></i>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "weatherError",

  props: {
    errorMsg: {
      type: String,
      required: true,
    },
  },

  methods: {
    emitToClose() {
      this.$emit("emitToClose");
    },
  },
};
</script>
