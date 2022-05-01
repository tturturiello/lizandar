<template>
<span class="disposed">
    <div class="menu w-8 p-0.1 rounded-box">{{ label }}</div>
    <div class="menu w-8 p-0.1 rounded-box">{{ dayWeek }}</div>
    <div class="menu w-8 p-0.1 rounded-box"></div>
</span>
</template>

<script>
export default {
    props: {
        dayWeek: String,
        label: String, 
    }
}
</script>

<style scoped>
.disposed {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}
</style>