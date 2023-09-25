import { ISODate } from '@navikt/sif-common-utils/lib';
import { ArbeidsforholdApiData } from './ArbeidsforholdApiData';

export interface ArbeidsgiverAnsattApiData {
    navn: string;
    organisasjonsnummer?: string;
    offentligIdent?: string;
    ansattFom?: ISODate;
    ansattTom?: ISODate;
    erAnsatt: boolean;
    sluttetFørSøknadsperiode?: boolean;
    arbeidsforhold?: ArbeidsforholdApiData;
}
