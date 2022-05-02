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
        <LabelDay 
          :label="label()"
          :is-today="isToday"/>
      </div>
      <div v-for="event in store.events.get(day.date)" :key="event.key">
        <EventComponent 
          :title="event.title" 
          :time-start="event.timeStart" 
          :time-end="event.timeEnd"
          class="cell-container"/>
      </div>
  </button>
</template>

<script setup>
import dayjs from "dayjs";
import EventComponent from "./EventComponent.vue";
import LabelDay from "./LabelDay.vue";
import { useEventsStore } from "../stores/events";
import { ref } from 'vue'

// const eventsStore = ref(useEventsStore)

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

// function day() {
//   return dayjs(props.day.date).format("D");
// }

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

</style>