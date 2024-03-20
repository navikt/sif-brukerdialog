import { DateRange, dateRangeUtils } from '@navikt/sif-common-utils';
import { K9SakResult } from '../api/endpoints/sakerEndpoint';
import { IngenTilgangÅrsak, K9Sak, UgyldigK9SakFormat, isK9Sak, isUgyldigK9SakFormat } from '@types';
import { getKanIkkeBrukeSøknadRejection } from '../api/fetchInitialData';
import { getSamletDateRangeForK9Saker } from '.';

export const kontrollerSaker = (
    k9sakerResult: K9SakResult[],
    antallSakerFørEndringsperiode: number,
    tillattEndringsperiode: DateRange,
): Promise<{ k9saker: K9Sak[]; dateRangeAlleSaker: DateRange }> => {
    if (k9sakerResult.length === 0 && antallSakerFørEndringsperiode === 0) {
        /** Har ingen saker */
        return Promise.reject(getKanIkkeBrukeSøknadRejection([IngenTilgangÅrsak.harIngenSak]));
    }

    if (k9sakerResult.length === 0 && antallSakerFørEndringsperiode > 0) {
        /** Har kun saker som er utenfor tillatt endringsperiode */
        return Promise.reject(
            getKanIkkeBrukeSøknadRejection([IngenTilgangÅrsak.søknadsperioderUtenforTillattEndringsperiode]),
        );
    }

    if (k9sakerResult.length > 1) {
        /** Har flere enn én sak */
        return Promise.reject(getKanIkkeBrukeSøknadRejection([IngenTilgangÅrsak.harMerEnnEnSak]));
    }

    const ugyldigk9FormatSaker: UgyldigK9SakFormat[] = k9sakerResult.filter(isUgyldigK9SakFormat);
    if (ugyldigk9FormatSaker.length > 0) {
        /** Sak inneholder feil format/ukjente verdier  */
        return Promise.reject(getKanIkkeBrukeSøknadRejection([IngenTilgangÅrsak.harUgyldigK9FormatSak]));
    }

    const k9saker: K9Sak[] = k9sakerResult.filter(isK9Sak);
    const dateRangeAlleSaker = getSamletDateRangeForK9Saker(k9saker);
    if (dateRangeAlleSaker === undefined) {
        /** Ingen perioder i sakene */
        return Promise.reject(getKanIkkeBrukeSøknadRejection([IngenTilgangÅrsak.harIngenPerioder]));
    }

    if (dateRangeUtils.dateRangesCollide([dateRangeAlleSaker, tillattEndringsperiode]) === false) {
        /** Ingen av periodene er innenfor tillatt endringsperiode
         * TODO: Denne sjekken finnes også under tilgangskontroll - kan sikkert ryddes i
         */
        return Promise.reject(
            getKanIkkeBrukeSøknadRejection([IngenTilgangÅrsak.søknadsperioderUtenforTillattEndringsperiode]),
        );
    }

    /** Alt er ok */
    return Promise.resolve({ k9saker, dateRangeAlleSaker });
};
