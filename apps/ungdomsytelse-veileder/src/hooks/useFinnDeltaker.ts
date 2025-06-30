import { useQuery } from '@tanstack/react-query';
import { ApiError } from '@navikt/ung-common';
import { findDeltakerByIdent } from '../api/deltaker/findDeltaker';
import { queryKeys } from '../queries/queryKeys';
import { Deltaker, UregistrertDeltaker } from '../types/Deltaker';

export const useFinnDeltaker = (deltakerIdent: string, enabled = true) => {
    return useQuery<Deltaker | UregistrertDeltaker, ApiError>({
        queryKey: queryKeys.finnDeltaker(deltakerIdent),
        queryFn: () => findDeltakerByIdent(deltakerIdent),
        enabled: enabled && !!deltakerIdent,
        retry: 1,
    });
};
