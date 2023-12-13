import { YesOrNo } from '@navikt/sif-common-formik-ds/src';
import { ISODate } from '@navikt/sif-common-utils/lib';
import { ArbeidsforholdFrilanserFormValues } from './ArbeidsforholdFormValues';

export enum FrilansFormField {
    harHattInntektSomFrilanser = 'frilans.harHattInntektSomFrilanser',
    frilanstype = 'frilans.frilanstype',
    frilanstyper = 'frilans.frilanstyper',
    misterHonorar = 'frilans.misterHonorar',
    startetFørSisteTreHeleMåneder = 'frilans.startetFørSisteTreHeleMåneder',
    startdato = 'frilans.startdato',
    sluttdato = 'frilans.sluttdato',
    erFortsattFrilanser = 'frilans.erFortsattFrilanser',
    arbeidsforhold = 'frilans.arbeidsforhold',
}

export enum Frilanstype {
    'FRILANS' = 'FRILANS',
    'FRILANS_HONORAR' = 'FRILANS_HONORAR',
    'HONORAR' = 'HONORAR',
}
export interface FrilansFormValues {
    harHattInntektSomFrilanser?: YesOrNo;
    frilanstype?: Frilanstype;
    misterHonorar?: YesOrNo;
    startetFørSisteTreHeleMåneder?: YesOrNo;
    startdato?: ISODate;
    sluttdato?: ISODate;
    erFortsattFrilanser?: YesOrNo;
    arbeidsforhold?: ArbeidsforholdFrilanserFormValues;
}
