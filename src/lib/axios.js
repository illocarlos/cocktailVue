// aqui hacemos la llamada axios recogiendo la url y exportandola es uan forma buena de no copiar el codigo una y otra vez
// la llamamos uan sola vez y la importamos ahora podremos llamarla con la palabra api siempre que queramos hacer una llamada 
//unicamente es llamada en service ahi centralizamos toda las llamadas a la api es buen practica

// como 
import axios from 'axios'

const api = axios.create({
    baseURL: 'https://www.thecocktaildb.com/api/json/v1/1'
})

export default api