import { SøknadStepId } from '@app/setup/config/soknadStepConfig';
import { useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/soknad/AppForm';
import { FormLayout } from '@navikt/sif-common-ui';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { StepFormValues } from '@sif/soknad/types';

import { BostedSøknadsdata } from '../../types/Soknadsdata';
import { toBostedFormValues, toBostedSøknadsdata } from './bostedStegUtils';

export enum BostedFormFields {
    erBosattITrondheim = 'erBosattITrondheim',
    borUtenforTrondheim = 'borUtenforTrondheim',
}

export interface BostedFormValues extends StepFormValues {
    [BostedFormFields.erBosattITrondheim]?: YesOrNo;
    [BostedFormFields.borUtenforTrondheim]?: YesOrNo;
}
const { YesOrNoQuestion } = createSifFormComponents<BostedFormValues>();

const stepId = SøknadStepId.BOSTED;

export const BostedForm = () => {
    const { validateField } = useSifValidate('bostedForm');

    const defaultValues = useStepDefaultValues<BostedFormValues, BostedSøknadsdata>({
        stepId,
        toFormValues: toBostedFormValues,
    });

    const { onSubmit, isPending } = useStepSubmit<BostedFormValues, BostedSøknadsdata>({
        stepId,
        toSøknadsdata: toBostedSøknadsdata,
    });

    const methods = useSøknadRhfForm(stepId, defaultValues);

    const erBosattITrondheim = methods.watch(BostedFormFields.erBosattITrondheim);

    return (
        <AppForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={isPending}>
            <FormLayout.Content>
                <YesOrNoQuestion
                    name={BostedFormFields.erBosattITrondheim}
                    legend="Bor du i Trondheim"
                    validate={validateField(BostedFormFields.erBosattITrondheim, getYesOrNoValidator())}
                />
                {erBosattITrondheim === YesOrNo.YES && (
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
