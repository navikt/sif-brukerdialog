import { Arbeidsgiver } from '../types/Arbeidsgiver';
import { Sak } from '../types/Sak';
import { SakSøknadsdata } from '../types/søknadsdata/SakSøknadsdata';

import { getArbeidsgivereISak } from './sakUtils';

export const getSakSøknadsdata = (sak: Sak, arbeidsgivere: Arbeidsgiver[]): SakSøknadsdata => {
    const arbeidsgivereISak = getArbeidsgivereISak(arbeidsgivere, sak);
    return {
        arbeidsgivere: arbeidsgivereISak,
        erFrilanser: sak.ytelse.arbeidstid.frilanser !== undefined,
        erSelvstendigNæringsdrivende: sak.ytelse.arbeidstid.selvstendig !== undefined,
    };
};
