<template>

<!-- <DayView v-on:backevent="isDayViewEnabled=false" v-if="isDayViewEnabled" /> -->

<!-- <span v-else> -->
<span>
<span v-if="!isSearchEnabled">
  <div class="drawer">

    <input id="menu-drawer" type="checkbox" class="drawer-toggle">
    <div class="drawer-content">

    <!-- HEADER -->
    <div class="navbar bg-base-100 text-white">
      <div class="navbar-start">
        <div class="dropdown">
          <label for="menu-drawer" tabindex="0" class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
        </div>
      </div>
      <div class="navbar-center text-white text-4xl">Calendar</div>
      <div class="navbar-end">
        <button @click="() => isSearchEnabled=true" class="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
      </div>
    </div>

    <!-- BODY -->
    <span class="h-full">
        <CalendarWeek 
          v-if="viewMode == 'week'"/>
        <CalendarMonth 
          v-on:dayclicked="() => isDayViewEnabled = true"
          v-if="viewMode == 'month'"/>
        <!-- <DayView/> -->
    </span>


    </div> 
    <div class="drawer-side">
      <label for="menu-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
        <!-- Sidebar content here -->
        <li><button @click="() => viewMode ='week'">Week</button></li>
        <li><button @click="() => viewMode ='month'">Month</button></li>
        <span v-for="calendar in eventsStore.calendars" :key="calendar">
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">{{ calendar.calendarName }}</span>
              <input 
                @click="eventsStore.toggleCalendar(calendar.calendarName)"
                type="checkbox" 
                checked
                class="toggle" 
                v-bind:style="{ 'background-color': calendar.color }"
              >
            </label>
          </div>
        </span>

      </ul>
    </div>
  </div>

  </span>
  <span v-else>
    <SearchView v-on:backevent="()=>isSearchEnabled=false"/>
  </span>
  </span>
</template>

<script setup>
import CalendarMonth from "./CalendarMonth.vue";
import CalendarWeek from "./CalendarWeek.vue";
import { onMounted, ref } from 'vue'
import { useEventsStore } from "../stores/events";
import SearchView from "./SearchView.vue";
import DayView from "./DayView.vue";

const eventsStore = useEventsStore()
const viewMode = ref('month')
const isSearchEnabled = ref(false)
const isDayViewEnabled = ref(false)

onMounted(() => {
  const URL = "https://supsi-events.herokuapp.com/bff/events"
  fetchFrom(URL)
})

function onDayClicked() {
  console.log('hellooo')
}

function fetchFrom(URL) {
  fetch(URL)
   .then(response => response.json())
   .then(array => {
      array.forEach(e => eventsStore
        .addEvent(`${e.date.split('.')[2]}-${e.date.split('.')[1]}-${e.date.split('.')[0]}`, e))
    })
    .catch(err => console.log(`Error fetching events. \r\n ${err}`))

}

</script>

<style scoped>
.view-master {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.view-item {
    flex-grow: 1;
    min-width: 25%;
}
</style>