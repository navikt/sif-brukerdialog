import { Radio, RadioGroup } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { usePersistStepFormValues } from '@rammeverk/hooks';
import { FormValues } from '@rammeverk/state/SøknadFormValuesContext';
import { DefaultValues, useForm } from 'react-hook-form';

import { SøknadStepId } from '../../config/søknadStepConfig';

export interface BostedFormValues extends FormValues {
    borITrondheim: 'ja' | 'nei';
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

    usePersistStepFormValues(SøknadStepId.BOSTED, () => getValues());

    const stemmerInfoOmBosted = watch('stemmerInfoOmBosted');

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormLayout.Content>
                <RadioGroup
                    legend="Bor du i Trondheim"
                    onChange={(value) => setValue('stemmerInfoOmBosted', value)}
                    value={stemmerInfoOmBosted}>
                    <Radio value="ja">Ja</Radio>
                    <Radio value="nei">Nei</Radio>
                </RadioGroup>
                <FormLayout.FormButtons submitPending={isPending} onPrevious={onPrevious} />
            </FormLayout.Content>
        </form>
    );
};
