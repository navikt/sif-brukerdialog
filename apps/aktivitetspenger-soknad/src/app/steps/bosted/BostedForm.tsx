import { SøknadStepId } from '@app/setup/config/SøknadStepId';
import { useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/søknad/AppForm';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';

import { BostedSøknadsdata } from '../../types/Søknadsdata';
import { BostedFormFields, BostedFormValues } from './types';
import { toBostedFormValues, toBostedSøknadsdata } from './bostedStegUtils';

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
