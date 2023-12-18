import { defineStore } from 'pinia'
import { ref, reactive, onMounted, computed } from 'vue'
import ApiService from '@/service/ApiService.js'
import { useStoreModal } from './modal.js'



export const useDrinkStore = defineStore('drink', () => {
    const modal = useStoreModal()
    const category = ref([])
    const drinkId = ref({})

    const filterIngredient = ref([])
    const filterMasure = ref([])
    const ingredients = reactive({
        key: '',
        value: ''

    })
    const Masure = reactive({
        key: '',
        value: ''

    })

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

    function filterIngredientFunction(drinkId) {

        let arrayIngredient = []
        let arrayMasure = []

        const newObjetcIngredient = {}
        const newObjetcMasure = {}

        const entriesStrIngredient = Object.entries(drinkId.value);
        const entriesStrMeasure = Object.entries(drinkId.value);

        const Measure = entriesStrMeasure.filter(([key, value]) => key.includes('strMeasure'));
        const ingredient = entriesStrIngredient.filter(([key, value]) => key.includes('strIngredient'));

        ingredient.forEach(([key, value]) => newObjetcIngredient[key] = value)
        Measure.forEach(([key, value]) => newObjetcMasure[key] = value)


        ingredients.value = newObjetcIngredient
        Masure.value = newObjetcMasure

        arrayIngredient = Object.entries(ingredients.value).filter(([key, value]) => value !== null || "");
        arrayMasure = Object.entries(Masure.value).filter(([key, value]) => value !== null || "");

        arrayIngredient.forEach(elem => elem.splice(0, 1))
        arrayMasure.forEach(elem => elem.splice(0, 1))

        filterIngredient.value = arrayIngredient.flat()
        filterMasure.value = arrayMasure.flat()
    }

    async function selectRecipes(id) {
        const { data: { drinks } } = await ApiService.selectId(id)
        drinkId.value = drinks[0]

        filterIngredientFunction(drinkId)
        modal.clickShowModal()

    }
    const zeroDrink = computed(() => totalQuering.value.length === 0)

    return {
        category,
        search,
        drinkId,
        queryingAPI,
        totalQuering,
        selectRecipes,
        filterIngredient,
        filterMasure,
        zeroDrink

    }

})