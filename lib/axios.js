import axios from "axios";

// Konfigurasi ini diperlukan untuk mengirim cookie (seperti csrf-cookie dan session)
// ke backend Laravel, yang penting untuk Laravel Sanctum.
const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // Pastikan Anda mengatur NEXT_PUBLIC_BACKEND_URL di .env
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export default instance;
