<template>
  <div class="calendar-date-indicator">{{ selected() }}</div>
</template>

<script setup>
const props = defineProps({
  type: Object,
    selectedDate: {
      required: true
    }
})

function selected() {
  return props.selectedDate
}
</script>


<style scoped>
.calendar-date-indicator {
  font-size: 24px;
  font-weight: 600;
  color: var(--grey-00);
}
</style>