<template>
  <div class="calendar-month">
    <div class="calendar-month-header">
      <CalendarDateIndicator
        :selected-date="selectedDate.value"
        class="calendar-month-header-selected-month"
      />
      <CalendarDateSelector
        :current-date="today"
        :selected-date="selectedDate.value"
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
import { computed, ref, reactive } from 'vue'
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import CalendarDateIndicator from "./CalendarDateIndicator.vue"
import CalendarDateSelector from "./CalendarDateSelector.vue"
import CalendarWeekdays from './CalendarWeekdays.vue';
import CalendarMonthDayItem from './CalendarMonthDayItem.vue';
import { data } from 'browserslist';

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

let selectedDate = reactive ({
  value: dayjs()
});

let today = ref( dayjs().format("YYYY-MM-DD") )

const days = computed(() => {
  return [
        ...previousMonthDays(),
        ...currentMonthDays(),
        ...nextMonthDays()
      ];
})

function month() {
  return Number(selectedDate.value.format("M"));
}

function year() {
  return Number(selectedDate.value.format("YYYY"));
}

function numberOfDaysInMonth() {
  return dayjs(selectedDate.value).daysInMonth();
}

function currentMonthDays() {
  return [...Array(numberOfDaysInMonth())].map((_, index) => {
    return {
      date: dayjs(`${year()}-${month()}-${index + 1}`).format("YYYY-MM-DD"),
      isCurrentMonth: true
    };
  });
}

function previousMonthDays() {
    const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays()[0].date);
    const previousMonth = dayjs(`${year()}-${month()}-01`).subtract(1, "month");

    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday ? firstDayOfTheMonthWeekday - 1 : 6;

    const previousMonthLastMondayDayOfMonth = dayjs(currentMonthDays()[0].date).subtract(visibleNumberOfDaysFromPreviousMonth, "day").date();

    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((_, index) => {
      return {
        date: dayjs(`${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastMondayDayOfMonth + index}`).format("YYYY-MM-DD"),
        isCurrentMonth: false
      };
    });
  }

function nextMonthDays() {
    const lastDayOfTheMonthWeekday = getWeekday(`${year()}-${month()}-${currentMonthDays().length}`);
    const nextMonth = dayjs(`${year()}-${month()}-01`).add(1, "month");
    const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday ? 7 - lastDayOfTheMonthWeekday : lastDayOfTheMonthWeekday;

    return [...Array(visibleNumberOfDaysFromNextMonth)].map((_, index) => {
      return {
        date: dayjs(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`).format("YYYY-MM-DD"),
        isCurrentMonth: false
      };
    });
  }

function getWeekday(date) {
  return dayjs(date).weekday();
}

function selectDate(newSelectedDate) {
  selectedDate.value = newSelectedDate
}

</script>

<style>
@import '../styles/calendarMonth.css';
</style>

