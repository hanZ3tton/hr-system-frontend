import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "../lib/axios"; // Path relatif dari hooks/ ke lib/

// Mengubah endpoint menjadi '/api/profile' sesuai route Anda
const userEndpoint = "/api/profile";

/**
 * Hook kustom untuk manajemen autentikasi.
 * @param {object} options - Opsi middleware ('guest' atau 'auth').
 */
export const useAuth = ({ middleware } = {}) => {
    const router = useRouter();

    // Data user diambil dari useSWR
    const {
        data: user,
        error,
        mutate,
        isLoading,
    } = useSWR(
        userEndpoint,
        () =>
            axios
                .get(userEndpoint)
                .then((response) => response.data.data)
                .catch((error) => {
                    if (error.response?.status === 401) return null;
                    throw error;
                }),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            onError: (err) => {
                if (err.response?.status === 401) {
                    console.log("Authentication failed, user is null.");
                    return null;
                }
                console.error("SWR Fetch Error:", err);
            },
        },
    );

    // CSRF (Sangat penting untuk Laravel Sanctum)
    const csrf = async () => {
        await axios.get("/sanctum/csrf-cookie");
    };

    // Login
    const login = async ({ setErrors, setStatus, ...props }) => {
        setErrors({});
        setStatus(null);

        await csrf();

        try {
            await axios.post("/api/login", props);
            await mutate();
            router.push("/admin/dashboard");
        } catch (error) {
            if (
                error.response?.status !== 422 &&
                error.response?.status !== 401
            ) {
                throw error;
            }

            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({
                    general:
                        error.response?.data?.message ||
                        "Login gagal. Cek NIP dan Password Anda.",
                });
            }
        }
    };

    // Logout
    const logout = async () => {
        try {
            await axios.post("/api/logout");
            await mutate(null);
            router.push("/auth/login");
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    // Handler Middleware
    useEffect(() => {
        if (isLoading || error) return;

        if (middleware === "guest" && user) {
            router.push("/admin/dashboard");
        }

        if (middleware === "auth" && user === null) {
            router.push("/auth/login");
        }
    }, [user, error, isLoading, router, middleware]);

    return {
        user,
        csrf,
        isLoading,
        login,
        logout,
    };
};
