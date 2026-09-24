import { IngenTilgangÅrsak, isK9Sak, isUgyldigK9SakFormat, K9Sak } from '@app/types';
import { DateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

import { K9SakResult } from '../api/endpoints/sakerEndpoint';
import { getSamletDateRangeForK9Saker } from '../utils/k9SakUtils';
import { SakVurdering } from './types';

/**
 * minMax deklareres her selv om den også lastes transitivt via andre moduler.
 * Uten den er dayjs.max/dayjs.min udefinert, og oppslagsperioden kan ikke regnes ut.
 */
dayjs.extend(minMax);

/**
 * Fase 1 av tilgangskontrollen — vurderer sakene.
 *
 * Stopper ved første regel som slår til. Det er bevisst: når det ikke finnes
 * én entydig sak å jobbe med, gir det ikke mening å samle flere årsaker.
 *
 * Regelrekkefølge:
 *  1. Ingen saker overhodet                     -> harIngenSak
 *  2. Kun eldre saker                           -> søknadsperioderUtenforTillattEndringsperiode
 *  3. Uleselig format blant de aktuelle sakene  -> harUgyldigK9FormatSak
 *  4. Flere aktuelle saker (eldre teller ikke)  -> harMerEnnEnSak
 *  5. Saken har ingen søknadsperioder           -> harIngenPerioder
 *  6. Saken overlapper ikke endringsperioden    -> søknadsperioderUtenforTillattEndringsperiode
 *
 * Regel 3 kommer før regel 4 fordi vi ikke kan si noe sikkert om antall saker
 * når vi ikke klarer å lese alle sakene.
 *
 * @param saker saker som er innenfor endringsperioden, inkludert saker med ugyldig format
 * @param eldreSaker saker som er konstatert å være eldre enn endringsperioden
 */
export const vurderSaker = (
    saker: K9SakResult[],
    eldreSaker: K9SakResult[],
    tillattEndringsperiode: DateRange,
): SakVurdering => {
    /** 1. Bruker har ingen saker i det hele tatt */
    if (saker.length === 0 && eldreSaker.length === 0) {
        return avslag(IngenTilgangÅrsak.harIngenSak);
    }

    /** 2. Bruker har kun saker som er for gamle til å endres */
    if (saker.length === 0) {
        return avslag(IngenTilgangÅrsak.søknadsperioderUtenforTillattEndringsperiode);
    }

    /** 3. En av de aktuelle sakene kan ikke leses */
    if (saker.some(isUgyldigK9SakFormat)) {
        return avslag(IngenTilgangÅrsak.harUgyldigK9FormatSak);
    }

    const k9saker: K9Sak[] = saker.filter(isK9Sak);

    /** 4. Bruker har flere aktuelle saker */
    if (k9saker.length > 1) {
        return avslag(IngenTilgangÅrsak.harMerEnnEnSak);
    }

    const sak = k9saker[0];

    /** 5. Saken mangler søknadsperioder */
    const samletSøknadsperiode = getSamletDateRangeForK9Saker([sak]);
    if (samletSøknadsperiode === undefined) {
        return avslag(IngenTilgangÅrsak.harIngenPerioder);
    }

    /** 6. Saken ligger utenfor endringsperioden */
    const oppslagsperiode = getOppslagsperiode(samletSøknadsperiode, tillattEndringsperiode);
    if (oppslagsperiode === undefined) {
        return avslag(IngenTilgangÅrsak.søknadsperioderUtenforTillattEndringsperiode);
    }

    return { kanBruke: true, sak, oppslagsperiode };
};

/**
 * Perioden arbeidsgivere skal hentes for: snittet av sakens samlede søknadsperiode
 * og den tillatte endringsperioden.
 *
 * Ligger her, og ikke hos kalleren, fordi den er en del av regelsettet. Henter
 * backend arbeidsgivere for en annen periode enn frontend, vil reglene gi ulikt
 * svar uten at koden ser ulik ut.
 *
 * @returns undefined når periodene ikke overlapper
 */
export const getOppslagsperiode = (
    samletSøknadsperiode: DateRange,
    tillattEndringsperiode: DateRange,
): DateRange | undefined => {
    const periode: DateRange = {
        from: dayjs.max(dayjs(samletSøknadsperiode.from), dayjs(tillattEndringsperiode.from))!.toDate(),
        to: dayjs.min(dayjs(samletSøknadsperiode.to), dayjs(tillattEndringsperiode.to))!.toDate(),
    };
    return dayjs(periode.to).isBefore(periode.from, 'day') ? undefined : periode;
};

const avslag = (årsak: IngenTilgangÅrsak): SakVurdering => ({ kanBruke: false, årsak: [årsak] });
