
<script>
export default {
    props: {
        title: String, 
        timeStart: String, 
        timeEnd: String
    }
}
</script>

<template>
<div class="menu w-56 bg-secondary text-secondary-content p-0.1 rounded-box">{{ title }}</div>
</template>