import axios from "axios"


export default axios.create({
    baseURL: 'https://9992-2804-431-c7da-2dc7-f8a7-ff37-537d-af7.ngrok-free.app',
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    }
})