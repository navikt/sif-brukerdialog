import { isUnauthorized } from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { getEnv } from '@navikt/sif-common-env';
import { isK9FormatError, K9Format, K9FormatArbeidstid, K9Sak, UgyldigK9SakFormat } from '@types';
import {
    appSentryLogger,
    getEndringsdato,
    getTillattEndringsperiode,
    isK9SakErInnenforGyldigEndringsperiode,
    maskString,
    parseK9Format,
} from '@utils';
import { isAxiosError } from 'axios';
import { verifyK9Format } from '../../utils/verifyk9Format';
import api from '../api';
import { ApiEndpointInnsyn } from './';

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
    const { søknadsperiode, arbeidstid } = sak.søknad.ytelse;
    return {
        søknadsperiode,
        arbeidstid: maskK9FormatArbeidstid(arbeidstid),
    };
};

const sakerEndpoint = {
    fetch: async (): Promise<{ k9Saker: K9SakResult[]; eldreSaker: K9SakResult[] }> => {
        const endringsperiode = getTillattEndringsperiode(getEndringsdato());
        try {
            const { data } = await api.innsyn.get<K9Format[]>(ApiEndpointInnsyn.sak);
            const k9Saker: K9SakResult[] = [];
            const eldreSaker: K9SakResult[] = [];
            data.forEach((sak) => {
                try {
                    const erGyldig = verifyK9Format(sak);
                    if (erGyldig) {
                        const parsedSak = parseK9Format(sak);
                        if (isK9SakErInnenforGyldigEndringsperiode(parsedSak, endringsperiode)) {
                            k9Saker.push(parsedSak);
                        } else {
                            eldreSaker.push(parsedSak);
                        }
                        if (getEnv('DEBUG') === 'true') {
                            appSentryLogger.logInfo('debug.k9format.gyldig', JSON.stringify(maskK9FormatSak(sak)));
                        }
                    } else {
                        /** Beholder denne enn så lenge, selv om DEBUG !== true */
                        appSentryLogger.logInfo('debug.k9format.ikkeGyldig', JSON.stringify(maskK9FormatSak(sak)));
                    }
                } catch (error) {
                    if (isK9FormatError(error)) {
                        const ugyldigSak: UgyldigK9SakFormat = {
                            erUgyldigK9SakFormat: true,
                        };
                        k9Saker.push(ugyldigSak);
                        appSentryLogger.logError('ugyldigK9Format', JSON.stringify(error));
                        appSentryLogger.logInfo('debug.k9format.ikkeGyldig', JSON.stringify(maskK9FormatSak(sak)));
                    } else {
                        throw error;
                    }
                }
            });
            return Promise.resolve({ k9Saker, eldreSaker });
        } catch (error) {
            if (isAxiosError(error)) {
                if (!isUnauthorized(error)) {
                    appSentryLogger.logError(`sakerEndpoint.fetch failed - ${error.message}`);
                }
                appSentryLogger.logError('sakerEndpoint.fetch failed - unauthorized');
            }
            return Promise.reject(error);
        }
    },
};

export default sakerEndpoint;
