import { useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/søknad/AppForm';
import { SøknadStepId } from '@app/setup/søknad/søknadStepConfig';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { StepFormValues } from '@sif/soknad/types';

import { MedlemskapSøknadsdata } from '../../types/Søknadsdata';
import { toMedlemskapFormValues, toMedlemskapSøknadsdata } from './medlemskapStegUtils';

export enum MedlemskapFormFields {
    erMedlemIFolketrygden = 'erMedlemIFolketrygden',
}

export interface MedlemskapFormValues extends StepFormValues {
    [MedlemskapFormFields.erMedlemIFolketrygden]?: YesOrNo;
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
            <YesOrNoQuestion
                name={MedlemskapFormFields.erMedlemIFolketrygden}
                legend="Er du medlem i folketrygden?"
                validate={validateField(MedlemskapFormFields.erMedlemIFolketrygden, getYesOrNoValidator())}
            />
        </AppForm>
    );
};
