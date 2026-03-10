import { Radio, RadioGroup } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { StepFormValues } from '@rammeverk/types';
import { DefaultValues } from 'react-hook-form';

import { SøknadFormButtons } from '../../setup/søknad-form-buttons/SøknadFormButtons';
import { SøknadStepId } from '../../config/søknadStepConfig';
import { useSøknadForm } from '../../hooks/useSøknadForm';

export enum BostedFormFields {
    borITrondheim = 'borITrondheim',
}

export interface BostedFormValues extends StepFormValues {
    [BostedFormFields.borITrondheim]?: 'ja' | 'nei';
}

interface Props {
    stepId: SøknadStepId;
    isPending: boolean;
    defaultValues: DefaultValues<BostedFormValues>;
    onSubmit: (data: BostedFormValues) => void;
}

export const BostedForm = ({ stepId, isPending, defaultValues, onSubmit }: Props) => {
    const { handleSubmit, setValue, watch } = useSøknadForm(stepId, defaultValues);

    const borITrondheim = watch(BostedFormFields.borITrondheim);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormLayout.Content>
                <RadioGroup
                    legend="Bor du i Trondheim"
                    onChange={(value) => setValue(BostedFormFields.borITrondheim, value)}
                    value={borITrondheim}>
                    <Radio value="ja">Ja</Radio>
                    <Radio value="nei">Nei</Radio>
                </RadioGroup>
                <SøknadFormButtons stepId={stepId} isPending={isPending} />
            </FormLayout.Content>
        </form>
    );
};
