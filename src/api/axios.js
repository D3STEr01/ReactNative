import axios from "axios"


export default axios.create({
    baseURL: 'https://146f-2804-431-c7db-a111-601f-342d-24c5-e6a9.ngrok-free.app',
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    }
})