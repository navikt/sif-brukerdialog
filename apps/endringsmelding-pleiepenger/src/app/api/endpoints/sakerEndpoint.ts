import { verifyK9Format, K9Format, isK9FormatError } from '../../types/k9Format';
import { K9Sak, UgyldigK9SakFormat } from '../../types/K9Sak';
import appSentryLogger from '../../utils/appSentryLogger';
import { parseK9Format } from '../../utils/parseK9Format';
import api from '../api';
import { ApiEndpointInnsyn } from './';

export type K9SakResult = K9Sak | UgyldigK9SakFormat;

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
                    }
                } catch (error) {
                    if (isK9FormatError(error)) {
                        const ugyldigSak: UgyldigK9SakFormat = {
                            erUgyldigK9SakFormat: true,
                        };
                        k9saker.push(ugyldigSak);
                        appSentryLogger.logError('ugyldigK9Format', JSON.stringify(error));
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
