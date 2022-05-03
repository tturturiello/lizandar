<template>
  <div class="calendar-month drawer">
    <div class="calendar-month-header">
      <CalendarDateIndicator
        :selected-date="formatSelectedDate()"
        class="calendar-month-header-selected-month"
      />
      <CalendarDateSelector
        :current-date="today"
        :selected-date="selectedDate.value"
        :view-mode="'week'"
        @dateSelected="selectDate"
      />
    </div>
    <CalendarWeekdays/>
    <ol class="days-grid">
        <!-- v-for="day in daysPerWeek[weekIndex()]"  -->
      <CalendarWeekDayItem 
        v-for="dayIndex in 7" :key="dayIndex" 
        :events="events" 
        :day="currentMonthDays()[dayIndex + 7*weekIndex()]" 
        :is-today="currentMonthDays()[dayIndex + 7*weekIndex()].date === today">
      </CalendarWeekDayItem>
    </ol>
  </div>
</template>

<script setup>
import { computed, ref, reactive, onMounted } from 'vue'
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import CalendarDateIndicator from "./CalendarDateIndicator.vue"
import CalendarDateSelector from "./CalendarDateSelector.vue"
import CalendarWeekdays from './CalendarWeekdays.vue';
import CalendarMonthDayItem from './CalendarMonthDayItem.vue';
import { data } from 'browserslist';
import EventComponent from './EventComponent.vue';
import { useEventsStore } from "../stores/events";
import CalendarWeekDayItem from './CalendarWeekDayItem.vue';

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

let events = reactive(new Map())
const eventsStore = ref(useEventsStore)

let selectedDate = reactive ({
  value: dayjs()
});

let today = ref( dayjs().format("YYYY-MM-DD") )

const days = computed(() => {
  return [
      ...previousMonthDays(),
      ...currentMonthDays(),
      ...nextWeekDays()
    ];
})

function weekIndex() {
    return selectedDate.value.week() % 4
}

const daysPerWeek = computed(() => {
  return [
      days.value.filter((_, index) => index < 7),
      days.value.filter((_, index) => index >= 7 && index < 14),
      days.value.filter((_, index) => index >= 14 && index < 21),
      days.value.filter((_, index) => index >= 21),
  ]
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
      event: dayjs(`${year()}-${month()}-${index + 1}`).format("YYYY-MM-DD"),
      isCurrentMonth: true
    };
  });
}

function getEvent(key) {
  return events.get(key)
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

function nextWeekDays() {
    const lastDayOfTheMonthWeekday = getWeekday(`${year()}-${month()}-${currentMonthDays().length}`);
    const nextMonth = dayjs(`${year()}-${month()}-01`).add(1, "week");
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

function formatSelectedDate() {
  return selectedDate.value.format("MMMM YYYY")
}

</script>

<style>
@import '../styles/calendarMonth.css';
</style>


