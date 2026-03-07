import { Alert, Radio, RadioGroup } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { useSaveFormValuesForSøknadStep } from '@rammeverk/consistency';
import { StepFormValues } from '@rammeverk/state';
import { DefaultValues, useForm } from 'react-hook-form';

import { SøknadStepId } from '../../config/søknadStepConfig';

export enum BarnFormFields {
    stemmerInfoOmBarn = 'stemmerInfoOmBarn',
}

export interface BarnFormValues extends StepFormValues {
    [BarnFormFields.stemmerInfoOmBarn]: 'ja' | 'nei';
}

interface Props {
    defaultValues: DefaultValues<BarnFormValues>;
    isPending: boolean;
    onPrevious?: () => void;
    onSubmit: (data: BarnFormValues) => void;
}

export const BarnForm = ({ isPending, defaultValues, onSubmit, onPrevious }: Props) => {
    const { setValue, handleSubmit, watch, getValues } = useForm<BarnFormValues>({
        defaultValues,
    });

    useSaveFormValuesForSøknadStep(SøknadStepId.BARN, () => getValues());

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
                <FormLayout.FormButtons submitPending={isPending} onPrevious={onPrevious} />
            </FormLayout.Content>
        </form>
    );
};
