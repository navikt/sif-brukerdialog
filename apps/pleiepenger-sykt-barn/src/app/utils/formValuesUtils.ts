import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';
import dayjs from 'dayjs';
import { SøknadFormValues } from '../types/søknad-form-values/SøknadFormValues';

export const getSøknadsperiodeFromFormValues = ({
    periodeFra,
    periodeTil,
}: Partial<SøknadFormValues>): DateRange | undefined => {
    const fraDato = datepickerUtils.getDateFromDateString(periodeFra);
    const tilDato = datepickerUtils.getDateFromDateString(periodeTil);
    if (fraDato && tilDato) {
        return {
            from: fraDato,
            to: tilDato,
        };
    }
    return undefined;
};

export const getHarVærtEllerErVernepliktigFromFormValues = ({
    harVærtEllerErVernepliktig,
}: Partial<SøknadFormValues>): boolean | undefined =>
    harVærtEllerErVernepliktig ? harVærtEllerErVernepliktig === YesOrNo.YES : undefined;

export const søkerKunHelgedager = (fom?: string | Date, tom?: string | Date): boolean => {
    if (fom && tom) {
        const fomDayJs = dayjs(fom);
        const tomDayJs = dayjs(tom);

        if ((fomDayJs.isoWeekday() === 6 || fomDayJs.isoWeekday() === 7) && fomDayJs.isSame(tomDayJs, 'day')) {
            return true;
        } else if (fomDayJs.isoWeekday() === 6 && tomDayJs.isSame(fomDayJs.add(1, 'd'), 'day')) {
            return true;
        } else {
            return false;
        }
    }
    return false;
};
