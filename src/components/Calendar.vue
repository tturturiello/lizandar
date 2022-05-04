<template>
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
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>

        <span class="dropdown">
          <label class="btn btn-ghost btn-circle" tabindex="1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </label>
          <ul tabindex="1" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li @click="() => viewMode='new calendar'"><a>New Calendar</a></li>
            <li @click="() => viewMode='new event'"><a>New Event</a></li>
          </ul>
        </span>

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
        <span v-else/>
        <CalendarMonth 
          v-on:dayclicked="() => isDayViewEnabled = true"
          v-if="viewMode == 'month'"/>
        <span v-else/>
        <NewCalendar 
          v-on:calendar-created="eventsStore.addCalendar"
          v-if="viewMode == 'new calendar'"/>
        <span v-else/>
        <NewEvent 
          v-on:event-created="eventsStore.addEvent"
          v-if="viewMode == 'new event'"/>
        <span v-else/>
    </span>


    </div> 
    <div class="drawer-side">
      <label for="menu-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
        <!-- Sidebar content here -->
        <li><button @click="() => viewMode ='week'">Week</button></li>
        <li><button @click="() => viewMode ='month'">Month</button></li>

        Calendars:
        <span v-for="calendar in eventsStore.calendars" :key="calendar">
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">{{ calendar.calendarName }}</span>
              <input 
                @click="eventsStore.toggleCalendar(calendar.calendarName)"
                type="checkbox" 
                class="toggle" 
                checked
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
import { onMounted, ref, reactive } from 'vue'
import { useEventsStore } from "../stores/events";
import SearchView from "./SearchView.vue";
import DayView from "./DayView.vue";
import NewCalendar from "./NewCalendar.vue";
import NewEvent from "./NewEvent.vue";

const eventsStore = useEventsStore()
let viewMode = ref('month')
const isSearchEnabled = ref(false)
const isDayViewEnabled = ref(false)

onMounted(() => {
  const URL = "https://supsi-events.herokuapp.com/bff/events"
  fetchFrom(URL)
})

function onEventCreated(event) {
  eventsStore.addEvent(event)
  viewMode = 'month'
}

function fetchFrom(URL) {
  fetch(URL)
   .then(response => response.json())
   .then(array => {
      array.forEach(e => eventsStore
        .addEventWithKey(`${e.date.split('.')[2]}-${e.date.split('.')[1]}-${e.date.split('.')[0]}`, e))
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