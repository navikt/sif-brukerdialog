import { TextField } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { usePersistStepFormValues } from '@rammeverk/hooks';
import { DefaultValues, useForm } from 'react-hook-form';

import { SøknadStepId } from '../../config/søknadStepConfig';

export interface HobbySkjemadata {
    navn: string;
}

interface Props {
    defaultValues: DefaultValues<HobbySkjemadata>;
    onSubmit: (data: HobbySkjemadata) => void;
    isPending: boolean;
    onPrevious?: () => void;
}

export const HobbyForm = ({ defaultValues, isPending, onSubmit, onPrevious }: Props) => {
    const { register, handleSubmit, getValues } = useForm<HobbySkjemadata>({
        defaultValues,
    });

    usePersistStepFormValues(SøknadStepId.HOBBY, () => getValues());

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormLayout.Content>
                <FormLayout.Questions>
                    <TextField label="Navn" {...register('navn')} />
                </FormLayout.Questions>
                <FormLayout.FormButtons submitPending={isPending} onPrevious={onPrevious} />
            </FormLayout.Content>
        </form>
    );
};
