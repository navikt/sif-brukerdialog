import { DateRange, dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import { dateToISODate, durationAsNumberDuration, guid, numberDurationAsDuration } from '@navikt/sif-common-utils';

import { Kursdag } from '../../../../types/Kursdag';
import { Kursperiode } from '../../../../types/Kursperiode';
import { KursdagFormValues } from '../parts/kursdager-form-part/KursdagQuestions';
import { KursperiodeFormValues } from '../parts/kursperioder-form-part/KursperiodeQuestions';

const isValidKursperiode = (kursperiode: Partial<Kursperiode>): kursperiode is Kursperiode => {
    return kursperiode.periode?.from !== undefined && kursperiode.periode.to !== undefined;
};

const getPeriodeFromKursperiodeFormValue = (formValues: Partial<KursperiodeFormValues>): DateRange | undefined => {
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
const getDatoFromKursdagFormValue = (formValues: Partial<KursdagFormValues>): Date | undefined => {
    return ISOStringToDate(formValues.dato);
};

const getDatoFromKursdagFormDato = (dato: string | undefined): Date | undefined => {
    return ISOStringToDate(dato);
};

const mapKursPeriodeFormValuesToKursperiode = (
    formValues: KursperiodeFormValues,
    id: string | undefined,
): Kursperiode => {
    const periode = getPeriodeFromKursperiodeFormValue(formValues);
    if (!periode) {
        throw new Error('Kan ikke mappe form values til kursperiode: Fom og tom må være satt');
    }
    return {
        id: id || guid(),
        periode,
    };
};

const mapKursdagFormValuesToKursdagMedVariget = (formValues: KursdagFormValues, id: string | undefined): Kursdag => {
    const dato = getDatoFromKursdagFormDato(formValues.dato);
    const tidKurs = durationAsNumberDuration(formValues.tidKurs);
    const tidReise = formValues.tidReise ? durationAsNumberDuration(formValues.tidReise) : undefined;

    if (!dato) {
        throw new Error('Kan ikke mappe form values til kursdag');
    }
    return {
        id: id || guid(),
        dato,
        tidKurs,
        tidReise,
    };
};

const mapKursdagFormValuesToKursdagUtenVarighet = (formValues: KursdagFormValues, id: string | undefined): Kursdag => {
    const dato = getDatoFromKursdagFormDato(formValues.dato);

    if (!dato) {
        throw new Error('Kan ikke mappe form values til kursdag');
    }
    return {
        id: id || guid(),
        dato,
        /** TODO: Setter disse til 0 frem til det ikke er påkrevd i backend */
        tidKurs: { hours: 0, minutes: 0 },
        tidReise: { hours: 0, minutes: 0 },
    };
};

const mapKursdagToKursdagFormValues = (kurs: Kursdag): Partial<KursdagFormValues> => ({
    dato: dateToISODate(kurs.dato),
    tidKurs: numberDurationAsDuration(kurs.tidKurs),
    tidReise: kurs.tidReise ? numberDurationAsDuration(kurs.tidReise) : undefined,
});

const mapKursperiodeToFormValues = ({ periode }: Partial<Kursperiode>): KursperiodeFormValues => {
    return {
        fom: dateToISOString(periode?.from),
        tom: dateToISOString(periode?.to),
    };
};

const kursperiodeOgDagUtils = {
    isValidKursperiode,
    mapKursperiodeToFormValues,
    mapKursPeriodeFormValuesToKursperiode,
    mapKursdagFormValuesToKursdagMedVariget,
    mapKursdagFormValuesToKursdagUtenVarighet,
    mapKursdagToKursdagFormValues,
    getPeriodeFromKursperiodeFormValue,
    getDatoFromKursdagFormValue,
    getDatoFromKursdagFormDato,
};

export default kursperiodeOgDagUtils;
