export interface ArbeidsgiverResponse {
    organisasjoner: Arbeidsgiver[];
}

export interface Arbeidsgiver {
    navn: string;
    organisasjonsnummer: string;
}

export const isArbeidsgiver = (maybeArbeidsgiver: any): maybeArbeidsgiver is Arbeidsgiver => {
    if (
        maybeArbeidsgiver &&
        typeof maybeArbeidsgiver === 'object' &&
        (maybeArbeidsgiver as Arbeidsgiver).organisasjonsnummer &&
        typeof (maybeArbeidsgiver as Arbeidsgiver).organisasjonsnummer === 'string'
    ) {
        return true;
    }
    return false;
};

export const isArbeidsgivere = (maybeArbeidsgivere: any): maybeArbeidsgivere is Arbeidsgiver[] => {
    if (
        maybeArbeidsgivere &&
        typeof Array.isArray(maybeArbeidsgivere) &&
        (maybeArbeidsgivere as any[]).reduceRight((previousValue, currentValue) => {
            if (!previousValue) {
                return false;
            }
            return !!isArbeidsgiver(currentValue);
        }, true)
    ) {
        return true;
    }
    return false;
};
