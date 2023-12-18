<script setup>
import { useDrinkStore } from '../stores/drink'
import Recipe from '@/components/Recipe.vue';

const store = useDrinkStore()

defineProps({
  title: {
   type: String,
  }
})
</script>

<template>
  <h1 class="text-6xl text-center font-extrabold">{{title}}</h1>

<p v-if="store.zeroDrink" 
      class="my-10 text-center text-2xl font-extrabold">There is no result, look for recipes in the search engine</p>
  <div v-else class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mt-10 gap-10">

  <Recipe
  v-for="recipe in store.totalQuering"
  :key="recipe.idDrink"
  :recipe="recipe"
  />
  </div>
</template>