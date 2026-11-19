import { isK9FormatError, K9Format, K9Sak } from '@app/types';
import { parseK9Format } from '@app/utils';
import { appLogger } from '@sif/apm';
import { isAxiosError } from 'axios';

import { verifyK9Format } from '../../utils/verifyk9Format';
import api from '../api';
import { ApiEndpointInnsyn } from '.';

/**
 * Henter sakene til bruker. Saker med ugyldig format utelates, men telles, fordi backend
 * allerede har avgjort tilgangen ut fra alle sakene.
 */
export const sakerEndpoint = {
    fetch: async (): Promise<{ saker: K9Sak[]; antallUgyldige: number }> => {
        try {
            const { data } = await api.innsyn.get<K9Format[]>(ApiEndpointInnsyn.sak);
            const saker: K9Sak[] = [];
            let antallUgyldige = 0;
            data.forEach((sak, index) => {
                try {
                    verifyK9Format(sak);
                    saker.push(parseK9Format(sak));
                } catch (error) {
                    if (isK9FormatError(error)) {
                        antallUgyldige++;
                        /** ugyldigeFelt inneholder kun feltnavn, ikke verdier, og er trygt å logge. */
                        const ugyldigeFelt = error.error.cause?.ugyldigeFelt;
                        appLogger.logInfo(
                            `sakerEndpoint.verifyK9Format: ugyldig k9-format${
                                Array.isArray(ugyldigeFelt) ? ` (ugyldigeFelt=${ugyldigeFelt.join(',')})` : ''
                            }`,
                        );
                    } else {
                        appLogger.logException(error, {
                            context: 'sakerEndpoint.parseK9Format',
                            sakIndex: index,
                        });
                        throw error;
                    }
                }
            });
            return { saker, antallUgyldige };
        } catch (error) {
            if (isAxiosError(error)) {
                appLogger.logApiError(error, 'sakerEndpoint.fetch');
            } else {
                appLogger.logException(error, { context: 'sakerEndpoint.fetch failed - unexpected' });
            }
            return Promise.reject(error);
        }
    },
};
