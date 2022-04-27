<template>
  <li
    class="calendar-day"
    :class="{
      'calendar-day--not-current': !day.isCurrentMonth,
      'calendar-day--today': isToday
    }"
  >
    <span>{{ label() }}</span>
          <div v-for="event in events.get(day.date)" :key="event.key">
            <EventComponent :title="event.title" :time-start="event.timeStart" :time-end="event.timeEnd"/>
          </div>
  </li>
</template>

<script setup>
import dayjs from "dayjs";
import EventComponent from "./EventComponent.vue";

const props = defineProps({
  events: {
    type: Map
  },
  day: {
      type: Object,
      required: true
    },

    isCurrentMonth: {
      type: Boolean,
      default: false
    },

    isToday: {
      type: Boolean,
      default: false
    }
});

function label() {
  return dayjs(props.day.date).format("D");
}
</script>

<style scoped>
.calendar-day {
  position: relative;
  min-height: 100px;
  font-size: 16px;
  background-color: #fff;
  color: var(--grey-800);
  padding: 5px;
}

.calendar-day > span {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 2px;
  width: var(--day-label-size);
  height: var(--day-label-size);
}

.calendar-day--not-current {
  background-color: var(--grey-100);
  color: var(--grey-300);
}

.calendar-day--today {
  padding-top: 4px;
}

.calendar-day--today > span {
  color: #fff;
  border-radius: 9999px;
  background-color: var(--grey-800);
}
</style>