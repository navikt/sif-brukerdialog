import { ISODate } from '@navikt/sif-common-utils/lib';
import { ArbeidsgiverType } from '../_Arbeidsgiver';
import { ArbeidsforholdApiData } from './_ArbeidsforholdApiData';

export interface ArbeidsgiverApiData {
    type: ArbeidsgiverType;
    navn: string;
    organisasjonsnummer?: string;
    offentligIdent?: string;
    ansattFom?: ISODate;
    ansattTom?: ISODate;
    erAnsatt: boolean;
    sluttetFørSøknadsperiode?: boolean;
    arbeidsforhold?: ArbeidsforholdApiData;
}

export type OrganisasjonArbeidsgiverApiData = Omit<ArbeidsgiverApiData, 'offentligIdent' | 'organisasjonsnummer'> & {
    type: ArbeidsgiverType.ORGANISASJON;
    organisasjonsnummer: string;
};
