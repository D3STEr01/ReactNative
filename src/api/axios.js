import axios from "axios"


export default axios.create({
    /* Abra o ngrok, coloque o comando "ngrok http 8001 e cole aqui o https que o programa retorna"*/
    baseURL: 'https://d93c-2804-431-c7da-7f43-8092-b72b-5109-de26.ngrok-free.app',
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    }
})