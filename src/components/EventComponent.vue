<template>
    <button @click="() => $emit('eventClicked', this)" class="menu w-56 bg-secondary text-secondary-content p-0.1 rounded-box">{{ title }}</button>
</template>

<script setup>
const props = defineProps({
    title: String, 
    timeStart: String, 
    timeEnd: String
})
</script>
