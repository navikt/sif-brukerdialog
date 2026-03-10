import { Alert, Radio, RadioGroup } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { StepFormValues } from '@rammeverk/types';

import { SøknadStepId } from '../../config/søknadStepConfig';
import { useSøknadForm } from '../../hooks/useSøknadForm';
import { useStepDefaultValues } from '../../hooks/useStepDefaultValues';
import { useStepSubmit } from '../../hooks/useStepSubmit';
import { SøknadFormButtons } from '../../setup/søknad-form-buttons/SøknadFormButtons';
import { BarnSøknadsdata } from '../../types/Søknadsdata';
import { toBarnFormValues, toBarnSøknadsdata } from './barnStegUtils';

export enum BarnFormFields {
    stemmerInfoOmBarn = 'stemmerInfoOmBarn',
}

export interface BarnFormValues extends StepFormValues {
    [BarnFormFields.stemmerInfoOmBarn]: 'ja' | 'nei';
}

const stepId = SøknadStepId.BARN;

export const BarnForm = () => {
    const defaultValues = useStepDefaultValues<BarnFormValues, BarnSøknadsdata>({
        stepId,
        toFormValues: toBarnFormValues,
    });

    const { onSubmit, isPending } = useStepSubmit<BarnFormValues, BarnSøknadsdata>({
        stepId,
        toSøknadsdata: toBarnSøknadsdata,
    });

    const { setValue, handleSubmit, watch } = useSøknadForm(stepId, defaultValues);

    const stemmerInfoOmBarn = watch(BarnFormFields.stemmerInfoOmBarn);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormLayout.Content>
                <FormLayout.Questions>
                    <Alert variant="info">TODO</Alert>
                    <RadioGroup
                        legend="Stemmer informasjonen om barn?"
                        onChange={(value) => setValue(BarnFormFields.stemmerInfoOmBarn, value)}
                        value={stemmerInfoOmBarn}>
                        <Radio value="ja">Ja</Radio>
                        <Radio value="nei">Nei</Radio>
                    </RadioGroup>
                </FormLayout.Questions>
                <SøknadFormButtons stepId={stepId} isPending={isPending} />
            </FormLayout.Content>
        </form>
    );
};
