import { Radio, RadioGroup } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { useSaveFormValuesForSøknadStep } from '@rammeverk/consistency';
import { StepFormValues } from '@rammeverk/state';
import { DefaultValues, useForm } from 'react-hook-form';

import { SøknadStepId } from '../../config/søknadStepConfig';

export enum BostedFormFields {
    borITrondheim = 'borITrondheim',
}

export interface BostedFormValues extends StepFormValues {
    [BostedFormFields.borITrondheim]?: 'ja' | 'nei';
}

interface Props {
    defaultValues: DefaultValues<BostedFormValues>;
    onSubmit: (data: BostedFormValues) => void;
    isPending: boolean;
    onPrevious?: () => void;
}

export const BostedForm = ({ defaultValues, isPending, onSubmit, onPrevious }: Props) => {
    const { handleSubmit, getValues, setValue, watch } = useForm<BostedFormValues>({
        defaultValues,
    });

    useSaveFormValuesForSøknadStep(SøknadStepId.BOSTED, () => getValues());

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
                <FormLayout.FormButtons submitPending={isPending} onPrevious={onPrevious} />
            </FormLayout.Content>
        </form>
    );
};
