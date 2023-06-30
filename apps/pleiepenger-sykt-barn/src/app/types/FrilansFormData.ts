import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { ISODate } from '@navikt/sif-common-utils/lib';
import { ArbeiderIPeriodenSvar } from '../local-sif-common-pleiepenger';
import { ArbeidsforholdFrilanserFormValues, NormalarbeidstidFormValues } from './ArbeidsforholdFormValues';

export enum Frilanstype {
    FRILANSARBEID = 'FRILANSARBEID',
    HONORARARBEID = 'HONORARARBEID',
}

export enum FrilansFormField {
    harHattInntektSomFrilanser = 'frilans.harHattInntektSomFrilanser',
    frilanstyper = 'frilans.frilanstyper',
    misterHonorar = 'frilans.misterHonorar',
    startdato = 'frilans.startdato',
    sluttdato = 'frilans.sluttdato',
    erFortsattFrilanser = 'frilans.erFortsattFrilanser',
    honorararbeid_normalarbeidstid = 'frilans.honorararbeid_normalarbeidstid.timerPerUke',
    honorararbeid_arbeiderIPeriodenSvar = 'frilans.honorararbeid_arbeiderIPeriodenSvar',
    frilansarbeid_normalarbeidstid = 'frilans.frilansarbeid_normalarbeidstid.timerPerUke',
    frilansarbeid_arbeiderIPeriodenSvar = 'frilans.frilansarbeid_arbeiderIPeriodenSvar',
    arbeidsforhold = 'frilans.arbeidsforhold',
}

export interface FrilansFormData {
    harHattInntektSomFrilanser?: YesOrNo;
    frilanstyper?: Frilanstype[];
    misterHonorar?: YesOrNo;
    startdato?: ISODate;
    sluttdato?: ISODate;
    erFortsattFrilanser?: YesOrNo;
    arbeidsforhold?: ArbeidsforholdFrilanserFormValues;
    honorararbeid_normalarbeidstid?: NormalarbeidstidFormValues;
    honorararbeid_arbeiderIPeriodenSvar?: ArbeiderIPeriodenSvar;
    frilansarbeid_normalarbeidstid?: NormalarbeidstidFormValues;
    frilansarbeid_arbeiderIPeriodenSvar?: ArbeiderIPeriodenSvar;
}
