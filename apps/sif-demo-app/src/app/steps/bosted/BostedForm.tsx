import { SøknadStepId } from '@app/setup/config/søknadStepConfig';
import { useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/søknad/AppForm';
import { FormLayout } from '@navikt/sif-common-ui';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { StepFormValues } from '@sif/soknad/types';

import { BostedSøknadsdata } from '../../types/Søknadsdata';
import { toBostedFormValues, toBostedSøknadsdata } from './bostedStegUtils';

export enum BostedFormFields {
    borITrondheim = 'borITrondheim',
    borUtenforTrondheim = 'borUtenforTrondheim',
}

export interface BostedFormValues extends StepFormValues {
    [BostedFormFields.borITrondheim]?: YesOrNo;
    [BostedFormFields.borUtenforTrondheim]?: YesOrNo;
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

    const borITrondheim = methods.watch(BostedFormFields.borITrondheim);

    return (
        <AppForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={isPending}>
            <FormLayout.Content>
                <YesOrNoQuestion
                    name={BostedFormFields.borITrondheim}
                    legend="Bor du i Trondheim"
                    validate={validateField(BostedFormFields.borITrondheim, getYesOrNoValidator())}
                />
                {borITrondheim === YesOrNo.YES && (
                    <YesOrNoQuestion
                        name={BostedFormFields.borUtenforTrondheim}
                        legend="Bor du utenfor Trondheim"
                        validate={validateField(BostedFormFields.borUtenforTrondheim, getYesOrNoValidator())}
                    />
                )}
            </FormLayout.Content>
        </AppForm>
    );
};
