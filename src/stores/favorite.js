import { defineStore } from 'pinia'
import { useDrinkStore } from '@/stores/drink'
import { computed, onMounted, ref, watch } from 'vue'
import { useStoreModal } from '@/stores/modal'
import { useStoreAlert } from '@/stores/alert'

export const useStoreFavorite = defineStore('favorite', () => {
    const alert = useStoreAlert()
    const modal = useStoreModal()
    const store = useDrinkStore()
    const fav = ref([])

    onMounted(() => {
        fav.value = JSON.parse(localStorage.getItem('fav')) ?? []
    })
    watch(fav, () => {
        saveLocalStorage()
    }, {
        deep: true
    })



    function deletedFav() {
        fav.value = fav.value.filter(favo => favo.idDrink !== store.drinkId.idDrink)
        alert.show = true
        alert.error = true
        alert.text = 'deleted of favorite'
        setTimeout(() => {
            alert.$reset()
        }, 3000)
    }

    function addFav() {
        fav.value.push(store.drinkId)
        alert.show = true
        alert.text = 'add to favorite'

        setTimeout(() => {
            alert.$reset()
        }, 3000)
    }

    function saveLocalStorage() {
        localStorage.setItem('fav', JSON.stringify(fav.value))

    }



    function exisitFav(id) {
        const allFav = JSON.parse(localStorage.getItem('fav'))

        return allFav.some(fav => fav.idDrink === id)
    }




    function handleClickFav() {
        if (exisitFav(store.drinkId.idDrink)) {
            deletedFav()
        } else {

            addFav()
        }
        modal.clickShowModal()


    }
    const zeroFav = computed(() => fav.value.length === 0)


    return {
        handleClickFav,
        fav,
        exisitFav,
        zeroFav
    }
})