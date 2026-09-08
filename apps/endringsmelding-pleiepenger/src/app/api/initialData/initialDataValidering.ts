import { IngenTilgangÅrsak, isK9Sak, isUgyldigK9SakFormat, K9Sak, UgyldigK9SakFormat } from '@app/types';
import { DateRange, dateRangeUtils } from '@navikt/sif-common-utils';
import { appLogger } from '@sif/apm';

import { getSamletDateRangeForK9Saker } from '../../utils/k9SakUtils';
import { tilgangskontroll } from '../../utils/tilgangskontroll';
import { K9SakResult } from '../endpoints/sakerEndpoint';
import { IngenTilgangError } from './initialDataError';

/**
 * Kontrollerer at sakene fra innsyn kan brukes i en endringsmelding.
 * Rene regler uten sideeffekter — kaster IngenTilgangError ved første regel som slår til.
 *
 * @returns sakene innenfor endringsperioden, og den samlede perioden de dekker.
 */
export const validerK9Saker = (
    sakerInnenforEndringsperiode: K9SakResult[],
    sakerFørEndringsperiode: K9SakResult[],
    tillattEndringsperiode: DateRange,
): { k9saker: K9Sak[]; samletPeriode: DateRange } => {
    if (sakerInnenforEndringsperiode.length === 0) {
        throw new IngenTilgangError([
            sakerFørEndringsperiode.length > 0
                ? IngenTilgangÅrsak.søknadsperioderUtenforTillattEndringsperiode
                : IngenTilgangÅrsak.harIngenSak,
        ]);
    }

    const ugyldigeSaker: UgyldigK9SakFormat[] = sakerInnenforEndringsperiode.filter(isUgyldigK9SakFormat);
    if (ugyldigeSaker.length > 0) {
        const detaljer = ugyldigeSaker[0].detaljer;
        throw new IngenTilgangError(
            [IngenTilgangÅrsak.harUgyldigK9FormatSak],
            detaljer ? { error: detaljer } : undefined,
        );
    }

    const k9saker: K9Sak[] = sakerInnenforEndringsperiode.filter(isK9Sak);

    const samletPeriode = getSamletDateRangeForK9Saker(k9saker);
    if (samletPeriode === undefined) {
        throw new IngenTilgangError([IngenTilgangÅrsak.harIngenPerioder]);
    }

    if (dateRangeUtils.dateRangesCollide([samletPeriode, tillattEndringsperiode]) === false) {
        throw new IngenTilgangError([IngenTilgangÅrsak.søknadsperioderUtenforTillattEndringsperiode]);
    }

    return { k9saker, samletPeriode };
};

/**
 * Kjører den fulle tilgangskontrollen (antall saker, arbeidsforhold, periode).
 * Har egne tester i utils/__tests__/tilgangskontroll.test.ts.
 */
export const assertHarTilgang = (k9saker: K9Sak[], tillattEndringsperiode: DateRange): void => {
    const resultat = tilgangskontroll(k9saker, tillattEndringsperiode);
    if (resultat.kanBrukeSøknad === false) {
        throw new IngenTilgangError(resultat.årsak, resultat.ingenTilgangMeta);
    }
};

/** Logges for å følge med på hvor mange som møter søknaden uten noen sak i innsyn. */
export const loggIngenSaker = (sakerInnenforEndringsperiode: K9SakResult[], sakerFørEndringsperiode: K9SakResult[]) => {
    if (sakerInnenforEndringsperiode.length === 0 && sakerFørEndringsperiode.length === 0) {
        appLogger.logInfo('fetchInitialData.ingenSaker');
    }
};
