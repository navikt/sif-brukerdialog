import { ArbeidsgiverMedAnsettelseperioder, IngenTilgangÅrsak, K9Sak, K9SakArbeidstaker } from '@app/types';
import { DateRange, dateRangeUtils, ensureDateRange, sortDateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

import { finnesArbeidsgiverIK9Sak } from '../utils/k9SakUtils';
import { TilgangResultat } from './types';

/**
 * isoWeek deklareres her selv om den også lastes transitivt via sif-common-utils.
 * Uten den feiler dayjs.isSame(x, 'isoWeek') stille — startOf med ukjent enhet
 * returnerer en klone i stedet for å kaste — og regelen ville alltid gitt false.
 */
dayjs.extend(isoWeek);

/**
 * Fase 2 av tilgangskontrollen — vurderer arbeidsforholdene.
 *
 * Samler alle årsaker som slår til, i motsetning til fase 1. Bruker skal få se
 * alt som står i veien, ikke bare det første.
 *
 * Regelrekkefølge (bestemmer rekkefølgen i årsak-listen):
 *  6. Selvstendig næringsdrivende              -> harArbeidstidSomSelvstendigNæringsdrivende
 *  7. To ansettelser samme isoUke med opphold  -> enArbeidsgiverToAnsettelserSammeUkeMedOpphold
 *  8. Flere ansettelser hos ukjent arbeidsgiver -> harFlereAnsettelsesforholdHosUkjentArbeidsgiver
 *
 * @param arbeidsgivere hentet for oppslagsperioden fra vurderSaker
 */
export const vurderArbeidsforhold = (
    sak: K9Sak,
    arbeidsgivere: ArbeidsgiverMedAnsettelseperioder[],
    tillattEndringsperiode: DateRange,
): TilgangResultat => {
    const årsak: IngenTilgangÅrsak[] = [];

    if (erSelvstendigNæringsdrivende(sak)) {
        årsak.push(IngenTilgangÅrsak.harArbeidstidSomSelvstendigNæringsdrivende);
    }

    if (harAnsettelserSammeUkeMedOpphold(sak, arbeidsgivere, tillattEndringsperiode)) {
        årsak.push(IngenTilgangÅrsak.enArbeidsgiverToAnsettelserSammeUkeMedOpphold);
    }

    if (harFlereAnsettelserHosUkjentArbeidsgiver(sak, arbeidsgivere, tillattEndringsperiode)) {
        årsak.push(IngenTilgangÅrsak.harFlereAnsettelsesforholdHosUkjentArbeidsgiver);
    }

    return årsak.length > 0 ? { kanBruke: false, årsak } : { kanBruke: true };
};

/**
 * Det er om det finnes SN-perioder i saken som avgjør, ikke hvor mange timer de
 * inneholder. En periode med null timer betyr at saksbehandler har registrert
 * næringsvirksomhet, og endringsmeldingen støtter ikke den situasjonen.
 *
 * Merk: dette er samme regel som i dag. Timer-kriteriet i
 * utils/tilgangskontroll.ts gjelder kun loggmetadataen erSN, ikke tilgangen.
 */
const erSelvstendigNæringsdrivende = (sak: K9Sak): boolean => {
    const { selvstendigNæringsdrivendeArbeidstidInfo } = sak.ytelse.arbeidstid;
    return (
        selvstendigNæringsdrivendeArbeidstidInfo !== undefined &&
        Object.keys(selvstendigNæringsdrivendeArbeidstidInfo.perioder ?? {}).length > 0
    );
};

const getArbeidstakereISak = (sak: K9Sak): K9SakArbeidstaker[] => sak.ytelse.arbeidstid.arbeidstakerList ?? [];

/**
 * Gjelder kun arbeidsgivere som allerede finnes i saken. Ansettelsesperioder som
 * strekker seg utenfor endringsperioden klippes til, slik at vi vurderer den
 * perioden bruker faktisk kan endre.
 */
const harAnsettelserSammeUkeMedOpphold = (
    sak: K9Sak,
    arbeidsgivere: ArbeidsgiverMedAnsettelseperioder[],
    tillattEndringsperiode: DateRange,
): boolean => {
    const arbeidstakereISak = getArbeidstakereISak(sak);
    return arbeidsgivere
        .filter((arbeidsgiver) => finnesArbeidsgiverIK9Sak(arbeidsgiver, arbeidstakereISak))
        .some((arbeidsgiver) =>
            perioderSlutterOgStarterSammeUkeMedOpphold(
                arbeidsgiver.ansettelsesperioder.map((periode) => ensureDateRange(periode, tillattEndringsperiode)),
            ),
        );
};

/**
 * Gjelder kun arbeidsgivere som ikke finnes i saken. Vi teller bare ansettelser
 * som overlapper en søknadsperiode — ansettelser i hullene mellom søknadsperiodene
 * er irrelevante for endringsmeldingen.
 */
const harFlereAnsettelserHosUkjentArbeidsgiver = (
    sak: K9Sak,
    arbeidsgivere: ArbeidsgiverMedAnsettelseperioder[],
    tillattEndringsperiode: DateRange,
): boolean => {
    const arbeidstakereISak = getArbeidstakereISak(sak);
    const søknadsperioder = dateRangeUtils.getDateRangesWithinDateRange(
        sak.ytelse.søknadsperioder,
        tillattEndringsperiode,
    );

    return arbeidsgivere
        .filter((arbeidsgiver) => finnesArbeidsgiverIK9Sak(arbeidsgiver, arbeidstakereISak) === false)
        .some(
            (arbeidsgiver) =>
                arbeidsgiver.ansettelsesperioder.filter((ansettelsesperiode) =>
                    søknadsperioder.some((søknadsperiode) =>
                        dateRangeUtils.dateRangesCollide([
                            ensureDateRange(ansettelsesperiode, søknadsperiode),
                            søknadsperiode,
                        ]),
                    ),
                ).length > 1,
        );
};

/**
 * Går gjennom periodene for å se om noen slutter og starter innenfor samme isoUke
 * med minst én dags opphold mellom.
 *
 * Perioder kan overlappe hverandre, og et opphold mellom to påfølgende perioder
 * kan være dekket av en tidligere periode. Derfor sammenlignes hver periode mot
 * den seneste sluttdatoen som er dekket så langt, ikke bare mot forrige periode.
 */
export const perioderSlutterOgStarterSammeUkeMedOpphold = (ansettelsesperioder: DateRange[]): boolean => {
    const sortertePerioder = [...ansettelsesperioder].sort(sortDateRange);

    let dekketTilOgMed: Date | undefined;

    for (const periode of sortertePerioder) {
        if (dekketTilOgMed !== undefined) {
            const harOpphold = dayjs(periode.from).diff(dekketTilOgMed, 'day') > 1;
            const sammeUke = dayjs(periode.from).isSame(dekketTilOgMed, 'isoWeek');
            if (harOpphold && sammeUke) {
                return true;
            }
        }
        if (dekketTilOgMed === undefined || dayjs(periode.to).isAfter(dekketTilOgMed, 'day')) {
            dekketTilOgMed = periode.to;
        }
    }

    return false;
};
