import { useCallback } from 'react';

import { useAppContext } from '../context/AppContext';
import {
    DeltBostedFormValues,
    toSøknadsdata as toDeltBostedSøknadsdata,
} from '../steps/delt-bosted/deltBostedStegUtils';
import {
    LegeerklæringFormValues,
    toSøknadsdata as toLegeerklæringSøknadsdata,
} from '../steps/legeerklæring/legeerklæringStegUtils';
import { toOmBarnetSøknadsdata } from '../steps/om-barnet/omBarnetStegUtils';
import { OmBarnetFormValues } from '../steps/om-barnet/types';
import { SøknadStepId } from '../types/SoknadStepId';

type StepFormValues = Record<string, unknown>;

export const useFormValuesToSøknadsdata = () => {
    const { barn } = useAppContext();

    return useCallback(
        (stepId: string, formValues: StepFormValues): StepFormValues | undefined => {
            switch (stepId) {
                case SøknadStepId.OM_BARNET:
                    return toOmBarnetSøknadsdata(
                        formValues as unknown as OmBarnetFormValues,
                        barn,
                    ) as unknown as StepFormValues;
                case SøknadStepId.LEGEERKLÆRING:
                    return toLegeerklæringSøknadsdata(
                        formValues as unknown as LegeerklæringFormValues,
                    ) as unknown as StepFormValues;
                case SøknadStepId.DELT_BOSTED:
                    return toDeltBostedSøknadsdata(
                        formValues as unknown as DeltBostedFormValues,
                    ) as unknown as StepFormValues;
                default:
                    return undefined;
            }
        },
        [barn],
    );
};
