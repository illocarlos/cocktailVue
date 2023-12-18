import { ref, watch, watchEffect } from "vue"
import { defineStore } from "pinia"

export const useStoreAlert = defineStore('alert', () => {
    const text = ref('')
    const error = ref(false)
    const show = ref(false)

    function $reset() {
        text.value = ''
        error.value = false
        show.value = false
    }

    // otra forma de hacerlo es con watch lo pongo abajo comentado !!!watch es para observar los cambio de un solo valor 
    // y watchEffect de varios en este caso usaremos watchEffect y no hace falta darle un valor en los parametros


    // watchEffect(() => {
    //     if (show.value) {
    //         setTimeout(() => {
    //             text.value = ''
    //             error.value = false
    //             show.value = false
    //         }, 3000)
    //     }
    // })



    watch(show, () => {
        if (show.value) {
            setTimeout(() => {
                text.value = ''
                error.value = false
                show.value = false
            }, 3000)
        }
    })






    return {
        text,
        error,
        show,
        $reset,
    }
})