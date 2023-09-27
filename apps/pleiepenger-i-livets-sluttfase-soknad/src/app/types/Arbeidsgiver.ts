export enum ArbeidsgiverType {
    'PRIVATPERSON' = 'PRIVAT',
    'ORGANISASJON' = 'ORGANISASJON',
    'FRILANSOPPDRAG' = 'FRILANSOPPDRAG',
}
export interface Arbeidsgiver {
    /** Organisasjonsnummer eller fødselsnummer */
    id: string;
    organisasjonsnummer?: string;
    offentligIdent?: string;
    type: ArbeidsgiverType;
    navn: string;
    ansattFom?: Date;
    ansattTom?: Date;
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
