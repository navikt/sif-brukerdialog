import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { ISODate } from '@navikt/sif-common-utils/lib';
import { ArbeidsforholdFrilanserFormValues } from './_ArbeidsforholdFormValues';

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
    arbeidsforholdFrilansarbeid = 'frilans.arbeidsforholdFrilansarbeid',
    arbeidsforholdHonorararbeid = 'frilans.arbeidsforholdHonorararbeid',
}

export interface FrilansFormData {
    harHattInntektSomFrilanser?: YesOrNo;
    frilanstyper?: Frilanstype[];
    misterHonorar?: YesOrNo;
    startdato?: ISODate;
    sluttdato?: ISODate;
    erFortsattFrilanser?: YesOrNo;
    arbeidsforholdFrilansarbeid?: ArbeidsforholdFrilanserFormValues;
    arbeidsforholdHonorararbeid?: ArbeidsforholdFrilanserFormValues;
}
