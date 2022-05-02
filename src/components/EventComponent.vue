<template>
    <button @click="() => $emit('eventClicked', this)" 
        class="menu w-56 text-secondary-content p-0.1 rounded-box text-[#44403C]"
        v-bind:style="{ 'background-color': hashColoring(category) }"
        >{{ title }}
    </button>

</template>

<script setup>
const props = defineProps({
    title: String, 
    category: String, 
    timeStart: String, 
    timeEnd: String,
})

function hashColoring(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 1; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}
</script>
