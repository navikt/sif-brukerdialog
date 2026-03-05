import { Radio, RadioGroup, TextField } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { usePersistStepFormValues } from '@rammeverk/hooks';
import { DefaultValues, useForm } from 'react-hook-form';

import { SøknadStepId } from '../../config/søknadStepConfig';

export interface PersonaliaSkjemadata {
    navn: string;
    harHobby?: 'ja' | 'nei';
}

interface Props {
    defaultValues: DefaultValues<PersonaliaSkjemadata>;
    isPending: boolean;
    onSubmit: (data: PersonaliaSkjemadata) => void;
}

export const PersonaliaForm = ({ isPending, defaultValues, onSubmit }: Props) => {
    const { register, handleSubmit, watch, setValue, getValues } = useForm<PersonaliaSkjemadata>({
        defaultValues,
    });

    usePersistStepFormValues(SøknadStepId.PERSONALIA, () => getValues());

    const harHobby = watch('harHobby');

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormLayout.Content>
                <FormLayout.Questions>
                    <TextField label="Navn" {...register('navn')} />
                    <RadioGroup
                        legend="Har du hobby?"
                        value={harHobby}
                        onChange={(value) => setValue('harHobby', value)}>
                        <Radio value="ja">Ja</Radio>
                        <Radio value="nei">Nei</Radio>
                    </RadioGroup>
                </FormLayout.Questions>
                <FormLayout.FormButtons submitPending={isPending} />
            </FormLayout.Content>
        </form>
    );
};
