import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { ArbeidSøknadsdata } from './arbeidSøknadsdata';
import { BeredskapSøknadsdata } from './BeredskapSøknadsdata';
import { FerieuttakIPeriodenSøknadsdata } from './FerieuttakIPeriodenSøknadsdata';
import { MedlemskapSøknadsdata } from './MedlemsskapSøknadsdata';
import { NattevåkSøknadsdata } from './NattevåkSøknadsdata';
import { OmBarnetSøknadsdata } from './OmBarnetSøknadsdata';
import { OmsorgstilbudSøknadsdata } from './OmsorgstilbudSøknadsdata';
import { UtenlandsoppholdIPeriodenSøknadsdata } from './UtenlandsoppholdIPeriodenSøknadsdata';
import { StønadGodtgjørelseSøknadsdata } from './StønadGodtgjørelseSøknadsdata';
import { ArbeidssituasjonSøknadsdata } from './ArbeidssituasjonSøknadsdata';
import { ArbeidstidSøknadsdata } from './ArbeidstidSøknadsdata';

export * from './OmBarnetSøknadsdata';
export * from './arbeidIPeriodeSøknadsdata';
export * from './arbeidAnsattSøknadsdata';
export * from './arbeidFrilansSøknadsdata';
export * from './arbeidSelvstendigSøknadsdata';
export * from './OpptjeningUtlandSøknadsdata';
export * from './UtenlandskNæringSøknadsdata';
export * from './arbeidSøknadsdata';
export * from './arbeidsforholdSøknadsdata';
export * from './NormalarbeidstidSøknadsdata';
export * from './MedlemsskapSøknadsdata';
export * from './UtenlandsoppholdIPeriodenSøknadsdata';
export * from './FerieuttakIPeriodenSøknadsdata';
export * from './NattevåkSøknadsdata';
export * from './BeredskapSøknadsdata';
export * from './OmsorgstilbudSøknadsdata';
export * from './StønadGodtgjørelseSøknadsdata';

export interface Søknadsdata {
    harForståttRettigheterOgPlikter?: boolean;
    søknadsperiode?: DateRange;
    barn?: OmBarnetSøknadsdata;
    utenlandsoppholdIPerioden?: UtenlandsoppholdIPeriodenSøknadsdata;
    ferieuttakIPerioden?: FerieuttakIPeriodenSøknadsdata;
    arbeid?: ArbeidSøknadsdata;
    arbeidssituasjon?: ArbeidssituasjonSøknadsdata;
    arbeidstidIPerioden?: ArbeidstidSøknadsdata;
    harVærtEllerErVernepliktig?: boolean;
    omsorgstibud?: OmsorgstilbudSøknadsdata;
    nattevåk?: NattevåkSøknadsdata;
    beredskap?: BeredskapSøknadsdata;
    medlemskap?: MedlemskapSøknadsdata;
    legeerklæring?: Attachment[];
    stønadGodtgjørelse?: StønadGodtgjørelseSøknadsdata;
}
