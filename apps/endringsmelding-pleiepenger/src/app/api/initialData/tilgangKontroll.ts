import { ArbeidsgiverMedAnsettelseperioder, K9Sak } from '@app/types';
import { DateRange } from '@navikt/sif-common-utils';

import { getIngenTilgangMeta, vurderArbeidsforhold, vurderSaker } from '../../tilgang';
import { K9SakResult } from '../endpoints/sakerEndpoint';
import { IngenTilgangError } from './initialDataError';

/**
 * Henter arbeidsgivere for perioden fase 1 kom fram til. Injiseres fordi oppslaget
 * må skje mellom de to fasene, og reglene ikke skal gjøre nettverkskall selv.
 */
export type HentArbeidsgivere = (periode: DateRange) => Promise<ArbeidsgiverMedAnsettelseperioder[]>;

/**
 * Avgjør om bruker kan bruke endringsmeldingen, og returnerer det lastingen
 * trenger videre. Kaster IngenTilgangError når bruker ikke kan bruke søknaden.
 *
 * Reglene ligger i tilgang-modulen. Modulen er kontrakten backend skal implementere
 * mot, så all regellogikk ligger der — denne funksjonen kobler bare sammen de
 * to fasene og oversetter avslag til IngenTilgangError.
 */
export const tilgangKontroll = async (
    saker: K9SakResult[],
    eldreSaker: K9SakResult[],
    tillattEndringsperiode: DateRange,
    hentArbeidsgivere: HentArbeidsgivere,
): Promise<{ sak: K9Sak; arbeidsgivere: ArbeidsgiverMedAnsettelseperioder[] }> => {
    const sakVurdering = vurderSaker(saker, eldreSaker, tillattEndringsperiode);
    if (sakVurdering.kanBruke === false) {
        throw new IngenTilgangError(sakVurdering.årsak);
    }

    const arbeidsgivere = await hentArbeidsgivere(sakVurdering.oppslagsperiode);

    const arbeidsforholdVurdering = vurderArbeidsforhold(sakVurdering.sak, arbeidsgivere, tillattEndringsperiode);
    if (arbeidsforholdVurdering.kanBruke === false) {
        /**
         * Meta festes kun på avslag fra arbeidsforholdene, ikke fra sakene. Et
         * sak-avslag betyr at vi ikke har én entydig sak å lese arbeidstid fra.
         */
        throw new IngenTilgangError(
            arbeidsforholdVurdering.årsak,
            getIngenTilgangMeta(sakVurdering.sak.ytelse.arbeidstid),
        );
    }

    return { sak: sakVurdering.sak, arbeidsgivere };
};
