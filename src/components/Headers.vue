<script setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useDrinkStore } from '../stores/drink'
import{ useStoreAlert } from '../stores/alert'

const store = useDrinkStore()
const alert = useStoreAlert()
const route = useRoute()

const homePage = computed(() => route.name === 'home')

const handleSubmit = () => {
    if (Object.values(store.search).includes("")) {
        alert.text = "fill in all the fields"
        alert.show = true
        alert.error=true
        return 
    }
    store.queryingAPI()
}



</script>

<template>
  <header 
  :class="[homePage?'header':'']"
  class="bg-slate-900">
    <div class="mx-auto container px-5 py-16">
<div class="flex justify-between items-center">
    <div>
        <RouterLink
        :to="{name:'home'}"
        >
<img class="w-32" src="/img/logo.svg" alt="logo cocktail team">
        </RouterLink>
    </div>
    <nav class="flex gap-4">

<RouterLink class=" text-purple-600 uppercase font-extrabold " 
active-class="text-xl text-white"
:to="{name:'home'}">Home</RouterLink>


    <RouterLink class="text-purple-600  uppercase font-extrabold"  
    active-class="text-xl text-white"
    :to="{ name: 'favorite' }">Favorite</RouterLink>

    </nav>
</div>

<form 
v-if="homePage"
class="md:w-1/2 2xl:1/3 bg-gradient-to-tr from-purple-600 via-purple-300 to-orange-600  my-32 p-10 rounded-lg shadow-lg space-y-6"
@submit.prevent="handleSubmit">
<div class="space-y-6">
    <label 
    class="block text-orange-800 uppercase font-extrabold text-lg"
    for="ingredient">Name or ingredient</label>
    <input 
    class="p-3 w-full rounded-lg focus:outline-none"
    id="ingredient"
    type="text"
    placeholder="Name or ingredient:vodka,tequila,San Francisco..."
    v-model="store.search.name">
</div>
    <div class="space-y-6">
        <label 
        class="block text-orange-800 uppercase font-extrabold text-lg"
        for="category">Category</label>
        <select 
        class=" text-center p-3 w-full rounded-lg focus:outline-none"
        id="category"
   v-model="store.search.category"
        >
        <option value="">-- select --</option>
        <option
        v-for="categorie , index in store.category"
        :key="index+1"
        :value="categorie.strCategory"
        >{{index+1}}-{{ categorie.strCategory }}</option> 
        </select>
    </div>
    <div class="flex justify-center">
        <button 
        class="bg-orange-300 text-purple-700 px-20 py-2 font-extrabold uppercase rounded-lg
        hover:bg-purple-200 hover:text-orange-700 ease-linear active:animate-ping hover:px-32 transition-all focus:outline-none"
        type="submit"
        value="search recipe"
        >
        send
    </button>
</div>

</form>

    </div>
  </header>
</template>
<style scoped>

.header{
background-image: url('/img/bg.jpg');
background-size: cover;
background-position: center;

}

</style>