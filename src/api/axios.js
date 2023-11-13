import axios from "axios"


export default axios.create({
    baseURL: 'https://c523-2804-431-c7da-a991-15b1-6af2-3cea-bb71.ngrok-free.app',
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    }
})