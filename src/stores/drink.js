// explicamos todo el groso del storage aqui losdemas se explican muy parecido quitando la logica que la explicaremos
//si es concreta

//aqui llamamos todo los metodoso que ya sabemos y que no lo explicaremos

//este se usa para llamar a pinia sin el no tiene sentido este storage
import { defineStore } from 'pinia'

//llamamos los metodos de vue ref,reactive para dar valore reactivo

//EXPLICACION ONMOUNTED
//onMounted se usa para montar un valor reactivo al abrir un componente en la pagina
//se usa para realizar tareas una vez el componente esta abierto y desaparecen cuando el componente se cierra
//normalmente se usa para acciones que no perduran(simples) para localstorage y guardar info,para datos reactivos que solo se usan en ese componente

//EXPLICACION COMPUTED
//funcion que observa cuando un valor reactivo cambia y ella cambia es decir una funcion que esta en constante cambio si los valores
//son diferente
import { ref, reactive, onMounted, computed } from 'vue'
//aqui creamos un archivo llamado service en el lo hicimos copmo buena practica y para reducir el codigo de aqui ya que
//usariamos la url de la api y sus metodos (get,post,put,patch,delete) pues reducimos el codigo y queda mas limpio
import ApiService from '@/service/ApiService.js'
// llamada a la sotre modal
import { useStoreModal } from './modal.js'
// aqui creamos el store y debemos llamrlo de esta manera dandole un valor y un callback
//IMPORT -> la buena practica es llamar dentro de los store a las funciones como tal sin ser callback ni delcarar es deci:
//function nombreFuncion(){ aqui logica }
//y si quieres llevarla a algun componente o vista debes pasar el nombre al return

export const useDrinkStore = defineStore('drink', () => {
    // en la parte mas superior le mandamos las store nombrandolos
    const modal = useStoreModal()
    // despues todo los datos reactivos yo dejo los objetos algo mas abajo
    const spinnerShow = ref(false)
    const category = ref([])
    const filterMasure = ref([])
    const totalQuering = ref([])
    const filterIngredient = ref([])

    // aqui mandamos los objetos reactivos decimos que para objetos la palabra reservada es reactive en vez de ref
    // pero cuando no sabemos lo que hay dentro de un objeto como por ejemplo al pasar un objeto de la api que sea muy grande
    // normalmente usamos ref por que reactive debes pasarle las key y si son muchas o no sabes cuantas tienes la forma mas practica es ref
    const drinkId = ref({})
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


    // esta es usada onMounted ya que es la primera peticion y al usar el componente que el principal montamos esta function
    // el formulario esta en el componente headers que esta en el home y recogemos las categorias de la api y las reflejamos en el formulario
    // asi que si la api se actualiza nosotros actualizamos independientemente
    onMounted(async function () {

        const { data: { drinks } } = await ApiService.getCategory()
        // simplemente le damos toda las probabildiades para un selector de un formulario y poder elegir las que la api nos da
        // y se la pasamos al objeto reactivo search
        category.value = drinks

    })
    // usamos una funcion asyn que normalmente se usa para recibir una api en ella destructuramos la data como drinks y esperamos
    // la llamada de la api le pasamops el search en este caso es la categoria que recogemos anteriormente en un formulario se la pasamos a la api
    // para colocarla en la url para la peticion ya que la peticion necesita un name y category para filtrar y recibir las bebidas
    //con esas categoria

    async function queryingAPI() {
        // este spiner es meramente estetido lo hacemos true para que se muestre y le damos un setTimeout para que quede en la pantalla ese tiempo
        // al pasar 3 seg recibimos las bebida y cerramos el spinner
        spinnerShow.value = true

        // aqui le pasamos search a  una peticion a la api ara que busque  las bebidad que esten vinculadas con ese nombre
        const { data: { drinks } } = await ApiService.getQuerying(search)
        // y esperamos unos segundo para usar el spinner
        setTimeout(() => {
            totalQuering.value = drinks
            spinnerShow.value = false
        }, 2000)

    }


    async function noAlc() {

        spinnerShow.value = true
        const { data: { drinks } } = await ApiService.getNotAlc()

        setTimeout(() => {
            totalQuering.value = drinks
            spinnerShow.value = false
        }, 2000)

    }



    // aqui filtramos el objeto tiene dos finalidades filtrar ingrdient y masure que estan en un objeto
    //le pasamos el id de la bebida para hacer la operacion de filtrado
    function filterIngredientFunction(drinkId) {

        let arrayIngredient = []
        let arrayMasure = []

        const newObjetcIngredient = {}
        const newObjetcMasure = {}

        // la pasamos las claves-valor de un objeto a un array para poder filtrarlo en este caso pasariamos de un objeto
        //lo hacemos array y poder iterar

        const entriesStrIngredient = Object.entries(drinkId.value);
        const entriesStrMeasure = Object.entries(drinkId.value);

        // hacemos una copia y filtramos el array con las key que lleven ese nombre
        //solo nos quedamos con esos valores y los demas los desechamos
        const Measure = entriesStrMeasure.filter(([key, value]) => key.includes('strMeasure'));
        const ingredient = entriesStrIngredient.filter(([key, value]) => key.includes('strIngredient'));

        // creamos un objeto nuevo con las clave valor que filtramos
        ingredient.forEach(([key, value]) => newObjetcIngredient[key] = value)
        Measure.forEach(([key, value]) => newObjetcMasure[key] = value)

        // recogemos la informacion del nuevo objeto y se la damos al objeto reactivo que nombramos arriba
        ingredients.value = newObjetcIngredient
        Masure.value = newObjetcMasure
        //aqui eliminamos los valores que sean null o string vacio quedandonos con los que esta rellenos ya que hay
        // ingredientes y cantidades que esta sin llenar
        arrayIngredient = Object.entries(ingredients.value).filter(([key, value]) => value !== null || "");
        arrayMasure = Object.entries(Masure.value).filter(([key, value]) => value !== null || "");

        // eliminamos la posicion 0 ya que no nos interesa por que es la key solo queremos quedarnos con el valor
        //esto hace que eliminemos de los array dentro del array toda las posiciones 0 que en teoria son las key
        arrayIngredient.forEach(elem => elem.splice(0, 1))
        arrayMasure.forEach(elem => elem.splice(0, 1))

        // el .flat se usa para unificar en un array lo que hay dentro de un array es decir de esto [[a,b][a,b][a,b]] pasa a esto
        // -> [a,b,a,b,a,b]
        filterIngredient.value = arrayIngredient.flat()
        filterMasure.value = arrayMasure.flat()
    }

    // aqui le mandamos el id a la api y realizamos aqui la peticion recibimos el id lo destructuramos
    // el data para ser mas explicito y solo coger la bebida asi recibimos solo el id
    async function selectRecipes(id) {
        const { data: { drinks } } = await ApiService.selectId(id)
        drinkId.value = drinks[0]

        // aqui filtramos ese id con la funcion de arriba recogiendo ingrediente y cantidades
        filterIngredientFunction(drinkId)
        // y abrimos modal una funcion del store modal
        modal.clickShowModal()

    }

    const zeroDrink = computed(() => totalQuering.value.length === 0)

    return {
        noAlc,
        category,
        search,
        drinkId,
        queryingAPI,
        totalQuering,
        selectRecipes,
        filterIngredient,
        filterMasure,
        zeroDrink,
        spinnerShow

    }

})