<template>
  <div
    class="flex items-center justify-center bg-gradient-to-t"
    :class="{ 'h-screen': showSetting }"
  >
    <div v-if="!(errorMsg.length > 0)">
      <weatherList
        v-if="displayItems.length > 0 && !showSetting"
        :displayItems="displayItems"
        @emitChangeShowSetting="changeShowSetting"
      />
      <weatherSettings
        ref="weatherSettings"
        v-if="displayItems.length === 0 || showSetting"
        :displayItems="displayItems"
        :isSelected="isSelected"
        @emitQueriedLocation="emitQueriedLocation"
        @emitToDragOver="emitToDragOver"
        @emitToDeleteCity="emitToDeleteCity"
        @emitToDragStart="emitToDragStart"
        @emitToDragEnd="emitToDragEnd"
        @emitSearch="emitSearch"
        @emitChangeShowSetting="emitChangeShowSetting"
      />
    </div>
    <weatherError v-else :errorMsg="errorMsg" @emitToClose="toClose" />
  </div>
</template>

<script>
import getWindDirection from "./helpers/windDirection.js";

import weatherList from "./components/weatherList.vue";
import weatherSettings from "./components/weatherSettings.vue";
import weatherError from "./components/weatherError.vue";

export default {
  name: "weatherWidget",

  components: {
    weatherList,
    weatherSettings,
    weatherError,
  },

  data() {
    return {
      getWindDirection: getWindDirection,
      errorMsg: "",
      queriedLocation: "",
      displayItems: [],
      currenListItem: null,
      showSetting: true,
      isSelected: false,
    };
  },
  apiKey: "37b3d7340dc55ec06d22e81e5e2f2c51",

  created() {
    if (localStorage.displayItems?.length) {
      this.displayItems = JSON.parse(localStorage.displayItems);
    }
  },

  methods: {
    async search() {
      if (this.queriedLocation.length > 0) {
        let isDublicate = false;
        this.displayItems.forEach((item) => {
          if (
            item[1].value.toLowerCase() === this.queriedLocation.toLowerCase()
          ) {
            isDublicate = true;
          }
        });
        if (!isDublicate) {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${this.queriedLocation.toLowerCase()}&units=metric&appid=${
              this.$options.apiKey
            }`
          );
          const data = await response.json();
          if (data.message != undefined) {
            this.errorMsg = data.message;
          } else {
            this.generateCities(data);
          }
        }
      }
    },

    toDeleteCity(value) {
      this.displayItems = this.displayItems.filter((item) => {
        return item[1].value !== value;
      });
      localStorage.displayItems = JSON.stringify(this.displayItems);
    },

    toDragOver(evt, type) {
      const citiesList = this.$refs["weatherSettings"].$refs["citiesList"];
      const activeElement = this.currenListItem;
      const currentElement = this.$refs["weatherSettings"].$refs[type][0];
      const isMoveable = activeElement !== currentElement;
      if (!isMoveable) {
        return;
      }
      const nextElement = this.getNextElement(evt.clientY, currentElement);
      if (
        (nextElement && activeElement === nextElement.previousElementSibling) ||
        activeElement === nextElement ||
        !nextElement
      ) {
        return;
      }
      citiesList.insertBefore(activeElement, nextElement);

      if (this.displayItems.length > 1) {
        this.toSwapCities(activeElement, nextElement);
      }
    },

    toDragStart(event) {
      event.currentTarget.classList.add(`selected`);
      this.currenListItem = event.target;
    },

    toDragEnd(event) {
      event.currentTarget.classList.remove(`selected`);
    },

    changeShowSetting() {
      this.showSetting = !this.showSetting;
    },

    generateCities(data) {
      const cityWeather = [];
      cityWeather.push({
        name: "Temperature",
        value: data.main.temp,
        icon: "fa-solid fa-temperature-three-quarters",
        unit: "°C",
      });
      cityWeather.push({
        name: "City",
        value: data.name,
        icon: "fa-solid fa-building ",
      });
      cityWeather.push({
        name: "Country",
        value: `${data.sys.country}`,
        icon: "fa-solid fa-globe",
      });
      cityWeather.push({
        name: "Weather Condition",
        value: data.weather[0].description,
        icon: "fa-solid fa-cloud",
        img: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      });
      cityWeather.push({
        name: "Wind Speed / Direction",
        value: `${data.wind.speed}mph / ${this.getWindDirection(
          data.wind.deg
        )} `,
        icon: "fa-solid fa-wind",
      });
      cityWeather.push({
        name: "Humidity",
        value: data.main.humidity,
        icon: "fa-solid fa-droplet",
        unit: "%",
      });
      this.displayItems.push(cityWeather);
      localStorage.displayItems = JSON.stringify(this.displayItems);
    },

    toClose() {
      this.errorMsg = "";
      this.queriedLocation = "";
    },

    toSwapCities(activeElement, nextElement) {
      const activeIdx = this.displayItems.findIndex((item) => {
        return (
          item[1].value.toLowerCase() ===
          activeElement?.dataset.type.toLowerCase()
        );
      });
      const nextIdx = this.displayItems.findIndex((item) => {
        return (
          item[1].value.toLowerCase() ===
          nextElement?.dataset.type.toLowerCase()
        );
      });

      [this.displayItems[activeIdx], this.displayItems[nextIdx]] = [
        this.displayItems[nextIdx],
        this.displayItems[activeIdx],
      ];
      localStorage.displayItems = JSON.stringify(this.displayItems);
    },

    getNextElement(cursorPosition, currentElement) {
      const currentElementCoord = currentElement.getBoundingClientRect();
      const currentElementCenter =
        currentElementCoord.y + currentElementCoord.height / 2;
      const nextElement =
        cursorPosition < currentElementCenter
          ? currentElement
          : currentElement.nextElementSibling;

      return nextElement;
    },

    emitToDragOver(event, value) {
      this.toDragOver(event, value);
    },

    emitToDeleteCity(value) {
      this.toDeleteCity(value);
    },

    emitToDragStart(event) {
      this.toDragStart(event);
    },

    emitToDragEnd(event) {
      this.toDragEnd(event);
    },

    emitSearch() {
      this.search();
    },

    emitChangeShowSetting() {
      this.changeShowSetting();
    },

    emitQueriedLocation(data) {
      this.queriedLocation = data;
    },
  },
};
</script>
<style>
.m-30 {
  margin: 30px;
}
.w-400 {
  width: 400px;
}
.svg-rotate {
  transform: rotate(45deg);
  margin-bottom: 1px;
}
.bg-gray-500 {
  background-color: rgb(107 114 128 / 90%);
}
.selected {
  opacity: 0.6;
}
</style>
