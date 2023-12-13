/* eslint-disable no-console */
import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';
import { DateRange, ISODateToDate, isISODate } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { Arbeidsgiver } from '../types';
import { FrilansFormValues, Frilanstype } from '../types/søknad-form-values/FrilansFormValues';

dayjs.extend(minMax);

export const harFrilansoppdrag = (frilansoppdrag: Arbeidsgiver[] | undefined) =>
    frilansoppdrag !== undefined && frilansoppdrag.length > 0;

export const harSvartErFrilanserEllerHarFrilansoppdrag = (harHattInntektSomFrilanser: YesOrNo | undefined): boolean => {
    return harHattInntektSomFrilanser === YesOrNo.YES;
};

export const erFrilanserITidsrom = (tidsrom: DateRange, frilansStartdato: Date, frilansSluttdato?: Date): boolean => {
    if (dayjs(frilansStartdato).isAfter(tidsrom.to, 'day')) {
        return false;
    }
    if (frilansSluttdato && dayjs(frilansSluttdato).isBefore(tidsrom.from, 'day')) {
        return false;
    }
    return true;
};

export const erFrilanserISøknadsperiode = (
    søknadsperiode: DateRange,
    {
        harHattInntektSomFrilanser,
        erFortsattFrilanser,
        sluttdato,
        startdato,
        frilanstype,
        misterHonorar,
        startetFørSisteTreHeleMåneder,
    }: FrilansFormValues,
): boolean => {
    if (erFortsattFrilanser === YesOrNo.YES) {
        return !kunHonorUtenNormalArbeidstid(frilanstype, misterHonorar);
    }
    const frilansStartdato = datepickerUtils.getDateFromDateString(startdato);
    const frilansSluttdato = datepickerUtils.getDateFromDateString(sluttdato);

    if (
        (startetFørSisteTreHeleMåneder || frilansStartdato) &&
        harSvartErFrilanserEllerHarFrilansoppdrag(harHattInntektSomFrilanser)
    ) {
        return erFrilanserITidsrom(
            søknadsperiode,
            frilansStartdato || getFørsteDagFørStartdatoForNySomFrilanser(søknadsperiode),
            frilansSluttdato,
        );
    }
    return false;
};

/**
 *
 * @param periode
 * @param startdato
 * @param sluttdato
 * @param erFortsattFrilanser
 * @returns DateRange
 *
 * Avkort periode med evt start og sluttdato som frilanser.
 * Returnerer undefined dersom start og/eller slutt som frilanser
 * gjør at bruker ikke var frilanser i perioden
 */

export const getPeriodeSomFrilanserInnenforPeriode = (
    periode: DateRange,
    startdato: Date | undefined,
    sluttdato: Date | undefined,
): DateRange | undefined => {
    if (startdato === undefined) {
        throw 'getPeriodeSomFrilanserInnenforPeriode: startdato is undefined';
    }

    if (erFrilanserITidsrom(periode, startdato, sluttdato) === false) {
        return undefined;
    }

    const fromDate: Date = dayjs.max([dayjs(periode.from), dayjs(startdato)])!.toDate();
    const toDate: Date = sluttdato ? dayjs.min([dayjs(periode.to), dayjs(sluttdato)])!.toDate() : periode.to;

    return {
        from: fromDate,
        to: toDate,
    };
};

const kunHonorUtenNormalArbeidstid = (frilanstype?: Frilanstype, misterHonorar?: YesOrNo) =>
    frilanstype && frilanstype === Frilanstype.HONORAR && misterHonorar === YesOrNo.NO;

export const getStartdatoSomFrilanser = (
    søknadsperiode: DateRange,
    startetFørSisteTreHeleMåneder: boolean,
    startdato: string | undefined,
): Date | undefined => {
    if (startetFørSisteTreHeleMåneder) {
        return getFørsteDagFørStartdatoForNySomFrilanser(søknadsperiode);
    }
    return startdato && isISODate(startdato) ? ISODateToDate(startdato) : undefined;
};

/**
 * nySomFrilanserPeriode = 3 hele måneder før søknadsperiodens startdato. Dvs. dersom
 * søknadsperiode starter 31. august, blir nySomFrilanserPeriodes startdato 1. mai.

 */
export const getStartdatoForNySomFrilanser = (søknadsperiode: DateRange): Date => {
    return dayjs(søknadsperiode.from).startOf('month').subtract(3, 'months').toDate();
};

export const getFørsteDagFørStartdatoForNySomFrilanser = (søknadsperiode: DateRange): Date => {
    return dayjs(getStartdatoForNySomFrilanser(søknadsperiode)).subtract(1, 'days').toDate();
};
