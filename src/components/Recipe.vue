<script setup>
import { useDrinkStore } from "@/stores/drink"

const store = useDrinkStore()


defineProps({
    recipe: {
        type:Object
    }
})
const handleSelectRecipes = (id) => {
    store.selectRecipes(id)
}

</script>

<template>
    <div class="border shadow-lg">
        <div class="overflow-hidden">
            <img
            class="hover:scale-125 transition-transform hover:rotate-3"
            :src=" recipe.strDrinkThumb " :alt="`image of ${recipe.strDrink}`">
        </div>
        <div class="p-5">
            <h2 class="text-2xl truncate font-extrabold  text-center">{{ recipe.strDrink }}</h2>
            <button
            class="bg-orange-400 mt-5 w-full p-3 font-bold text-white text-lg
            hover:bg-orange-600 transition-all"
            type="button"
            @click="handleSelectRecipes(recipe.idDrink)"
           
            >look recipes</button>
        </div>
    </div>
</template>