import { useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/søknad/AppForm';
import { SøknadStepId } from '@app/setup/søknad/søknadStepConfig';
import { Alert } from '@navikt/ds-react';
import { getRequiredFieldValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { StepFormValues } from '@sif/soknad/types';

import { BarnSøknadsdata } from '../../types/Søknadsdata';
import { toBarnFormValues, toBarnSøknadsdata } from './barnStegUtils';

export enum BarnFormFields {
    stemmerInfoOmBarn = 'stemmerInfoOmBarn',
}

export interface BarnFormValues extends StepFormValues {
    [BarnFormFields.stemmerInfoOmBarn]: 'ja' | 'nei';
}

const { RadioGroup } = createSifFormComponents<BarnFormValues>();

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
            <Alert variant="info">TODO</Alert>
            <RadioGroup
                name={BarnFormFields.stemmerInfoOmBarn}
                legend="Stemmer informasjonen om barn?"
                radios={[
                    { label: 'Ja', value: 'ja' },
                    { label: 'Nei', value: 'nei' },
                ]}
                validate={validateField(BarnFormFields.stemmerInfoOmBarn, getRequiredFieldValidator())}
            />
        </AppForm>
    );
};
