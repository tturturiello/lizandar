<template>
<span class="disposed">
    <span v-if="isToday">
        <!-- <div class="badge badge-outline badge-primary">{{ label }}</div> -->
        <div class="badge badge-primary">{{ label }}</div>
        <div class="menu w-8 p-0.1 rounded-box">{{ dayWeek }}</div>
    </span>
    <span v-else>
        <div class="menu w-8 p-0.1 rounded-box">{{ label }}</div>
        <div class="menu w-8 p-0.1 rounded-box">{{ dayWeek }}</div>
    </span>
</span>
</template>

<script setup>
if(props.isToday) {
    console.log(this)
}
const props = defineProps({
    dayWeek: String,
    label: String, 
    isToday: Boolean,
})
</script>

<style scoped>
.disposed {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}
</style>