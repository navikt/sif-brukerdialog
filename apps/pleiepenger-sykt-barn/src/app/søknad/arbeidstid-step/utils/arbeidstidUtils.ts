import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { dateFormatter, dateRangeUtils, getWeeksInDateRange } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { OpenDateRange } from '../../../types';
import { ArbeidIPeriodeType } from '../../../types/ArbeidIPeriodeType';
import { ArbeidsukeInfo } from '../../../types/ArbeidsukeInfo';
import {
    ArbeidAnsattSøknadsdataPågående,
    ArbeidAnsattSøknadsdataSluttetISøknadsperiode,
    ArbeidsgivereSøknadsdata_depr,
} from '../../../types/søknadsdata/arbeidAnsattSøknadsdata';
import { ArbeidsukerTimerSøknadsdata } from '../../../types/søknadsdata/arbeidIPeriodeSøknadsdata';
import { ArbeidsforholdSøknadsdata } from '../../../types/søknadsdata/arbeidsforholdSøknadsdata';
import { ArbeidSøknadsdata } from '../../../types/søknadsdata/arbeidSøknadsdata';
import { getArbeidsukeInfoIPeriode } from '../../../utils/arbeidsukeInfoUtils';

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

export const harFraværFraJobb = (arbeidsforhold: ArbeidsforholdSøknadsdata[]): boolean => {
    return arbeidsforhold.some(({ arbeidISøknadsperiode }) => {
        if (!arbeidISøknadsperiode) {
            return false;
        }
        return arbeidISøknadsperiode.type !== ArbeidIPeriodeType.arbeiderVanlig;
    });
};

export const harArbeidIPerioden = (arbeid?: ArbeidSøknadsdata): boolean =>
    arbeid !== undefined && getAlleArbeidsforholdIPerioden(arbeid).length > 0;

export const getAlleArbeidsforholdIPerioden = (arbeid?: ArbeidSøknadsdata): ArbeidsforholdSøknadsdata[] => {
    if (arbeid === undefined) {
        return [];
    }
    const arbeidsgivere: ArbeidsforholdSøknadsdata[] = [];
    arbeid.arbeidsgivere?.forEach((a) => {
        if (a.erAnsattISøknadsperiode) {
            arbeidsgivere.push(a.arbeidsforhold);
        }
    });

    const frilansArbeidsforhold: ArbeidsforholdSøknadsdata[] = [];

    if (arbeid.frilanser?.harInntektSomFrilanser && arbeid.frilanser.misterInntektSomFrilanserIPeriode) {
        if (arbeid.frilanser.arbeidsforholdFrilansarbeid) {
            frilansArbeidsforhold.push(arbeid.frilanser.arbeidsforholdFrilansarbeid);
        }
        if (
            arbeid.frilanser.arbeidsforholdHonorararbeid &&
            arbeid.frilanser.arbeidsforholdHonorararbeid.misterHonorar
        ) {
            frilansArbeidsforhold.push(arbeid.frilanser.arbeidsforholdHonorararbeid);
        }
    }

    const selvstendig: ArbeidsforholdSøknadsdata[] = arbeid.selvstendig?.erSN
        ? [arbeid.selvstendig.arbeidsforhold]
        : [];
    return [...arbeidsgivere, ...frilansArbeidsforhold, ...selvstendig];
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

export const getAnsattArbeidsforholdISøknadsperiode = (
    arbeidsgivere: ArbeidsgivereSøknadsdata_depr
): Array<ArbeidAnsattSøknadsdataPågående | ArbeidAnsattSøknadsdataSluttetISøknadsperiode> => {
    const arbeidsforhold: Array<ArbeidAnsattSøknadsdataPågående | ArbeidAnsattSøknadsdataSluttetISøknadsperiode> = [];
    arbeidsgivere.forEach((arbeidsgiver) => {
        if (arbeidsgiver.erAnsattISøknadsperiode) {
            arbeidsforhold.push(arbeidsgiver);
        }
    });
    return arbeidsforhold;
};
