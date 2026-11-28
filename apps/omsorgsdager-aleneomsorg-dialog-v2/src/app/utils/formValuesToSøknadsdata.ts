import { toOmOmsorgenForBarnSøknadsdata } from '../steps/om-omsorgen-for-barn/omOmsorgenForBarnStegUtils';
import type { OmOmsorgenForBarnFormValues } from '../steps/om-omsorgen-for-barn/types';
import { toTidspunktForAleneomsorgSøknadsdata } from '../steps/tidspunkt-for-aleneomsorg/tidspunktForAleneomsorgStegUtils';
import type { TidspunktForAleneomsorgFormValues } from '../steps/tidspunkt-for-aleneomsorg/types';
import { SøknadStepId } from '../types/SoknadStepId';

export const formValuesToSøknadsdata = (
    stepId: string,
    formValues: Record<string, unknown>,
): Record<string, unknown> | undefined => {
    if (stepId === SøknadStepId.OM_OMSORGEN_FOR_BARN) {
        const søknadsdata = toOmOmsorgenForBarnSøknadsdata(formValues as unknown as OmOmsorgenForBarnFormValues);
        return søknadsdata ? { ...søknadsdata } : undefined;
    }

    if (stepId === SøknadStepId.TIDSPUNKT_FOR_ALENEOMSORG) {
        const values = formValues as unknown as TidspunktForAleneomsorgFormValues;
        const søknadsdata = toTidspunktForAleneomsorgSøknadsdata(values);
        return søknadsdata ? { ...søknadsdata } : undefined;
    }

    return undefined;
};
