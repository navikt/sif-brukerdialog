import { useQuery } from '@tanstack/react-query';
import { ApiError } from '@navikt/ung-common';
import { findDeltakerByIdent } from '../api/deltaker/findDeltaker';
import { queryKeys } from '../queries/queryKeys';
import { Deltaker, UregistrertDeltaker } from '../types/Deltaker';
import { isAxiosError } from 'axios';
import { AppHendelse } from '../utils/analytics';
import { useAppEventLogger } from '../utils/analyticsHelper';
import { useEffect } from 'react';

export const useFinnDeltaker = (deltakerIdent: string, enabled = true) => {
    const { log } = useAppEventLogger();
    const query = useQuery<Deltaker | UregistrertDeltaker, ApiError>({
        queryKey: queryKeys.finnDeltaker(deltakerIdent),
        queryFn: () => findDeltakerByIdent(deltakerIdent),
        enabled: enabled && !!deltakerIdent,
        retry: 1,
    });
    useEffect(() => {
        if (!query.isSuccess || !query.data) return;
        const data = query.data;
        if ((data as Deltaker)?.id !== undefined) {
            log(AppHendelse.registrertDeltakerFunnet);
        } else {
            log(AppHendelse.nyDeltakerFunnet);
        }
        // deps: when success flag flips or data ref changes, we log once per fetch
    }, [query.isSuccess, query.data, log]);

    useEffect(() => {
        if (!query.isError || !query.error) return;
        const original = (query.error as ApiError).originalError;
        if (isAxiosError(original)) {
            const status = original.status;
            if (status === 403) {
                log(AppHendelse.finnDeltakerIkkeTilgang);
            } else if (status === 404) {
                log(AppHendelse.finnDeltakerIkkeFunnet);
            } else if (status === 500) {
                log(AppHendelse.finnDeltakerApiFeil);
            } else {
                log(AppHendelse.finnDeltakerApiFeil);
            }
        } else {
            log(AppHendelse.finnDeltakerApiFeil);
        }
        // deps: log on transitions to error
    }, [query.isError, query.error, log]);

    return query;
};
