import { AnnetBarn } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import { DineBarnScenario } from '../../søknad/steps/dine-barn/dineBarnStepUtils';

export type DineBarnSøknadsdata = {
    scenario: DineBarnScenario;
    andreBarn: AnnetBarn[];
    harUtvidetRett: boolean;
    harAleneomsorg?: boolean;
    harSyktBarn?: boolean;
    harDekketTiFørsteDagerSelv?: boolean;
};
