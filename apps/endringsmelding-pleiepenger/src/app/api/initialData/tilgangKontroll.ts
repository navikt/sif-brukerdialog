import { ArbeidsgiverMedAnsettelseperioder, IngenTilgangÅrsak, K9Sak } from '@app/types';
import { DateRange } from '@navikt/sif-common-utils';

import { vurderArbeidsforhold, vurderSaker } from '../../tilgang';
import { Feature, isFeatureEnabled } from '../../utils/featureToggleUtils';
import { getPeriodeForArbeidsgiverOppslag } from '../../utils/initialDataUtils';
import { K9SakResult } from '../endpoints/sakerEndpoint';
import { IngenTilgangError } from './initialDataError';
import { assertHarTilgang, validerK9Saker } from './initialDataValidering';

/**
 * Henter arbeidsgivere for en gitt periode. Injiseres fordi oppslaget må skje
 * mellom de to fasene i tilgangskontrollen, samtidig som periodene regnes ut
 * ulikt i v1 og v2.
 */
export type HentArbeidsgivere = (periode: DateRange) => Promise<ArbeidsgiverMedAnsettelseperioder[]>;

/**
 * Avgjør om bruker kan bruke endringsmeldingen, og returnerer det lastingen
 * trenger videre. Kaster IngenTilgangError når bruker ikke kan bruke søknaden.
 *
 * Typen finnes for å holde v1 og v2 utbyttbare. Endres signaturen for én av dem,
 * mister vi muligheten til å bevise at de to gjør samme jobb.
 */
export type TilgangKontroll = (
    saker: K9SakResult[],
    eldreSaker: K9SakResult[],
    tillattEndringsperiode: DateRange,
    hentArbeidsgivere: HentArbeidsgivere,
) => Promise<{ sak: K9Sak; arbeidsgivere: ArbeidsgiverMedAnsettelseperioder[] }>;

/**
 * Dagens regler, uendret. Skal slettes sammen med utils/tilgangskontroll.ts og
 * initialDataValidering.ts når SIF_PUBLIC_NY_TILGANGSKONTROLL er permanent på.
 */
export const tilgangKontrollV1: TilgangKontroll = async (
    saker,
    eldreSaker,
    tillattEndringsperiode,
    hentArbeidsgivere,
) => {
    const { k9saker, samletPeriode } = validerK9Saker(saker, eldreSaker, tillattEndringsperiode);

    const periodeForArbeidsgiveroppslag = getPeriodeForArbeidsgiverOppslag(samletPeriode, tillattEndringsperiode);
    if (!periodeForArbeidsgiveroppslag) {
        throw new IngenTilgangError([IngenTilgangÅrsak.søknadsperioderUtenforTillattEndringsperiode]);
    }

    const arbeidsgivere = await hentArbeidsgivere(periodeForArbeidsgiveroppslag);

    assertHarTilgang(k9saker, tillattEndringsperiode, arbeidsgivere);

    return { sak: k9saker[0], arbeidsgivere };
};

/**
 * Reglene fra tilgang-modulen. Modulen er kontrakten backend skal implementere
 * mot, så all regellogikk ligger der — denne funksjonen kobler bare sammen de
 * to fasene og oversetter avslag til IngenTilgangError.
 */
export const tilgangKontrollV2: TilgangKontroll = async (
    saker,
    eldreSaker,
    tillattEndringsperiode,
    hentArbeidsgivere,
) => {
    const sakVurdering = vurderSaker(saker, eldreSaker, tillattEndringsperiode);
    if (sakVurdering.kanBruke === false) {
        throw new IngenTilgangError(sakVurdering.årsak);
    }

    const arbeidsgivere = await hentArbeidsgivere(sakVurdering.oppslagsperiode);

    const arbeidsforholdVurdering = vurderArbeidsforhold(sakVurdering.sak, arbeidsgivere, tillattEndringsperiode);
    if (arbeidsforholdVurdering.kanBruke === false) {
        throw new IngenTilgangError(arbeidsforholdVurdering.årsak);
    }

    return { sak: sakVurdering.sak, arbeidsgivere };
};

export const getTilgangKontroll = (): TilgangKontroll =>
    isFeatureEnabled(Feature.SIF_PUBLIC_NY_TILGANGSKONTROLL) ? tilgangKontrollV2 : tilgangKontrollV1;
