import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import { isK9FormatError, K9Format, K9FormatArbeidstid, K9Sak, UgyldigK9SakFormat } from '@types';
import { appSentryLogger, maskString, parseK9Format } from '@utils';
import api from '../api';
import { ApiEndpointInnsyn } from './';
import { verifyK9Format } from '../../utils/k9FormatUtils';

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
    fetch: async (): Promise<K9SakResult[]> => {
        try {
            const { data } = await api.innsyn.get<K9Format[]>(ApiEndpointInnsyn.sak);
            const k9saker: K9SakResult[] = [];
            data.forEach((sak) => {
                try {
                    const erGyldig = verifyK9Format(sak);
                    if (erGyldig) {
                        const parsedSak = parseK9Format(sak);
                        if (parsedSak.ytelse.søknadsperioder.length > 0) {
                            k9saker.push(parsedSak);
                        }
                        if (getEnvironmentVariable('DEBUG') === 'true') {
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
                        k9saker.push(ugyldigSak);
                        appSentryLogger.logError('ugyldigK9Format', JSON.stringify(error));
                        appSentryLogger.logInfo('debug.k9format.ikkeGyldig', JSON.stringify(maskK9FormatSak(sak)));
                    } else {
                        throw error;
                    }
                }
            });
            return Promise.resolve(k9saker);
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

export default sakerEndpoint;
