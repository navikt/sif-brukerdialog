import { isObjectLike } from 'lodash';

export type ArbeidsgiverIkkeFunnetError = {
    type: 'ArbeidsgiverIkkeFunnet';
    message: 'getArbeidsaktivitetArbeidstaker - arbeidsgiver ikke funnet';
    maskedArbeidsgivere?: Array<string | undefined>;
};

export const isArbeidsgiverIkkeFunnetError = (error: any): error is ArbeidsgiverIkkeFunnetError => {
    return error !== undefined && isObjectLike(error) && error.type === 'ArbeidsgiverIkkeFunnet';
};
