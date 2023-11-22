import axios from "axios"


export default axios.create({
    baseURL: 'https://df38-2804-431-c7db-9979-a115-13d2-969b-b106.ngrok-free.app',
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    }
})