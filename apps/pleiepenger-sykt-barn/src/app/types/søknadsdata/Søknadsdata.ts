import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { DateRange } from '@navikt/sif-common-formik-ds';

import { ArbeidssituasjonSøknadsdata } from './ArbeidssituasjonSøknadsdata';
import { ArbeidstidSøknadsdata } from './ArbeidstidSøknadsdata';
import { BeredskapSøknadsdata } from './BeredskapSøknadsdata';
import { FerieuttakIPeriodenSøknadsdata } from './FerieuttakIPeriodenSøknadsdata';
import { FosterhjemsgodtgjørelseSøknadsdata } from './FosterhjemsgodtgjørelseSøknadsdata';
import { MedlemskapSøknadsdata } from './MedlemsskapSøknadsdata';
import { NattevåkSøknadsdata } from './NattevåkSøknadsdata';
import { OmBarnetSøknadsdata } from './OmBarnetSøknadsdata';
import { OmsorgsstønadSøknadsdata } from './OmsorgsstønadSøknadsdata';
import { OmsorgstilbudSøknadsdata } from './OmsorgstilbudSøknadsdata';
import { UtenlandsoppholdIPeriodenSøknadsdata } from './UtenlandsoppholdIPeriodenSøknadsdata';

export * from './ArbeidIPeriodeSøknadsdata';
export * from './BeredskapSøknadsdata';
export * from './FerieuttakIPeriodenSøknadsdata';
export * from './MedlemsskapSøknadsdata';
export * from './NattevåkSøknadsdata';
export * from './NormalarbeidstidSøknadsdata';
export * from './OmBarnetSøknadsdata';
export * from './OmsorgsstønadSøknadsdata';
export * from './OmsorgstilbudSøknadsdata';
export * from './OpptjeningUtlandSøknadsdata';
export * from './UtenlandskNæringSøknadsdata';
export * from './UtenlandsoppholdIPeriodenSøknadsdata';

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
    legeerklæring?: Vedlegg[];
    omsorgsstønad?: OmsorgsstønadSøknadsdata;
    fosterhjemsgodtgjørelse?: FosterhjemsgodtgjørelseSøknadsdata;
}
