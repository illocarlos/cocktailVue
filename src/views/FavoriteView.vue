<script setup>
defineProps({
    title: {
        type: String,
    }
})
</script>

<template>
    <h1 class="text-6xl font-extrabold">{{title}}</h1>
</template>