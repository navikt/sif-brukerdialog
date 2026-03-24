import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/soknad/AppForm';
import { BostedSøknadsdata } from '@app/types/Soknadsdata';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';

import { toBostedFormValues, toBostedSøknadsdata } from './bostedStegUtils';
import { BostedFormFields, BostedFormValues } from './types';

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
                name={BostedFormFields.borITrondheim}
                legend="Bor du i Trondheim?"
                validate={validateField(BostedFormFields.borITrondheim, getYesOrNoValidator())}
            />
        </AppForm>
    );
};
