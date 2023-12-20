// importamos api que es donde llamamos a la api y usamos axio y reclicamos codigo 

import api from "@/lib/axios"

// hacemos tres llamados a la api y exportamos lo exportaremos a los store y reciclamos mas codigo aun simplemente llamando cada funcion 
// hacemos la llamada que a su vez usamos axios forma limpia y buena de hacer los llamados 



// llamamos a la api como todas empiezan de la misma manera reciclamos y llamamos a api que tiene una parte de la url 
// que ya tenemos declara dentro con axios  aqui obtenemos la category que son un listado de strign 
//es llamado en el store de drink 
const getCategory = () => api.get('/list.php?c=list')


//es llamado en el store de drink y aqui recogemos el search que es un string de getcategory y el name  es pasado desde el store 
// podria haberlo desrtructurado pero creo que es mas entendible asi
const getQuerying = (search) => {

    return api.get(`/filter.php?c=${search.category}&i=${search.name}`)
}

const getNotAlc = () => api('filter.php?a=Non_Alcoholic')

// recogemos el id para hacer una peticion get y solo los recoge el id de esa bebida
//es metodo get pero no hace falta usar este metodo
const selectId = (id) => {

    return api(`/lookup.php?i=${id}`)
}


//IMPORTANTE TODO SON USAN METODO GET Y COMO TAL NO HACE FALTA COLOCARLO POR QUE DE FORMA PREDETERMINADA SE USA PERO SI QUEREMOS USAFR 
//POST PUT PATCH O DELETE DEBEMOS EXPESIFICARLO 

// aqui exportamos las funciones que queremos mandar a los store  en este caso todas van al store de drink
export default {
    getNotAlc,
    getCategory,
    getQuerying,
    selectId
}