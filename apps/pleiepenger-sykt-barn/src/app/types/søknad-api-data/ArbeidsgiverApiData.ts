import { ISODate } from '@navikt/sif-common-utils/lib';
import { ArbeidsgiverType } from '../Arbeidsgiver';
import { ArbeidsforholdApiData } from './ArbeidsforholdApiData';

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
