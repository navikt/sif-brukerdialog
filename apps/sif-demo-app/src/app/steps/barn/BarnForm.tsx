import { Alert, Radio, RadioGroup } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { usePersistStepFormValues } from '@rammeverk/hooks';
import { DefaultValues, useForm } from 'react-hook-form';

import { SøknadStepId } from '../../config/søknadStepConfig';
import { FormValues } from '../../utils/formValuesToSøknadsdata';

export interface BarnFormValues extends FormValues {
    stemmerInfoOmBarn: 'ja' | 'nei';
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

    usePersistStepFormValues(SøknadStepId.BARN, () => getValues());

    const stemmerInfoOmBarn = watch('stemmerInfoOmBarn');

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormLayout.Content>
                <FormLayout.Questions>
                    <Alert variant="info">TODO</Alert>
                    <RadioGroup
                        legend="Stemmer informasjonen om barn?"
                        onChange={(value) => setValue('stemmerInfoOmBarn', value)}
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
