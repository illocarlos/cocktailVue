import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useStoreFavorite } from './favorite'
import { useDrinkStore } from '@/stores/drink'
export const useStoreModal = defineStore('modal', () => {
    const store = useDrinkStore()
    const fav = useStoreFavorite()
    const modal = ref(false)


    function clickShowModal() {
        modal.value = !modal.value

    }
    const reactiveFavBotton = computed(() => {
        return fav.exisitFav(store.drinkId.idDrink) ? 'deleted favorite' : 'add favorite'
    })

    return {
        modal,
        clickShowModal,
        reactiveFavBotton
    }
})