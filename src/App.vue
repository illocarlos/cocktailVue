<script setup>
import { RouterView } from 'vue-router';
import Headers from './components/Headers.vue';
import Modal from './components/Modal.vue'
import Alert from './components/Alert.vue';
</script>

<template>
 <Headers/>
 <main class=" container mx-auto mt-10">
  <RouterView/>
 </main>
 <Modal/>
 <Alert/>
</template>

