import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import {
    DeltBostedFormValues,
    toSøknadsdata as toDeltBostedSøknadsdata,
} from '@app/steps/delt-bosted/deltBostedStegUtils';
import {
    LegeerklæringFormValues,
    toSøknadsdata as toLegeerklæringSøknadsdata,
} from '@app/steps/legeerklæring/legeerklæringStegUtils';
import { StepFormValues, StepSøknadsdata } from '@sif/soknad/types';

export const formValuesToSøknadsdata = (stepId: string, formValues: StepFormValues): StepSøknadsdata | undefined => {
    switch (stepId) {
        case SøknadStepId.OM_BARNET:
            // Mapping krever registrerteBarn — gjøres i OmBarnetForm via useStepSubmit
            return undefined;
        case SøknadStepId.LEGEERKLÆRING:
            return toLegeerklæringSøknadsdata(formValues as LegeerklæringFormValues);
        case SøknadStepId.DELT_BOSTED:
            return toDeltBostedSøknadsdata(formValues as DeltBostedFormValues);
        default:
            return undefined;
    }
};
