import { queryOptions } from '@tanstack/react-query';
import { deltakerApiService } from '../api/deltakerApiService';

export const fetchDeltakelserQueryOptions = () => {
    return queryOptions({
        queryKey: ['deltakelser'],
        queryFn: deltakerApiService.getAlleMineDeltakelser,
    });
};
