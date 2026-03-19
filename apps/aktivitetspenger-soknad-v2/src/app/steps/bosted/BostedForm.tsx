import { SøknadStepId } from '@app/setup/config/søknadStepConfig';
import { useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/søknad/AppForm';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { StepFormValues } from '@sif/soknad/types';

import { BostedSøknadsdata } from '../../types/Søknadsdata';
import { toBostedFormValues, toBostedSøknadsdata } from './bostedStegUtils';

export enum BostedFormFields {
    borINorge = 'borINorge',
}

export interface BostedFormValues extends StepFormValues {
    [BostedFormFields.borINorge]?: YesOrNo;
}

const { YesOrNoQuestion } = createSifFormComponents<BostedFormValues>();

const stepId = SøknadStepId.BOSTED;

export const BostedForm = () => {
    const { validateField } = useSifValidate();

    const defaultValues = useStepDefaultValues<BostedFormValues, BostedSøknadsdata>({
        stepId,
        toFormValues: toBostedFormValues,
    });

    const { onSubmit, isPending } = useStepSubmit<BostedFormValues, BostedSøknadsdata>({
        stepId,
        toSøknadsdata: toBostedSøknadsdata,
    });

    const methods = useSøknadRhfForm(stepId, defaultValues);

    return (
        <AppForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={isPending}>
            <YesOrNoQuestion
                name={BostedFormFields.borINorge}
                legend="Bor du i Norge?"
                validate={validateField(BostedFormFields.borINorge, getYesOrNoValidator())}
            />
        </AppForm>
    );
};
