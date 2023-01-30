<template>
  <button
    @click="() => $emit('dayclicked', this)"
    class="calendar-day cell-container"
    :class="{
      'calendar-day--not-current': !day.isCurrentMonth,
      'calendar-day--today': isToday
    }"
  >
      <div>
        <span class="disposed">
            <span v-if="isToday">
                <div class="badge badge-primary">{{ label() }}</div>
                <div class="menu w-8 p-0.1 rounded-box">{{ dayWeek }}</div>
            </span>
            <span v-else>
                <div class="menu w-8 p-0.1 rounded-box">{{ label() }}</div>
                <div class="menu w-8 p-0.1 rounded-box">{{ dayWeek }}</div>
            </span>
        </span>
      </div>
      <div v-for="event in store.events.get(day.date)" :key="event.key">
        <EventComponent v-if="store.isCalendarEnabled(event.calendar)" 
          :title="event.title" 
          :category="event.calendar"
          :color="store.calendarColor(event.calendar)"
          :time-start="event.timeStart" 
          :time-end="event.timeEnd"
          :clicked="onEventClicked"
          class="cell-container"/>
      </div>
  </button>
</template>

<script setup>
import dayjs from "dayjs";
import EventComponent from "./EventComponent.vue";
import { useEventsStore } from "../stores/events";

const store = useEventsStore();

const props = defineProps({
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

function onEventClicked() {
  alert('this is an injected functionality')
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

.calendar-day--not-current {
  background-color: var(--grey-100);
  color: var(--grey-300);
}

.cell-container {
  display: flex;
  flex-direction: column;
}

.disposed {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}

</style>