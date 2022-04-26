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
    <CalendarWeekdays/>
    <ol class="days-grid">
      <CalendarMonthDayItem v-for="day in days" :key="day.date" :day="day" :is-today="day.date === today" />
    </ol>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import CalendarDateIndicator from "./CalendarDateIndicator.vue"
import CalendarDateSelector from "./CalendarDateSelector.vue"
import CalendarWeekdays from './CalendarWeekdays.vue';
import CalendarMonthDayItem from './CalendarMonthDayItem.vue';

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

let selectedDate = ref( dayjs() )
let today = ref( dayjs().format("YYYY-MM-DD") )

const days = ([
        { date: "2020-06-29", isCurrentMonth: false },
        { date: "2020-06-30", isCurrentMonth: false },
        { date: "2020-07-01", isCurrentMonth: true },
        { date: "2020-07-02", isCurrentMonth: true },
        { date: "2020-07-03", isCurrentMonth: true },
        { date: "2020-07-04", isCurrentMonth: true },
        { date: "2020-07-05", isCurrentMonth: true },
        { date: "2020-07-06", isCurrentMonth: true },
        { date: "2020-07-07", isCurrentMonth: true },
        { date: "2020-07-08", isCurrentMonth: true },
        { date: "2020-07-09", isCurrentMonth: true },
        { date: "2020-07-10", isCurrentMonth: true },
        { date: "2020-07-11", isCurrentMonth: true },
        { date: "2020-07-12", isCurrentMonth: true },
        { date: "2020-07-13", isCurrentMonth: true },
        { date: "2020-07-14", isCurrentMonth: true },
        { date: "2020-07-15", isCurrentMonth: true },
        { date: "2020-07-16", isCurrentMonth: true },
        { date: "2020-07-17", isCurrentMonth: true },
        { date: "2020-07-18", isCurrentMonth: true },
        { date: "2020-07-19", isCurrentMonth: true },
        { date: "2020-07-20", isCurrentMonth: true },
        { date: "2020-07-21", isCurrentMonth: true },
        { date: "2020-07-22", isCurrentMonth: true },
        { date: "2020-07-23", isCurrentMonth: true },
        { date: "2020-07-24", isCurrentMonth: true },
        { date: "2020-07-25", isCurrentMonth: true },
        { date: "2020-07-26", isCurrentMonth: true },
        { date: "2020-07-27", isCurrentMonth: true },
        { date: "2020-07-28", isCurrentMonth: true },
        { date: "2020-07-29", isCurrentMonth: true },
        { date: "2020-07-30", isCurrentMonth: true },
        { date: "2020-07-31", isCurrentMonth: true },
        { date: "2020-08-01", isCurrentMonth: false },
        { date: "2020-08-02", isCurrentMonth: false }]);

function selectDate(newSelectedDate) {
  selectedDate.value = newSelectedDate
}

function numberOfDaysInMonth() {
  return dayjs(this.selectDate).daysInMonth();
}

function currentMonthDays() {
  return [...Array(this.numberOfDaysInMonth)].map((day, index) => {
    return {
      date: dayjs(`${this.year}-${this.month}-${index + 1}`).format("YYYY-MM_DD"),
      isCurrentMonth: true
    };
  });
}

function getToday() {
  return dayjs().format("YYYY-MM-DD");
}

function getMonth() {
  return Number(this.selectDate.format("M"));
}

function getYear() {
  return Number(this.selectDate.format("YYYY"));
}

function getWeekday(date) {
  return dayjs(date).weekday();
}

// TODO return days as a single array
// function days() {
//   return [
//   ]
// }

</script>

<style>
@import '../styles/calendarMonth.css';
</style>

