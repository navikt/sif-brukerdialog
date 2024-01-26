import { hasValue } from '@navikt/sif-common-formik-ds/src/validation/validationUtils';

export interface Fosterbarn {
    id?: string;
    fødselsnummer: string;
    navn: string;
}

export const isFosterbarn = (fosterbarn: Partial<Fosterbarn>, includeName?: boolean): fosterbarn is Fosterbarn => {
    const { navn, fødselsnummer } = fosterbarn;
    if (includeName) {
        return hasValue(navn) && hasValue(fødselsnummer);
    }
    return hasValue(fødselsnummer);
};
