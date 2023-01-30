<template>
  <div id="app">
    <Calendar/>
  </div>
</template>

<script>
import CalendarMonth from "./components/CalendarMonth.vue";
import Calendar from "./components/Calendar.vue";

export default {
  name: "App",

  components: {
    CalendarMonth,
    Calendar
},

};
</script>
