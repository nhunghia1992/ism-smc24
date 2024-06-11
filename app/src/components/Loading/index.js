import styles from "./index.module.css"
import axios from 'axios';

import { useEffect, useState } from "react";

function Loading() {
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        // Add a request interceptor
        const requestInterceptor = axios.interceptors.request.use(
            function (config) {
                // Do something before request is sent
                setIsLoading(true)
                return config;
            },
            function (error) {
                // Do something with request error
                setIsLoading(false)
                return Promise.reject(error);
            }
        );

        // Add a response interceptor
        const responseInterceptor = axios.interceptors.response.use(
            function (response) {
                // Do something with the response data
                setIsLoading(false)
                return response;
            },
            function (error) {
                // Do something with response error
                setIsLoading(false)
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        }
    }, [])

    return (
        <>
            {
                isLoading &&
                <div className={styles.backdrop}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
        </>
    )
}

export default Loading