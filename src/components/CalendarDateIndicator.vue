<template>
  <div class="calendar-date-indicator">{{ selectedMonth() }}</div>
</template>

<script setup>
const props = defineProps({
    selectedDate: {
      type: Object,
      required: true
    }
})

function selectedMonth() {
  return props.selectedDate.format("MMMM YYYY");
}
</script>


<style scoped>
.calendar-date-indicator {
  font-size: 24px;
  font-weight: 600;
  color: var(--grey-00);
}
</style>