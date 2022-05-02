<template>
<span v-if="!isSearchEnabled">
  <div class="navbar bg-base-100 text-white">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
        </label>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><button @click="() => viewMode ='week'">Week</button></li>
            <li><button @click="() => viewMode ='month'">Month</button></li>
        </ul>
      </div>
    </div>
    <div class="navbar-center text-white text-4xl">Calendar</div>
    <div class="navbar-end">
      <button @click="() => isSearchEnabled=true" class="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </button>
    </div>
  </div>
  <span class="h-full">
      <CalendarWeek v-if="viewMode == 'week'"/>
      <CalendarMonth v-if="viewMode == 'month'"/>
  </span>
</span>
<span v-else>
  <SearchView v-on:backevent="()=>isSearchEnabled=false"/>
</span>
</template>

<script setup>
import CalendarMonth from "./CalendarMonth.vue";
import CalendarWeek from "./CalendarWeek.vue";
import { onMounted, ref } from 'vue'
import { useEventsStore } from "../stores/events";
import SearchView from "./SearchView.vue";

const viewMode = ref('month')
const isSearchEnabled = ref(false)
const eventsStore = useEventsStore()

onMounted(() => {
  const URL = "https://supsi-events.herokuapp.com/bff/events"
  fetchFrom(URL)
})

function fetchFrom(URL) {
  fetch(URL)
   .then(response => response.json())
   .then(array => {
      const map = new Map();
      array.forEach(e => map.set(`${e.date.split('.')[2]}-${e.date.split('.')[1]}-${e.date.split('.')[0]}`, []))
      array.forEach(e => map.get(`${e.date.split('.')[2]}-${e.date.split('.')[1]}-${e.date.split('.')[0]}`).push(e))
      eventsStore.$patch({events: map})

      console.log(map)
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