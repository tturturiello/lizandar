<template>
<div class="drawer h-full">
  <input id="my-drawer-3" type="checkbox" class="drawer-toggle"> 
  <div class="drawer-content flex flex-col">
    <!-- Navbar -->
    <div class="w-full navbar bg-base-300">
      <div class="flex-none lg:hidden">
        <label for="my-drawer-3" class="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div> 
      <div class="flex-1 px-2 mx-2 text-white text-4xl">Calendar {{ eventsStore.cnt }} </div>
      <div class="flex-none hidden lg:block text-white">
        <ul class="menu menu-horizontal">
          <!-- Navbar menu content here -->

          <li><button @click="() => viewMode ='week'">Week</button></li>
          <li><button @click="() => viewMode ='month'">Month</button></li>

        </ul>
      </div>
    </div>
    <!-- Page content here -->
    <span class="h-full">
        <CalendarWeek v-if="viewMode == 'week'"/>
        <CalendarMonth v-if="viewMode == 'month'"/>
    </span>
  </div>
</div>
</template>

<script setup>
import CalendarMonth from "./CalendarMonth.vue";
import CalendarWeek from "./CalendarWeek.vue";
import { onMounted, ref } from 'vue'
import { useEventsStore } from "../stores/events";

const viewMode = ref('month')
const eventsStore = useEventsStore()

onMounted(() => {
  //fetchAll()
  const URL = "https://supsi-events.herokuapp.com/bff/events"
  fetch(URL)
   .then(response => response.json())
   .then(array => {
      const map = new Map();
      array.forEach(e => map.set(`${e.date.split('.')[2]}-${e.date.split('.')[1]}-${e.date.split('.')[0]}`, []))
      array.forEach(e => map.get(`${e.date.split('.')[2]}-${e.date.split('.')[1]}-${e.date.split('.')[0]}`).push(e))
      // eventsStore.setEvents(map)
      eventsStore.$patch({events: map, cnt: 3})
    })
    .catch(err => console.log(`Error fetching events. \r\n ${err}`))



  // events.value.set("2022-04-29", [
  //   {id: "ssasf1", title: "title", description: "desc", date: "29.04.2022", timeStart: "11:23", timeEnd: "13:23", calendar: "Sprot"},
  //   ]);

  // events.value.set("2022-04-30", [
  //   {id: "ssasf1", title: "title", description: "desc", date: "29.04.2022", timeStart: "11:23", timeEnd: "13:23", calendar: "Sprot"},
  //   {id: "ssasf2", title: "title", description: "desc", date: "29.04.2022", timeStart: "11:23", timeEnd: "13:23", calendar: "Sprot"},
  //   ]);
})

alert(eventsStore.cnt)


async function fetchAll() {
  const URL = "https://supsi-events.herokuapp.com/bff/events"
  await fetch(URL)
   .then(response => response.json())
   .then(json => {
     json.forEach(e => events.value.set(e.date, []))
     return json
     })
   .then(json => json.forEach(e => events.value.get(e.date).push(`${e.date.split('.')[2]}-${e.date.split('.')[1]}-${e.date.split('.')[0]}`, e)))
   .catch(err => console.log(`Error fetching events. \r\n ${err}`))
  console.log(events.value)
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