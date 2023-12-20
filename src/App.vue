<!-- en esta app vamos a usar el archivo app.vue que es el que estamos escribiendo como archivo para colocar componentes en el usamos el header 
que desde este nos desplazaremos a los diferentes componentes y usaremos alert como componenete ya que las alertas se veran en toda la aplicacion
ademas del modal por que se vera igualmente es toda la aplicacion son los 3 componentes principales por lo rtanto debe de ir en app.vue 
que es la parte mas superior de la aplicacion 
en el usaremos router para tener diferentes rutas y pantallas por lo tanto debemos llamar routerview -->

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
  <Modal/>
  <Alert/>
</main>
</template>

