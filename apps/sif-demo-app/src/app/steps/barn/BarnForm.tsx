import { Alert, Radio, RadioGroup } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { StepFormValues } from '@rammeverk/types';
import { DefaultValues } from 'react-hook-form';

import { SøknadFormButtons } from '../../components/søknad-form-buttons/SøknadFormButtons';
import { SøknadStepId } from '../../config/søknadStepConfig';
import { useSøknadForm } from '../../hooks/useSøknadForm';

export enum BarnFormFields {
    stemmerInfoOmBarn = 'stemmerInfoOmBarn',
}

export interface BarnFormValues extends StepFormValues {
    [BarnFormFields.stemmerInfoOmBarn]: 'ja' | 'nei';
}

interface Props {
    stepId: SøknadStepId;
    isPending: boolean;
    defaultValues: DefaultValues<BarnFormValues>;
    onSubmit: (data: BarnFormValues) => void;
}

export const BarnForm = ({ stepId, isPending, defaultValues, onSubmit }: Props) => {
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
