import axios from "axios"


export default axios.create({
    baseURL: 'https://619d-2804-431-c7db-9979-d460-6c00-4c3a-878f.ngrok-free.app',
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    }
})