<template>
    <div class="form-control bg-white">
        <div class="">Create New Calendar</div>

        <label class="label">
          <span class="label-text text-black">Name</span>
        </label>
        <input v-model="name" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs bg-white">


        <span>
            <button @click="$emit('calendar-created', { calendarName: name, color: '', enabled: true})" class="form-control btn btn-success">Create</button>
        </span>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')

</script>
