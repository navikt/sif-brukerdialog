import { fetchSøker } from '@navikt/sif-common-api';
import { queryOptions } from '@tanstack/react-query';

export const fetchSøkerQueryOptions = () => {
    return queryOptions({
        queryKey: ['søker'],
        queryFn: fetchSøker,
    });
};
