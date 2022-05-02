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
        :view-mode="'month'"
        @dateSelected="selectDate"
      />
    </div>
    <CalendarWeekdays/>
    <ol class="days-grid">
          <!-- class="drawer-content" -->
      <CalendarMonthDayItem 
          v-on:dayclicked="() => $emit('dayclicked')"
          v-for="day in days" 
          :key="day.date" 
          :day="day" 
          :is-today="day.date === today">
      </CalendarMonthDayItem>
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
  return selectedDate.value.format("MMMM YYYY")
}

/*{"id":"05f1c9b9-b385-4203-8ff8-8dfd1dd6561e",
"title":"Id illo odit aspernatur.",
"description":"Deleniti autem aut placeat fugiat sit voluptatum numquam. Consequuntur nihil repudiandae sit impedit est. Dolores dolorum consequatur sit error. Beatae sed pariatur natus dolore.",
"date":"15.02.2022",
"timeStart":"11:23",
"timeEnd":"13:15",
"calendar":"Sport"}*/

</script>

<style>
@import '../styles/calendarMonth.css';
</style>

