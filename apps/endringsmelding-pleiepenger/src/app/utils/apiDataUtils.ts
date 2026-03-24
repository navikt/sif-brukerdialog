import { ArbeidstakerApiData } from '@app/types';

export const harEndretArbeidstidForArbeidsgiverIApiData = (
    arbeidsgiverId: string,
    endringer?: ArbeidstakerApiData[],
): boolean => {
    const arbeidsgiverEndring = endringer ? endringer.find((a) => a.organisasjonsnummer === arbeidsgiverId) : undefined;
    if (arbeidsgiverEndring) {
        return Object.keys(arbeidsgiverEndring.arbeidstidInfo.perioder).length > 0;
    }
    return false;
};
