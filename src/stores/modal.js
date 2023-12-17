import { defineStore } from 'pinia'
import ApiService from '@/service/ApiService.js'
import { ref } from 'vue'


export const useStoreModal = defineStore('modal', () => {

    const modal = ref(false)


    function clickShowModal() {
        modal.value = !modal.value

    }


    return {
        modal,
        clickShowModal
    }
})