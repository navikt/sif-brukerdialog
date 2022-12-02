import { isK9Format, K9Format } from '../../types/k9Format';
import { K9Sak } from '../../types/K9Sak';
import { parseK9Format } from '../../utils/parseK9Format';
import api from '../api';
import { ApiEndpointInnsyn } from './';

export type SakerDTO = K9Format[];

const sakerEndpoint = {
    fetch: async (): Promise<K9Sak[]> => {
        try {
            const { data } = await api.innsyn.get<K9Format[]>(ApiEndpointInnsyn.sak);
            const saker: K9Sak[] = [];

            let harUgyldigSak;
            data.forEach((sak) => {
                const erGyldig = isK9Format(sak);
                if (erGyldig) {
                    const parsedSak = parseK9Format(sak);
                    if (parsedSak.ytelse.søknadsperioder.length > 0) {
                        saker.push(parsedSak);
                    }
                } else {
                    harUgyldigSak = true;
                }
            });
            if (harUgyldigSak === true) {
                return Promise.reject('Ugyldig k9 format');
            }
            return Promise.resolve(saker);
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

export default sakerEndpoint;
