import api from "@/lib/axios"


const getCategory = () => api('/list.php?c=list')

const getQuerying = (search) => {

    return api(`/filter.php?c=${search.category}&i=${search.name}`)
}

const selectId = (id) => {

    return api(`/lookup.php?i=${id}`)
}



export default {
    getCategory,
    getQuerying,
    selectId
}