import { ISOStringToDate, dateToISOString } from '@navikt/sif-common-formik-ds';
import { UtenlandskNæring, UtenlandskNæringFormValues } from './types';
import { guid } from '@navikt/sif-common-utils';

export const cleanupUtenlandskNæringFormValues = (
    formValues: UtenlandskNæringFormValues,
): UtenlandskNæringFormValues => {
    const values: UtenlandskNæringFormValues = { ...formValues };
    const tomDate = ISOStringToDate(values.tilOgMed);

    if (tomDate) {
        values.erPågående = undefined;
    }

    return values;
};

export const isValidUtenlandskNæring = (
    utenlandskNæring: Partial<UtenlandskNæring>,
): utenlandskNæring is UtenlandskNæring => {
    return utenlandskNæring.fraOgMed !== undefined && utenlandskNæring.land != undefined;
};

export const mapFormValuesToUtenlandskNæring = (
    formValues: UtenlandskNæringFormValues,
    id: string | undefined,
): Partial<UtenlandskNæring> => {
    return {
        ...formValues,
        id: id || guid(),
        fraOgMed: ISOStringToDate(formValues.fraOgMed),
        tilOgMed: ISOStringToDate(formValues.tilOgMed),
    };
};

export const mapUtenlandskNæringToFormValues = (utenlandskNæring: UtenlandskNæring): UtenlandskNæringFormValues => {
    return {
        ...utenlandskNæring,
        fraOgMed: dateToISOString(utenlandskNæring.fraOgMed),
        tilOgMed: dateToISOString(utenlandskNæring.tilOgMed),
    };
};
