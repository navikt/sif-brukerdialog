import { ISODate } from '@navikt/sif-common-utils/lib';
import { ArbeidsforholdFrilanserFormValues } from './ArbeidsforholdFormValues';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';

export enum FrilansTyper {
    FRILANS = 'FRILANS',
    STYREVERV = 'STYREVERV',
}

export enum FrilansFormField {
    harHattInntektSomFrilanser = 'frilans.harHattInntektSomFrilanser',
    frilansTyper = 'frilans.frilansTyper',
    misterHonorarStyreverv = 'frilans.misterHonorarStyreverv',
    startdato = 'frilans.startdato',
    sluttdato = 'frilans.sluttdato',
    erFortsattFrilanser = 'frilans.erFortsattFrilanser',
    arbeidsforhold = 'frilans.arbeidsforhold',
}

export interface FrilansFormData {
    harHattInntektSomFrilanser?: YesOrNo;
    frilansTyper?: FrilansTyper[];
    misterHonorarStyreverv?: YesOrNo;
    startdato?: ISODate;
    sluttdato?: ISODate;
    erFortsattFrilanser?: YesOrNo;
    arbeidsforhold?: ArbeidsforholdFrilanserFormValues;
}
