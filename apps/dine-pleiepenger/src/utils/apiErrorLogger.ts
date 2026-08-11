import axios from 'axios';

export const logApiError = (error: unknown, context: string, options?: { ignore401?: boolean }) => {
    if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (options?.ignore401 && status === 401) {
            return;
        }
        console.error(`${context}:`, { code: error.code, status, message: error.message });
    } else if (error instanceof Error) {
        console.error(`${context}:`, error.message);
    }
};
