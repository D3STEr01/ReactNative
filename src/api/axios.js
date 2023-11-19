import axios from "axios"


export default axios.create({
    baseURL: 'https://5f2e-2804-431-c7db-9979-50c5-6bde-58e4-47c.ngrok-free.app',
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    }
})