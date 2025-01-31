import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Helpers for sending API requests.
 *  Includes a managed "Loading" flag to signal if a request is being completed
 */
export const useHttpClient = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>();

    const activeHttpRequests = useRef<AbortController[]>([]);

    // Sends an API request
    const sendRequest = useCallback(async (url: string, method = 'GET', body = undefined as BodyInit | undefined | null, headers = {}) => {

        setIsLoading(true);
        const httpAbortController = new AbortController();
        activeHttpRequests.current.push(httpAbortController);
        try {
            const response = await fetch(
                url,
                {
                    method,
                    headers,
                    body
                }
            );

            activeHttpRequests.current = activeHttpRequests.current.filter(a => a !== httpAbortController);
            const responseData = response.status !== 204 ? await response.json() : {};

            if (!response.ok) {
                throw new Error(responseData.message);
            }

            setIsLoading(false);
            return responseData
        } catch (e: any) {
            setIsLoading(false);
            setError(e.message || "An error occurred.");
            throw e;
        }
    }, [])

    const clearError = () => {
        setError(null);
    }

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(a => a.abort())
        };
    }, []);

    return { isLoading, error, sendRequest, clearError };
}