import { AnnetBarn } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';

interface DineBarnSøknadsdataBase {
    andreBarn: AnnetBarn[];
    harUtvidetRett: boolean;
}

export enum DineBarnSøknadsdataType {
    'HAR_IKKE_RETT_STOPPES' = 'HAR_IKKE_RETT_STOPPES',
    'UTVIDET_RETT_PGA_SYKT_BARN_OVER_13' = 'UTVIDET_RETT_PGA_SYKT_BARN_OVER_13',
    'UTVIDET_RETT_PGA_SYKDOM_ELLER_ALENEOMSORG' = 'UTVIDET_RETT_PGA_SYKDOM_ELLER_ALENEOMSORG',
    'UTVIDET_RETT_PGA_ANTALL_BARN' = 'UTVIDET_RETT_PGA_ANTALL_BARN',
}

interface HarIkkeRettPåOmsorgsdager extends DineBarnSøknadsdataBase {
    type: DineBarnSøknadsdataType.HAR_IKKE_RETT_STOPPES;
}
interface UtvidetRettSyktBarnOver13 extends DineBarnSøknadsdataBase {
    type: DineBarnSøknadsdataType.UTVIDET_RETT_PGA_SYKT_BARN_OVER_13;
}

interface UtvidetRettPgaSykdomEllerAleneomsorg extends DineBarnSøknadsdataBase {
    type: DineBarnSøknadsdataType.UTVIDET_RETT_PGA_SYKDOM_ELLER_ALENEOMSORG;
    harSyktBarn: boolean;
    harAleneomsorg?: boolean;
    harDekketTiFørsteDagerSelv?: boolean;
}

interface UtvidetRettPgaAntallBarn extends DineBarnSøknadsdataBase {
    type: DineBarnSøknadsdataType.UTVIDET_RETT_PGA_ANTALL_BARN;
    harDekketTiFørsteDagerSelv: boolean;
}

export type DineBarnSøknadsdata =
    | HarIkkeRettPåOmsorgsdager
    | UtvidetRettSyktBarnOver13
    | UtvidetRettPgaSykdomEllerAleneomsorg
    | UtvidetRettPgaAntallBarn;
