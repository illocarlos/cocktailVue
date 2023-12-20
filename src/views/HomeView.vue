
<!-- IMPORTANTE HOME COMO FAVORITOS ESTAN CREADOS DE LA MISMA FORMA LEER LOS CONCEPTOS AQUII 
  (alli cambia el storage que usamos uno diferente )


 en el home es la pantalla principal y llamamos a los componentes que haran que esta pantalla sea como tal  -->
<script setup>
// usaremos una apì externa de bebida y aqui usaremos pinia que es un composable !! debemos de llamarlo de su store 
//y la nomenclatura debe ir acompañada de use y store 
import { useDrinkStore } from '../stores/drink'
import Recipe from '@/components/Recipe.vue';

// aqi le damos el valor para poder usar ese store de pinia y si queremos usar las funciones de ese estore debe ir acompañado 
//en este caso store.(nombre de la funcion o valor reactivo )
const store = useDrinkStore()
// este props es una buena practica ya que viene de las rutas y se centraliza en esta si queremos pasarle un prop solo se cambia desde 
// un lugar en este caso le pasamos como prop el title y lo usamos como h1 
defineProps({
  title: {
   type: String,
  }
})
</script>

<template>
  <h1 class="text-6xl text-center font-extrabold">{{title}}</h1>

  <!-- forma de llama la funcion de pinia en este caso  creamos una condicion que esa funcion si retorna un valor de zero 
  aparecera esa recipiente y si no aparecera el componente de abajo-->
<p v-if="store.zeroDrink" 
      class="my-10 text-center text-2xl font-extrabold">There is no result, look for recipes in the search engine</p>
  <div v-else class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mt-10 gap-10">

<!-- en este componente le pasamos como prop del store una funcion(totalQuering) esa funcion llama una api y recoge la informacion 
 le damos una key que es la id de cada objeto de la api se llama idDrink por que asi se le puso el creador de esta (debes buscar como se llama 
 cada api se denomina de forma dif )-->

  <Recipe
  v-for="recipe in store.totalQuering"
  :key="recipe.idDrink"
  :recipe="recipe"
  />
  </div>
</template>