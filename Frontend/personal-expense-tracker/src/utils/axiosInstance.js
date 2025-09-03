import axios from "axios";
import { BASE_URL } from "./apiPath";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

//request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        //handle common errrors globally
        if (error.response) {
            if (error.response.status === 401) {
                window.location.href = "/login";

            } else if (error.response.status === 500) {
                console.error("server error,please try again");
            }
        }
        else if (error.code === "ECONNABORTED") {
            console.error("REQUEST timeout, please try again");
        }
        return Promise.reject(error)
    }

);

export default axiosInstance;