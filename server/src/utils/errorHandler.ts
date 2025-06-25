import axios from 'axios';
import type { Request, Response } from 'express';

// TODO: Legg til mer avansert feilhåndtering
export function errorHandling(error: Error, _: Request, response: Response) {
    if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
    }
    response.status(500).json({
        error: 'Internal server error',
    });
}
