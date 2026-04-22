import { isK9FormatError, K9Format, K9FormatArbeidstid, K9Sak, UgyldigK9SakFormat } from '@app/types';
import {
    appSentryLogger,
    getEndringsdato,
    getTillattEndringsperiode,
    isK9SakErInnenforGyldigEndringsperiode,
    maskString,
    parseK9Format,
} from '@app/utils';
import { getMaybeEnv } from '@navikt/sif-common-env';
import { isAxiosError } from 'axios';

import { verifyK9Format } from '../../utils/verifyk9Format';
import api from '../api';
import { ApiEndpointInnsyn } from '.';

export type K9SakResult = K9Sak | UgyldigK9SakFormat;

const maskK9FormatArbeidstid = (arbeidstid: K9FormatArbeidstid) => {
    return {
        arbeidstakerList: (arbeidstid.arbeidstakerList || []).map((arbtaker) => {
            const key = maskString(arbtaker.organisasjonsnummer) || 'ingenOrg';
            return { [key]: arbtaker.arbeidstidInfo };
        }),
        frilanserArbeidstidInfo: arbeidstid.frilanserArbeidstidInfo,
        selvstendigNæringsdrivendeArbeidstidInfo: arbeidstid.selvstendigNæringsdrivendeArbeidstidInfo,
    };
};

const maskK9FormatSak = (sak: K9Format) => {
    const ytelse = sak?.søknad?.ytelse;
    if (!ytelse) {
        return { søknadsperiode: undefined, arbeidstid: undefined };
    }
    return {
        søknadsperiode: ytelse.søknadsperiode,
        arbeidstid: ytelse.arbeidstid ? maskK9FormatArbeidstid(ytelse.arbeidstid) : undefined,
    };
};

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
                    if (getMaybeEnv('DEBUG') === 'true') {
                        appSentryLogger.logInfo('debug.k9format.gyldig', JSON.stringify(maskK9FormatSak(sak)));
                    }
                } catch (error) {
                    if (isK9FormatError(error)) {
                        k9Saker.push({ erUgyldigK9SakFormat: true });
                        appSentryLogger.logError(
                            'ugyldigK9Format',
                            JSON.stringify({ sakIndex: index, error: error.error }),
                        );
                    } else {
                        appSentryLogger.logError(
                            'sakerEndpoint.parseK9Format',
                            `Uventet feil ved parsing av sak ${index}: ${error instanceof Error ? error.message : String(error)}`,
                        );
                        throw error;
                    }
                }
            });
            return { k9Saker, eldreSaker };
        } catch (error) {
            if (isAxiosError(error)) {
                appSentryLogger.logApiError(error, 'sakerEndpoint.fetch');
            } else if (!isK9FormatError(error)) {
                appSentryLogger.logError(
                    'sakerEndpoint.fetch failed - unexpected',
                    error instanceof Error ? error.message : String(error),
                );
            }
            return Promise.reject(error);
        }
    },
};

export default sakerEndpoint;
