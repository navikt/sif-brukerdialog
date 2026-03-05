import { TextField } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { usePersistStepFormValues } from '@rammeverk/hooks';
import { DefaultValues, useForm } from 'react-hook-form';

import { SøknadStepId } from '../../config/søknadStepConfig';

export interface KontaktSkjemadata {
    epost: string;
}

interface Props {
    defaultValues: DefaultValues<KontaktSkjemadata>;
    onSubmit: (data: KontaktSkjemadata) => void;
    isPending: boolean;
    onPrevious?: () => void;
}

export const KontaktinfoForm = ({ defaultValues, onSubmit, isPending, onPrevious }: Props) => {
    const { register, handleSubmit, getValues } = useForm<KontaktSkjemadata>({
        defaultValues,
    });

    usePersistStepFormValues(SøknadStepId.KONTAKT, () => getValues());

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormLayout.Content>
                <FormLayout.Questions>
                    <TextField label="E-post" type="email" {...register('epost')} />
                </FormLayout.Questions>
                <FormLayout.FormButtons
                    back={
                        onPrevious && {
                            label: 'Forrige',
                            onClick: onPrevious,
                        }
                    }
                    next={{
                        label: 'Neste',
                        onClick: () => handleSubmit(onSubmit)(),
                        disabled: isPending,
                        pending: isPending,
                    }}
                />
            </FormLayout.Content>
        </form>
    );
};
