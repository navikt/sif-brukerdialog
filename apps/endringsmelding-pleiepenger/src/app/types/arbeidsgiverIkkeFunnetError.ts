import { isObjectLike } from 'lodash';

export type ArbeidsgiverIkkeFunnetError = {
    type: 'ArbeidsgiverIkkeFunnet';
    message: 'getArbeidAktivitetArbeidstaker - arbeidsgiver ikke funnet';
    arbeidstaker: {
        harOrganisasjonsnummer: boolean;
        maskedOrganisasjonsnummer?: string;
        harNorskIdentitetsnummer: boolean;
        maskedIdentitetsnummer?: string;
    };
    maskedArbeidsgivere?: Array<string | undefined>;
};

export const isArbeidsgiverIkkeFunnetError = (error: any): error is ArbeidsgiverIkkeFunnetError => {
    return error !== undefined && isObjectLike(error) && error.type === 'ArbeidsgiverIkkeFunnet';
};
