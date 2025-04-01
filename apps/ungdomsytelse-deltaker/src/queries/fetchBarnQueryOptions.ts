import { fetchBarn } from '@navikt/sif-common-api';
import { queryOptions } from '@tanstack/react-query';

export const fetchBarnQueryOptions = () => {
    return queryOptions({
        queryKey: ['barn'],
        queryFn: fetchBarn,
    });
};
