import { DateRange, dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import { guid } from '@navikt/sif-common-utils';
import { Kursperiode } from '../../../types/Kursperiode';
import { KursperiodeFormValues } from './kursperioder-form-part/KursperiodeQuestions';

const isValidKursperiode = (kursperiode: Partial<Kursperiode>): kursperiode is Kursperiode => {
    return kursperiode.periode?.from !== undefined && kursperiode.periode.to !== undefined;
};

export const getPeriodeFromKursperiodeFormValue = (
    formValues: Partial<KursperiodeFormValues>,
): DateRange | undefined => {
    const from = ISOStringToDate(formValues.fom);
    const to = ISOStringToDate(formValues.tom);

    if (!from || !to) {
        return undefined;
    }
    return {
        from,
        to,
    };
};

const mapFormValuesToKursperiode = (formValues: KursperiodeFormValues, id: string | undefined): Kursperiode => {
    const periode = getPeriodeFromKursperiodeFormValue(formValues);
    if (!periode) {
        throw new Error('Kan ikke mappe form values til kursperiode: Fom og tom må være satt');
    }
    return {
        id: id || guid(),
        periode,
    };
};

const mapKursperiodeToFormValues = ({ periode }: Partial<Kursperiode>): KursperiodeFormValues => {
    return {
        fom: dateToISOString(periode?.from),
        tom: dateToISOString(periode?.to),
    };
};

const kursperiodeUtils = {
    isValidKursperiode,
    mapKursperiodeToFormValues,
    mapFormValuesToKursperiode,
};

export default kursperiodeUtils;
