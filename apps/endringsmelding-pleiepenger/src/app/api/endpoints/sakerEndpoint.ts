import { isK9FormatError, K9Format, K9Sak, UgyldigK9SakFormat } from '@app/types';
import { getEndringsdato, getTillattEndringsperiode, parseK9Format } from '@app/utils';
import { appLogger } from '@sif/apm';
import { isAxiosError } from 'axios';

import { erSakEldreEnnEndringsperiode, lesSøknadsperioder } from '../../tilgang/lesSøknadsperioder';
import { verifyK9Format } from '../../utils/verifyk9Format';
import api from '../api';
import { ApiEndpointInnsyn } from '.';

export type K9SakResult = K9Sak | UgyldigK9SakFormat;

export const sakerEndpoint = {
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
                    if (erSakEldreEnnEndringsperiode(parsedSak.ytelse.søknadsperioder, endringsperiode)) {
                        eldreSaker.push(parsedSak);
                    } else {
                        k9Saker.push(parsedSak);
                    }
                } catch (error) {
                    if (isK9FormatError(error)) {
                        const ugyldigeFelt = error.error.cause?.ugyldigeFelt;
                        const detaljer = Array.isArray(ugyldigeFelt) ? { ugyldigeFelt } : undefined;
                        /**
                         * Saken kan ikke leses i sin helhet, men søknadsperiodene kan ofte leses
                         * likevel. Er saken for gammel til å kunne endres, skal den ikke blokkere
                         * en nyere sak bruker faktisk kan gjøre noe med.
                         */
                        const søknadsperioder = lesSøknadsperioder(sak);
                        const erEldre =
                            søknadsperioder !== undefined &&
                            erSakEldreEnnEndringsperiode(søknadsperioder, endringsperiode);

                        (erEldre ? eldreSaker : k9Saker).push({
                            erUgyldigK9SakFormat: true,
                            detaljer,
                        });
                        /**
                         * Håndtert valideringsfeil (saken fra backend har feil format), ikke en
                         * uventet feil i frontend. Logges derfor som info, ikke som exception.
                         * ugyldigeFelt inneholder kun feltnavn, ikke verdier, og er trygt å logge.
                         */
                        appLogger.logInfo(
                            `sakerEndpoint.verifyK9Format: ugyldig k9-format (eldre=${erEldre}${
                                detaljer ? `, ugyldigeFelt=${detaljer.ugyldigeFelt.join(',')}` : ''
                            })`,
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
