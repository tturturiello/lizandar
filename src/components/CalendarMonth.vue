<template>
  <div class="calendar-month">
    <div class="calendar-month-header">
      <CalendarDateIndicator
        :selected-date="selectedDate"
        class="calendar-month-header-selected-month"
      />
      <CalendarDateSelector
        :current-date="today"
        :selected-date="selectedDate"
        @dateSelected="selectDate"
      />
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import CalendarDateIndicator from "./CalendarDateIndicator.vue";
import CalendarDateSelector from "./CalendarDateSelector.vue";

export default {
  components: {
    CalendarDateIndicator,
    CalendarDateSelector
},

  data() {
    return {
      selectedDate: dayjs(),
      today: dayjs().format("YYYY-MM-DD")
    };
  },

  methods: {
    selectDate(newSelectedDate) {
      this.selectedDate = newSelectedDate;
    }
  }
};
</script>


<style>
@import '../styles/calendarMonth.css';
</style>

