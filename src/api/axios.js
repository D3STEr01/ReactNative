import axios from "axios"


export default axios.create({
    /* Abra o ngrok, coloque o comando "ngrok http 8001 e cole aqui o https que o programa retorna"*/
    baseURL: 'https://b183-2804-431-c7da-f140-938-caa4-95bc-4d97.ngrok-free.app',
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    }
})