<template>
    <div class="form-control bg-white">
        <div class="">Create New Event</div>

        <label class="label">
          <span class="label-text text-black">Title</span>
        </label>
        <input v-model="title" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs bg-white">

        <label class="label">
          <span class="label-text text-black">Date</span>
        </label>
        <input v-model="date" type="date" placeholder="Type here" class="input input-bordered w-full max-w-xs bg-white">

        <label class="label">
          <span class="label-text text-black">Description</span>
        </label> 
        <textarea v-model="description" class="textarea bg-white textarea-bordered h-32" placeholder="Type here"></textarea>

        <label class="label">
          <span class="label-text text-black">Start Time</span>
        </label>
        <input v-model="timeStart" type="time" placeholder="Type here" class="input input-bordered w-full max-w-xs bg-white">

        <label class="label">
          <span class="label-text text-black">End Time</span>
        </label>
        <input v-model="timeEnd" type="time" placeholder="Type here" class="input input-bordered w-full max-w-xs bg-white">

        <label class="label">
          <span class="label-text text-black">Calendar</span>
        </label>
        <select 
          tabindex="0"  
          class="dropdown-content justify-start menu p-2 shadow bg-base-100 rounded-box w-52 bg-white">
          <option @click="onCalendarSelection($event)" v-for="calendar in store.calendars" :key="calendar">
              {{ calendar.calendarName }}
          </option>
        </select>

        <span>
            <button 
            @click="() => { $emit('event-created', { 
                title: title,
                description: description,
                date: getDate(),
                calendarName: getCalendar(),
                color: store.calendarColor(getCalendar()),
                timeStart: getStart(),
                timeEnd: getEnd()});
                }" 
            class="form-control btn btn-success">Create</button>
        </span>
    </div>
</template>


<script setup>
import { reactive, ref } from 'vue'
import { useEventsStore } from "../stores/events";

const store = useEventsStore()
const title = ref('')
let calendar = ref('')
const description = ref('')
const date = ref(null)
const timeStart = ref(null)
const timeEnd = ref(null)

function getStart() {
    return timeStart.value
}

function getEnd() {
    return timeStart.value
}

function getCalendar() {
    return calendar
}

function getDate() {
    return date.value
}

function onCalendarSelection(event) {
    console.log(event.target.value)
    console.log(timeStart.value)
    console.log(timeStart)
    console.log(timeEnd.value)
    console.log(timeEnd)
    calendar = event.target.value
}

function debug(str) {
    console.log(str)
}

</script>