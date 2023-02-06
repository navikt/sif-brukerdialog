import { isK9Format, K9Format } from '../../types/k9Format';
import { K9Sak } from '../../types/K9Sak';
import { parseK9Format } from '../../utils/parseK9Format';
import api from '../api';
import { ApiEndpointInnsyn } from '.';
import { Arbeidsgiver } from '../../types/Arbeidsgiver';
import { K9Sak2 } from '../../types/K9Sak2';
import { parseK9FormatSak } from '../../utils/parseK9FormatSak';

export type SakerDTO = K9Format[];

const sakerEndpoint = {
    fetch: async (arbeidsgivere: Arbeidsgiver[]): Promise<{ k9saker: K9Sak[]; k9saker2: K9Sak2[] }> => {
        try {
            const { data } = await api.innsyn.get<K9Format[]>(ApiEndpointInnsyn.sak);
            const k9saker: K9Sak[] = [];
            const k9saker2: K9Sak2[] = data.map(parseK9FormatSak);
            let harUgyldigSak;
            data.forEach((sak) => {
                const erGyldig = isK9Format(sak);
                if (erGyldig) {
                    const parsedSak = parseK9Format(sak, arbeidsgivere);
                    if (parsedSak.ytelse.søknadsperioder.length > 0) {
                        k9saker.push(parsedSak);
                    }
                } else {
                    harUgyldigSak = true;
                }
            });
            if (harUgyldigSak === true) {
                return Promise.reject('Ugyldig k9 format');
            }
            return Promise.resolve({ k9saker, k9saker2 });
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

export default sakerEndpoint;
