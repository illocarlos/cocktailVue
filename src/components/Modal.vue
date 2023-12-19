<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useStoreModal } from '@/stores/modal'
import { useDrinkStore } from '@/stores/drink'
import { useStoreFavorite } from '@/stores/favorite'

const modal = useStoreModal()
const store = useDrinkStore()
const favorite = useStoreFavorite()
</script>

<template>
    <TransitionRoot as="template" :show="modal.modal">
        <Dialog as="div" class="relative z-10 "
        @close="modal.clickShowModal()">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>
            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-slate-800  px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                            <div>
                                <div class="mt-3">
<DialogTitle as="h2"
class="text-center font-extrabold text-4xl text-purple-400">
{{store.drinkId.strDrink}}
</DialogTitle>
<img 
class="mx-auto w-80 mt-4"
:src="store.drinkId.strDrinkThumb" :alt='`image of drink ${store.drinkId.strDrink}`'>
      <DialogTitle as="h3"
        class="uppercase text-center font-extrabold text-2xl mt-5 text-white"
        >ingredient and measure
</DialogTitle>
<div class="flex flex-row justify-center  mt-3">
    <div class="mr-3  text-white">
    <p v-for="ingredient,i in store.filterIngredient" :key="i"> {{ ingredient }} </p>
    </div>
    <div
    class=" text-white">
    <p v-for="masure,i in store.filterMasure " :key="i">{{ masure }}</p>
    </div>
</div>

<DialogTitle
class="uppercase text-white text-center font-extrabold text-2xl mt-5"
as="h3">
instruccion
</DialogTitle>
<article
class="text-lg text-white  mt-3"
>
    {{ store.drinkId.strInstructions }}
</article>
                                </div>
                            </div>
                            <div class="mt-5 sm:mt-6 flex justify-center gap-4">
      
                                <button
     
                                class=" bg-gray-400 text-black px-6  md:px-20 md:py-2  lg:px-20 lg:py-2  text-md  font-extrabold uppercase rounded-lg
        hover:bg-black hover:text-white ease-linear active:animate-ping hover:px-28 transition-all focus:outline-none"
            type="button"
                                @click="modal.clickShowModal()">
                        close
                    </button>
                    <button
                  class=" bg-orange-300 text-purple-700 px-6 md:px-20 md:py-2    lg:px-20 lg:py-2  font-extrabold uppercase rounded-lg
        hover:bg-purple-700 hover:text-orange-500 ease-linear active:animate-ping hover:px-32 transition-all focus:outline-none"
                    type="button"
                    @click="favorite.handleClickFav()"
                    :class="[modal.reactiveFavBotton==='deleted favorite'?
                    'bg-red-900 text-white hover:text-black hover:bg-red-400 hover:px-28 ':'']">
                       {{modal.reactiveFavBotton }}
                    </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
        </div>
    </Dialog>
</TransitionRoot>

</template>
  