<template>
    <button @click="clicked()" 
        class="menu w-56 text-secondary-content p-0.1 rounded-box text-[#44403C]"
        v-bind:style="{ 'background-color': color }"
        >{{ title.slice(0, 24) }}...
    </button>

</template>

<script setup>
import { useEventsStore } from "../stores/events";

const eventsStore = useEventsStore()

const props = defineProps({
    title: String, 
    category: String, 
    timeStart: String, 
    timeEnd: String,
    color: String,
    clicked: Function,
})
</script>
