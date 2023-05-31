import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { ArbeidSøknadsdata } from './arbeidSøknadsdata';
import { BeredskapSøknadsdata } from './beredskapSøknadsdata';
import { FerieuttakIPeriodenSøknadsdata } from './ferieuttakIPeriodenSøknadsdata';
import { MedlemskapSøknadsdata } from './medlemsskapSøknadsdata';
import { NattevåkSøknadsdata } from './nattevåkSøknadsdata';
import { OmBarnetSøknadsdata } from './omBarnetSøknadsdata';
import { OmsorgstilbudSøknadsdata } from './omsorgstilbudSøknadsdata';
import { UtenlandsoppholdIPeriodenSøknadsdata } from './utenlandsoppholdIPeriodenSøknadsdata';
import { StønadGodtgjørelseSøknadsdata } from './stønadGodtgjørelseSøknadsdata';

export * from './omBarnetSøknadsdata';
export * from './arbeidIPeriodeSøknadsdata';
export * from './arbeidAnsattSøknadsdata';
export * from './arbeidFrilansSøknadsdata';
export * from './arbeidSelvstendigSøknadsdata';
export * from './opptjeningUtlandSøknadsdata';
export * from './utenlandskNæringSøknadsdata';
export * from './arbeidSøknadsdata';
export * from './arbeidsforholdSøknadsdata';
export * from './normalarbeidstidSøknadsdata';
export * from './medlemsskapSøknadsdata';
export * from './utenlandsoppholdIPeriodenSøknadsdata';
export * from './ferieuttakIPeriodenSøknadsdata';
export * from './nattevåkSøknadsdata';
export * from './beredskapSøknadsdata';
export * from './omsorgstilbudSøknadsdata';
export * from './stønadGodtgjørelseSøknadsdata';

export interface Søknadsdata {
    harForståttRettigheterOgPlikter?: boolean;
    søknadsperiode?: DateRange;
    barn?: OmBarnetSøknadsdata;
    utenlandsoppholdIPerioden?: UtenlandsoppholdIPeriodenSøknadsdata;
    ferieuttakIPerioden?: FerieuttakIPeriodenSøknadsdata;
    arbeid?: ArbeidSøknadsdata;
    harVærtEllerErVernepliktig?: boolean;
    omsorgstibud?: OmsorgstilbudSøknadsdata;
    nattevåk?: NattevåkSøknadsdata;
    beredskap?: BeredskapSøknadsdata;
    medlemskap?: MedlemskapSøknadsdata;
    legeerklæring?: Attachment[];
    stønadGodtgjørelse?: StønadGodtgjørelseSøknadsdata;
}
