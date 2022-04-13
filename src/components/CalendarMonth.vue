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

<script setup>
import { ref } from 'vue'
import dayjs from "dayjs";
import CalendarDateIndicator from "./CalendarDateIndicator.vue"
import CalendarDateSelector from "./CalendarDateSelector.vue"

let selectedDate = ref( dayjs() )
let today = ref( dayjs().format("YYYY-MM-DD") )

function selectDate(newSelectedDate) {
  selectedDate.value = newSelectedDate
}
</script>

<style>
@import '../styles/calendarMonth.css';
</style>

