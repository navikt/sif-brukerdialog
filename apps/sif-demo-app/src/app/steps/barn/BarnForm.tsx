import { useSøknadForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { SøknadFormButtons } from '@app/setup/søknad/SøknadFormButtons';
import { SøknadStepId } from '@app/setup/søknad/søknadStepConfig';
import { Alert } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { getRequiredFieldValidator } from '@navikt/sif-validation';
import { StepFormValues } from '@sif/soknad/types';

import { createSifFormComponents, SifForm, useSifValidate } from '../../../sif-rhf';
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

    const methods = useSøknadForm(stepId, defaultValues);

    return (
        <SifForm
            methods={methods}
            onSubmit={onSubmit}
            buttons={<SøknadFormButtons stepId={stepId} isPending={isPending} />}>
            <FormLayout.Content>
                <FormLayout.Questions>
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
                </FormLayout.Questions>
            </FormLayout.Content>
        </SifForm>
    );
};
