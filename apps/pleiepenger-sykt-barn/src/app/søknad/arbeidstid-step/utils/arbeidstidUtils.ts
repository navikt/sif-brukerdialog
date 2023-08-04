import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { dateFormatter, dateRangeUtils, getWeeksInDateRange } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { OpenDateRange } from '../../../types';
import { ArbeidIPeriodeType } from '../../../types/ArbeidIPeriodeType';
import { ArbeidsukeInfo } from '../../../types/ArbeidsukeInfo';
import { ArbeidsukerTimerSøknadsdata } from '../../../types/søknadsdata/ArbeidIPeriodeSøknadsdata';
import { ArbeidstidSøknadsdata } from '../../../types/søknadsdata/ArbeidstidSøknadsdata';
import { getArbeidsukeInfoIPeriode } from '../../../utils/arbeidsukeInfoUtils';
import { ArbeidssituasjonSøknadsdata } from '../../../types/søknadsdata/ArbeidssituasjonSøknadsdata';
import { ArbeidssituasjonAnsattType } from '../../../types/søknadsdata/ArbeidssituasjonAnsattSøknadsdata';

export enum ArbeidsperiodeIForholdTilSøknadsperiode {
    'starterIPerioden' = 'starterIPerioden',
    'slutterIPerioden' = 'slutterIPerioden',
    'starterOgSlutterIPerioden' = 'starterOgSlutterIPerioden',
    'gjelderHelePerioden' = 'gjelderHelePerioden',
}

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const summerArbeidstimerIArbeidsuker = (arbeidsuker: ArbeidsukerTimerSøknadsdata) => {
    return arbeidsuker.map(({ timer }) => timer || 0).reduce((prev, curr) => prev + curr, 0);
};

export const periodeInneholderToHeleArbeidsuker = (periode: DateRange): boolean => {
    const uker = getWeeksInDateRange(periode).map(getArbeidsukeInfoIPeriode);
    return uker.filter((uke) => uke.erFullArbeidsuke === true).length >= 2;
};

export const skalSvarePåOmEnJobberLiktIPerioden = (periode?: DateRange) =>
    periode ? periodeInneholderToHeleArbeidsuker(periode) : true;

export const getArbeidsperiodeIForholdTilSøknadsperiode = (
    periode: OpenDateRange,
    søknadsperiode: DateRange
): ArbeidsperiodeIForholdTilSøknadsperiode => {
    if (
        dateRangeUtils.isDateInsideDateRange(periode.from, søknadsperiode) &&
        periode.to &&
        dateRangeUtils.isDateInsideDateRange(periode.to, søknadsperiode)
    ) {
        return ArbeidsperiodeIForholdTilSøknadsperiode.starterOgSlutterIPerioden;
    } else if (dateRangeUtils.isDateInsideDateRange(periode.from, søknadsperiode)) {
        return ArbeidsperiodeIForholdTilSøknadsperiode.starterIPerioden;
    } else if (periode.to && dateRangeUtils.isDateInsideDateRange(periode.to, søknadsperiode)) {
        return ArbeidsperiodeIForholdTilSøknadsperiode.slutterIPerioden;
    }
    return ArbeidsperiodeIForholdTilSøknadsperiode.gjelderHelePerioden;
};

export const getArbeidsukerIPerioden = (periode: DateRange): ArbeidsukeInfo[] => {
    return getWeeksInDateRange(periode)
        .filter((uke) => dayjs(uke.from).isoWeekday() <= 5) // Ikke ta med uker som starter lørdag eller søndag
        .map(getArbeidsukeInfoIPeriode);
};

export const getArbeidsdagerIUkeTekst = ({ from, to }: DateRange): string => {
    const fraDag = dateFormatter.day(from);
    const tilDag = dateFormatter.day(to);
    const antallArbeidsdager = dateRangeUtils.getNumberOfDaysInDateRange({ from, to }, true);

    switch (antallArbeidsdager) {
        case 5:
            return 'hele uken';
        case 2:
            return `${fraDag} og ${tilDag}`;
        case 1:
            return `kun ${fraDag}`;
        default:
            return `${fraDag} til ${tilDag}`;
    }
};

export const harArbeidIPerioden = (arbeidssituasjon?: ArbeidssituasjonSøknadsdata): boolean => {
    if (!arbeidssituasjon) {
        return false;
    }
    const erAnsattIPerioden = arbeidssituasjon.arbeidsgivere.some(
        (a) => a.type !== ArbeidssituasjonAnsattType.sluttetFørSøknadsperiode
    );
    const erFrilanserIPerioden = arbeidssituasjon.frilans?.harInntektSomFrilanser === true;
    const erSelvstendigIPerioden = arbeidssituasjon.selvstendig?.erSN === true;
    return erAnsattIPerioden || erFrilanserIPerioden || erSelvstendigIPerioden;
};

export const harFraværFraJobb = (arbeidstid: ArbeidstidSøknadsdata | undefined): boolean => {
    if (!arbeidstid) {
        return false;
    }

    const harFraværSomAnsatt = Array.from(arbeidstid.arbeidsgivere).some((item) => {
        return item[1].type !== ArbeidIPeriodeType.arbeiderVanlig;
    });

    const harFraværFraFrilansarbeid =
        arbeidstid.frilansarbeid !== undefined && arbeidstid.frilansarbeid?.type !== ArbeidIPeriodeType.arbeiderVanlig;

    const harFraværFraHonorararbeid =
        arbeidstid.honorararbeid !== undefined && arbeidstid.honorararbeid?.type !== ArbeidIPeriodeType.arbeiderVanlig;

    const harFraværSomSelvstendig =
        arbeidstid.selvstendig !== undefined && arbeidstid.selvstendig?.type !== ArbeidIPeriodeType.arbeiderVanlig;

    return harFraværSomAnsatt || harFraværFraFrilansarbeid || harFraværFraHonorararbeid || harFraværSomSelvstendig;
};
