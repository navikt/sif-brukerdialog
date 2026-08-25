import { isK9FormatError, K9Format, K9Sak, UgyldigK9SakFormat } from '@app/types';
import {
    getEndringsdato,
    getTillattEndringsperiode,
    isK9SakErInnenforGyldigEndringsperiode,
    parseK9Format,
} from '@app/utils';
import { appLogger } from '@sif/apm';
import { isAxiosError } from 'axios';

import { verifyK9Format } from '../../utils/verifyk9Format';
import api from '../api';
import { ApiEndpointInnsyn } from '.';

export type K9SakResult = K9Sak | UgyldigK9SakFormat;

const sakerEndpoint = {
    fetch: async (): Promise<{ k9Saker: K9SakResult[]; eldreSaker: K9SakResult[] }> => {
        const endringsperiode = getTillattEndringsperiode(getEndringsdato());
        try {
            const { data } = await api.innsyn.get<K9Format[]>(ApiEndpointInnsyn.sak);
            const k9Saker: K9SakResult[] = [];
            const eldreSaker: K9SakResult[] = [];
            data.forEach((sak, index) => {
                try {
                    verifyK9Format(sak);
                    const parsedSak = parseK9Format(sak);
                    if (isK9SakErInnenforGyldigEndringsperiode(parsedSak, endringsperiode)) {
                        k9Saker.push(parsedSak);
                    } else {
                        eldreSaker.push(parsedSak);
                    }
                } catch (error) {
                    if (isK9FormatError(error)) {
                        const ugyldigeFelt = error.error.cause?.ugyldigeFelt;
                        k9Saker.push({
                            erUgyldigK9SakFormat: true,
                            detaljer: Array.isArray(ugyldigeFelt) ? { ugyldigeFelt } : undefined,
                        });
                        appLogger.logException(error.error, {
                            sakIndex: index,
                            cause: error.error instanceof Error ? error.error.cause : undefined,
                        });
                    } else {
                        appLogger.logException(error, {
                            context: 'sakerEndpoint.parseK9Format',
                            sakIndex: index,
                        });
                        throw error;
                    }
                }
            });
            return { k9Saker, eldreSaker };
        } catch (error) {
            if (isAxiosError(error)) {
                appLogger.logApiError(error, 'sakerEndpoint.fetch');
            } else if (!isK9FormatError(error)) {
                appLogger.logException(error, { context: 'sakerEndpoint.fetch failed - unexpected' });
            }
            return Promise.reject(error);
        }
    },
};

export default sakerEndpoint;
