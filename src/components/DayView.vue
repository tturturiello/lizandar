<template>
<div class="navbar text-white">
    <div class="navbar">
        <div class="dropdown">
            <button @click="$emit('backevent', true)" class="btn btn-ghost btn-circle">
                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-alt-circle-left" class="w-7 h-7" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M8 256c0 137 111 248 248 248s248-111 248-248S393 8 256 8 8 119 8 256zm448 0c0 110.5-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56s200 89.5 200 200zm-72-20v40c0 6.6-5.4 12-12 12H256v67c0 10.7-12.9 16-20.5 8.5l-99-99c-4.7-4.7-4.7-12.3 0-17l99-99c7.6-7.6 20.5-2.2 20.5 8.5v67h116c6.6 0 12 5.4 12 12z"></path>
                </svg>
            </button>
        </div>
    </div>
</div>

<!-- <div class="overflow-x-auto">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="min-w-full">
          <thead class="bg-dark text-white">
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Title</th>
              <th>Descritpion</th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="event in store.find(searchQuery)" :key="event.key" 
                class="active bg-gray-100 border-b">
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{ event.date }}</td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{ `${event.timeStart}-${event.timeEnd}` }}</td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{ event.title }}</td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{ event.description }}</td>
              </tr>
          </tbody>

        </table>
      </div>
    </div>
  </div>
</div> -->

</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core"
import { useEventsStore } from "../stores/events"

const store = useEventsStore()
let searchQuery = ref('')
</script>


<style scoped>
.search-container {
    display: flex;
    flex-direction: column;
}
</style>

