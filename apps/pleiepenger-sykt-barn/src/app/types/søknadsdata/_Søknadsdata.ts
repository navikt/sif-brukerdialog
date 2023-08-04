import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { ArbeidssituasjonSøknadsdata } from './_ArbeidssituasjonSøknadsdata';
import { ArbeidstidSøknadsdata } from './_ArbeidstidSøknadsdata';
import { BeredskapSøknadsdata } from './_BeredskapSøknadsdata';
import { FerieuttakIPeriodenSøknadsdata } from './_FerieuttakIPeriodenSøknadsdata';
import { MedlemskapSøknadsdata } from './_MedlemsskapSøknadsdata';
import { NattevåkSøknadsdata } from './_NattevåkSøknadsdata';
import { OmBarnetSøknadsdata } from './_OmBarnetSøknadsdata';
import { OmsorgstilbudSøknadsdata } from './_OmsorgstilbudSøknadsdata';
import { StønadGodtgjørelseSøknadsdata } from './_StønadGodtgjørelseSøknadsdata';
import { UtenlandsoppholdIPeriodenSøknadsdata } from './_UtenlandsoppholdIPeriodenSøknadsdata';

export * from './_OmBarnetSøknadsdata';
export * from './_ArbeidIPeriodeSøknadsdata';
export * from './_OpptjeningUtlandSøknadsdata';
export * from './_UtenlandskNæringSøknadsdata';
export * from './_NormalarbeidstidSøknadsdata';
export * from './_MedlemsskapSøknadsdata';
export * from './_UtenlandsoppholdIPeriodenSøknadsdata';
export * from './_FerieuttakIPeriodenSøknadsdata';
export * from './_NattevåkSøknadsdata';
export * from './_BeredskapSøknadsdata';
export * from './_OmsorgstilbudSøknadsdata';
export * from './_StønadGodtgjørelseSøknadsdata';

export interface Søknadsdata {
    isInitialized: boolean;
    harForståttRettigheterOgPlikter?: boolean;
    søknadsperiode?: DateRange;
    barn?: OmBarnetSøknadsdata;
    utenlandsoppholdIPerioden?: UtenlandsoppholdIPeriodenSøknadsdata;
    ferieuttakIPerioden?: FerieuttakIPeriodenSøknadsdata;
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
