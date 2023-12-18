<script setup>
import Recipe from '@/components/Recipe.vue';
import { useStoreFavorite } from '@/stores/favorite'
const favorite= useStoreFavorite()
defineProps({
    title: {
        type: String,
    }
})
</script>

<template>
    <h1 class=" text-center text-6xl font-extrabold">{{title}}</h1>
      <p v-if="favorite.zeroFav"
            class="my-10 text-center text-2xl font-extrabold">you don't have any recipe</p>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mt-10 gap-10">
   
      <Recipe
      v-for="favorito in favorite.fav"
      :key="favorito.idDrink"
      :recipe="favorito"
      /> 
      </div>
</template>