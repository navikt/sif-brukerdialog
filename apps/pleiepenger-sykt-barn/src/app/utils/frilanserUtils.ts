/* eslint-disable no-console */
import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { DateRange } from '@navikt/sif-common-utils';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';
import dayjs from 'dayjs';
import { Arbeidsgiver } from '../types';
import { FrilansFormData, Frilanstype } from '../types/FrilansFormData';
import minMax from 'dayjs/plugin/minMax';

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
        frilansTyper,
        misterHonorar,
    }: FrilansFormData
): boolean => {
    if (erFortsattFrilanser === YesOrNo.YES) {
        return !kunHonorararbeidUtenNormalArbeidstid(frilansTyper, misterHonorar);
    }
    const frilansStartdato = datepickerUtils.getDateFromDateString(startdato);
    const frilansSluttdato = datepickerUtils.getDateFromDateString(sluttdato);

    if (frilansStartdato && harSvartErFrilanserEllerHarFrilansoppdrag(harHattInntektSomFrilanser)) {
        return erFrilanserITidsrom(søknadsperiode, frilansStartdato, frilansSluttdato);
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
    { startdato, sluttdato, erFortsattFrilanser }: FrilansFormData
): DateRange | undefined => {
    const frilansStartdato = datepickerUtils.getDateFromDateString(startdato);
    const frilansSluttdato = datepickerUtils.getDateFromDateString(sluttdato);

    if (frilansStartdato === undefined) {
        console.error('getPeriodeSomFrilanserInneforPeriode - Startdato ikke satt');
        return undefined;
    }
    if (erFortsattFrilanser === YesOrNo.YES && sluttdato !== undefined) {
        console.error('getPeriodeSomFrilanserInneforPeriode - Jobber fortsatt som frilanser, men sluttdato er satt');
        return undefined;
    }
    if (erFortsattFrilanser === YesOrNo.NO && !frilansSluttdato) {
        console.error('getPeriodeSomFrilanserInneforPeriode - Er ikke frilanser, men sluttdato er ikke satt');
        return undefined;
    }

    if (erFrilanserITidsrom(periode, frilansStartdato, frilansSluttdato) === false) {
        return undefined;
    }

    const fromDate: Date = dayjs.max([dayjs(periode.from), dayjs(frilansStartdato)]).toDate();
    const toDate: Date = frilansSluttdato
        ? dayjs.min([dayjs(periode.to), dayjs(frilansSluttdato)]).toDate()
        : periode.to;

    return {
        from: fromDate,
        to: toDate,
    };
};

export const getPeriodeSomFrilanserInnenforSøknadsperiode = (
    søknadsperiode: DateRange,
    startdato: Date,
    sluttdato?: Date
): DateRange | undefined => {
    if (erFrilanserITidsrom(søknadsperiode, startdato, sluttdato) === false) {
        return undefined;
    }
    const fromDate: Date = dayjs.max([dayjs(søknadsperiode.from), dayjs(startdato)]).toDate();
    const toDate: Date = sluttdato
        ? dayjs.min([dayjs(søknadsperiode.to), dayjs(sluttdato)]).toDate()
        : søknadsperiode.to;

    return {
        from: fromDate,
        to: toDate,
    };
};

export const kunHonorararbeidUtenNormalArbeidstid = (frilansType?: Frilanstype[], misterHonorar?: YesOrNo) =>
    frilansType &&
    frilansType.length === 1 &&
    frilansType.some((type) => type === Frilanstype.HONORARARBEID) &&
    misterHonorar === YesOrNo.NO;
