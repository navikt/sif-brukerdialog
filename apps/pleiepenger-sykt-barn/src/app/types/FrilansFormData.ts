import { ISODate } from '@navikt/sif-common-utils/lib';
import { ArbeidsforholdFrilanserFormValues } from './ArbeidsforholdFormValues';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';

export enum Frilanstype {
    FRILANSARBEID = 'FRILANSARBEID',
    HONORARARBEID = 'HONORARARBEID',
}

export enum FrilansFormField {
    harHattInntektSomFrilanser = 'frilans.harHattInntektSomFrilanser',
    frilansTyper = 'frilans.frilansTyper',
    misterHonorar = 'frilans.misterHonorar',
    startdato = 'frilans.startdato',
    sluttdato = 'frilans.sluttdato',
    erFortsattFrilanser = 'frilans.erFortsattFrilanser',
    arbeidsforhold = 'frilans.arbeidsforhold',
}

export interface FrilansFormData {
    harHattInntektSomFrilanser?: YesOrNo;
    frilansTyper?: Frilanstype[];
    misterHonorar?: YesOrNo;
    startdato?: ISODate;
    sluttdato?: ISODate;
    erFortsattFrilanser?: YesOrNo;
    arbeidsforhold?: ArbeidsforholdFrilanserFormValues;
}
