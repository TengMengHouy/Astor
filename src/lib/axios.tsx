import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AUTHGATE_API_BASE_URL ?? "/api/v2/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})
export default api;
