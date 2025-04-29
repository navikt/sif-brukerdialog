import { deltakerApiService } from '../api/deltakerApiService';
import { queryOptions } from '@tanstack/react-query';

export const fetchDeltakerKontonummerOptions = () => {
    return queryOptions({
        queryKey: ['kontonummer'],
        queryFn: deltakerApiService.getKontonummer,
    });
};
