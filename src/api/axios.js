import axios from "axios"


export default axios.create({
    baseURL: 'https://e292-2804-431-c7da-a991-3431-320a-95e5-9999.ngrok-free.app',
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    }
})