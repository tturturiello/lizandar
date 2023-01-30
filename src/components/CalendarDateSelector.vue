<template>
  <div class="calendar-date-selector, btn-group">
    <button @click="selectPrevious" class="btn">«</button>
    <button @click="selectCurrent" class="btn">Today</button>
    <button @click="selectNext" class="btn">»</button>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import { ref } from 'vue'

const name = ref('CalendarDateSelector')
const emit = defineEmits(['dateSelected'])

const props = defineProps({
  viewMode: {
    type: String,
    required: true,
    default: 'month'
  },
  currentDate: {
    type: String,
    required: true
  },

  selectedDate: {
    type: Object,
    required: true
  }
})

function selectPrevious() {
  let newSelectedDate = dayjs(props.selectedDate).subtract(1, props.viewMode)
  emit('dateSelected', newSelectedDate)
}

function selectCurrent() {
  let newSelectedDate = dayjs(props.currentDate)
  emit('dateSelected', newSelectedDate)
}

function selectNext() {
  let newSelectedDate = dayjs(props.selectedDate).add(1, props.viewMode)
  emit('dateSelected', newSelectedDate)
}
</script>


<style scoped>
.calendar-date-selector {
  display: flex;
  justify-content: space-between;
  width: 80px;
  color: var(--grey-800);
}

.calendar-date-selector > * {
  cursor: pointer;
  user-select: none;
}
</style>