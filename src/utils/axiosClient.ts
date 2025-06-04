import axios from "axios";


// https://zone-x-server.vercel.app/
// http://localhost:5000
const axiosClient = axios.create({
    baseURL: 'https://zone-x-server.vercel.app',
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosClient.interceptors.request.use((config) => {
    const stored = localStorage.getItem('signinInfo');

    let token: string | null = null;

    if (stored) {
        const parsed = JSON.parse(stored);
        token = parsed.token;
    }
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, (error) => {
    return Promise.reject(error)
})


export default axiosClient;

