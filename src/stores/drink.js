import { defineStore } from 'pinia'
import { ref, reactive, onMounted } from 'vue'
import ApiService from '@/service/ApiService.js'
import { useStoreModal } from './modal.js'



export const useDrinkStore = defineStore('drink', () => {
    const modal = useStoreModal()
    const category = ref([])
    const drinkId = ref({})
    const search = reactive({
        name: '',
        category: ''

    })
    const totalQuering = ref([])

    onMounted(async function () {
        const { data: { drinks } } = await ApiService.getCategory()
        category.value = drinks

    })
    async function queryingAPI() {
        const { data: { drinks } } = await ApiService.getQuerying(search)
        totalQuering.value = drinks
    }


    async function selectRecipes(id) {
        const { data: { drinks } } = await ApiService.selectId(id)
        drinkId.value = drinks[0]

        modal.clickShowModal()

    }

    return {
        category,
        search,
        queryingAPI,
        totalQuering,
        drinkId,
        selectRecipes
    }

})