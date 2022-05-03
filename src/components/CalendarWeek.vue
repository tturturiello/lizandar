<template>
  <div class="calendar-month">
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
    <CalendarWeekDayItem 
        v-for="day in daysPerWeek[weekIndex()]" 
        :events="events" 
        :key="day.date" 
        :day="day" 
        :is-today="day.date === today">
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
import CalendarWeekDayItem from './CalendarWeekDayItem.vue';
import EventComponent from './EventComponent.vue';
import { data } from 'browserslist';
import { useEventsStore } from "../stores/events";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

let events = reactive(new Map())
const eventsStore = ref(useEventsStore)

onMounted(() => {
  fetchEvents()
})

let selectedDate = reactive ({
  value: dayjs()
});

let today = ref( dayjs().format("YYYY-MM-DD") )

const days = computed(() => {
    console.log("DAYS", daysPerWeek[weekIndex()])
  return [
      ...currentMonthDays(),
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

function fetchEvents() {
  events.set("2022-04-29", [
    {id: "ssasf", title: "title", description: "desc", date: "29.04.2022", timeStart: "11:23", timeEnd: "13:23", calendar: "Sprot"},
    {id: "ssasf1", title: "title", description: "desc", date: "29.04.2022", timeStart: "11:23", timeEnd: "13:23", calendar: "Sprot"},
    ]);

  events.set("2022-04-30", [
    {id: "ssasf1", title: "title", description: "desc", date: "29.04.2022", timeStart: "11:23", timeEnd: "13:23", calendar: "Sprot"},
    {id: "ssasf2", title: "title", description: "desc", date: "29.04.2022", timeStart: "11:23", timeEnd: "13:23", calendar: "Sprot"},
    ]);
}

function allLogs() {
    console.log("WEEK", selectedDate.value.week() % 4)
    console.log("DAYS", daysPerWeek[weekIndex()])
}

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

function formatSelectedDate() {
  return selectedDate.value.format("DD MMMM YYYY")
}

</script>

<style>
@import '../styles/calendarWeek.css';
</style>