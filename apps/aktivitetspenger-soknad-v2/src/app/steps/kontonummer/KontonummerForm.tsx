import { SøknadStepId } from '@app/setup/config/søknadStepConfig';
import { useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/søknad/AppForm';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { StepFormValues } from '@sif/soknad/types';

import { KontonummerSøknadsdata } from '../../types/Søknadsdata';
import { toKontonummerFormValues, toKontonummerSøknadsdata } from './kontonummerStegUtils';

export enum KontonummerFormFields {
    harKontonummer = 'harKontonummer',
}

export interface KontonummerFormValues extends StepFormValues {
    [KontonummerFormFields.harKontonummer]?: YesOrNo;
}

const { YesOrNoQuestion } = createSifFormComponents<KontonummerFormValues>();

const stepId = SøknadStepId.KONTONUMMER;

export const KontonummerForm = () => {
    const { validateField } = useSifValidate();

    const defaultValues = useStepDefaultValues<KontonummerFormValues, KontonummerSøknadsdata>({
        stepId,
        toFormValues: toKontonummerFormValues,
    });

    const { onSubmit, isPending } = useStepSubmit<KontonummerFormValues, KontonummerSøknadsdata>({
        stepId,
        toSøknadsdata: toKontonummerSøknadsdata,
    });

    const methods = useSøknadRhfForm(stepId, defaultValues);

    return (
        <AppForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={isPending}>
            <YesOrNoQuestion
                name={KontonummerFormFields.harKontonummer}
                legend="Har du et kontonummer?"
                validate={validateField(KontonummerFormFields.harKontonummer, getYesOrNoValidator())}
            />
        </AppForm>
    );
};
