import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { ISODate } from '@navikt/sif-common-utils/lib';
import { ArbeiderIPeriodenSvar } from '../local-sif-common-pleiepenger';
import { ArbeidIPeriodeFormValues } from './ArbeidIPeriodeFormValues';
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
    arbeidsforhold = 'frilans.arbeidsforhold',
    normalarbeidstidFrilansarbeid = 'normalarbeidstidFrilansarbeid',
    normalarbeidstidHonorararbeid = 'normalarbeidstidHonorararbeid',
}

export interface FrilansFormData {
    harHattInntektSomFrilanser?: YesOrNo;
    frilanstyper?: Frilanstype[];
    misterHonorar?: YesOrNo;
    startdato?: ISODate;
    sluttdato?: ISODate;
    erFortsattFrilanser?: YesOrNo;
    normalarbeidstidFrilansarbeid?: NormalarbeidstidFormValues;
    normalarbeidstidHonorararbeid?: NormalarbeidstidFormValues;
    arbeidIPeriodeSvarFrilanserarbeid?: ArbeiderIPeriodenSvar;
    arbeidIPeriodeSvarHonorararbeid?: ArbeiderIPeriodenSvar;
    arbeidIPeriode?: ArbeidIPeriodeFormValues;
    arbeidsforhold?: ArbeidsforholdFrilanserFormValues;
}
