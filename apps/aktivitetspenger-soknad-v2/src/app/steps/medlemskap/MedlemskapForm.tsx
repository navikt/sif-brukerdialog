import { SøknadStepId } from '@app/setup/config/søknadStepConfig';
import { useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/søknad/AppForm';
import { FormLayout } from '@navikt/sif-common-ui';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { StepFormValues } from '@sif/soknad/types';

import { MedlemskapSøknadsdata } from '../../types/Søknadsdata';
import { toMedlemskapFormValues, toMedlemskapSøknadsdata } from './medlemskapStegUtils';

export enum MedlemskapFormFields {
    harBoddIUtlandetSiste5år = 'harBoddIUtlandetSiste5år',
}

export interface MedlemskapFormValues extends StepFormValues {
    [MedlemskapFormFields.harBoddIUtlandetSiste5år]?: YesOrNo;
}

const { YesOrNoQuestion } = createSifFormComponents<MedlemskapFormValues>();

const stepId = SøknadStepId.MEDLEMSKAP;

export const MedlemskapForm = () => {
    const { validateField } = useSifValidate();

    const defaultValues = useStepDefaultValues<MedlemskapFormValues, MedlemskapSøknadsdata>({
        stepId,
        toFormValues: toMedlemskapFormValues,
    });

    const { onSubmit, isPending } = useStepSubmit<MedlemskapFormValues, MedlemskapSøknadsdata>({
        stepId,
        toSøknadsdata: toMedlemskapSøknadsdata,
    });

    const methods = useSøknadRhfForm(stepId, defaultValues);

    return (
        <AppForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={isPending}>
            <FormLayout.Questions>
                <YesOrNoQuestion
                    name={MedlemskapFormFields.harBoddIUtlandetSiste5år}
                    legend="Har du bodd i utlandet de siste 5 årene?"
                    validate={validateField(MedlemskapFormFields.harBoddIUtlandetSiste5år, getYesOrNoValidator())}
                />
            </FormLayout.Questions>
        </AppForm>
    );
};
