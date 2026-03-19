import { SøknadStepId } from '@app/setup/config/søknadStepConfig';
import { useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/søknad/AppForm';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { StepFormValues } from '@sif/soknad/types';

import { BarnSøknadsdata } from '../../types/Søknadsdata';
import { toBarnFormValues, toBarnSøknadsdata } from './barnStegUtils';

export enum BarnFormFields {
    harBarn = 'harBarn',
}

export interface BarnFormValues extends StepFormValues {
    [BarnFormFields.harBarn]?: YesOrNo;
}

const { YesOrNoQuestion } = createSifFormComponents<BarnFormValues>();

const stepId = SøknadStepId.BARN;

export const BarnForm = () => {
    const { validateField } = useSifValidate();

    const defaultValues = useStepDefaultValues<BarnFormValues, BarnSøknadsdata>({
        stepId,
        toFormValues: toBarnFormValues,
    });

    const { onSubmit, isPending } = useStepSubmit<BarnFormValues, BarnSøknadsdata>({
        stepId,
        toSøknadsdata: toBarnSøknadsdata,
    });

    const methods = useSøknadRhfForm(stepId, defaultValues);

    return (
        <AppForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={isPending}>
            <YesOrNoQuestion
                name={BarnFormFields.harBarn}
                legend="Har du barn?"
                validate={validateField(BarnFormFields.harBarn, getYesOrNoValidator())}
            />
        </AppForm>
    );
};
