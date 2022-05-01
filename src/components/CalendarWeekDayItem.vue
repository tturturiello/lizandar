<template>
  <li
    class="calendar-day"
    :class="{
      'calendar-day--not-current': !day.isCurrentMonth,
      'calendar-day--today': isToday
    }"
  >
    <span>
      <div>
        <LabelDay 
          :label="label()"/>
      </div>
      <div v-for="event in events.get(day.date)" :key="event.key">
        <EventComponent 
          :title="event.title" 
          :time-start="event.timeStart" 
          :time-end="event.timeEnd"/>
      </div>
    </span>
  </li>
</template>

<script setup>
import dayjs from "dayjs";
import EventComponent from "./EventComponent.vue";
import LabelDay from "./LabelDay.vue";

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
  min-height: 50px;
  font-size: 16px;
  background-color: #fff;
  color: var(--grey-800);
  padding: 5px;
}

.calendar-day--not-current {
  background-color: var(--grey-100);
  color: var(--grey-300);
}

</style>