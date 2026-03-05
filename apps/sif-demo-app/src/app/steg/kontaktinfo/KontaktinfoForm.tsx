import { Button, HStack, TextField, VStack } from '@navikt/ds-react';
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

const KontaktinfoForm = ({ defaultValues, onSubmit, isPending, onPrevious }: Props) => {
    const { register, handleSubmit, getValues } = useForm<KontaktSkjemadata>({
        defaultValues,
    });

    usePersistStepFormValues(SøknadStepId.KONTAKT, () => getValues());

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap="space-16">
                <TextField label="E-post" type="email" {...register('epost')} />
                <HStack gap="space-16" justify="start">
                    {onPrevious && (
                        <Button type="button" variant="secondary" onClick={onPrevious}>
                            Forrige
                        </Button>
                    )}
                    <Button type="submit" disabled={isPending} loading={isPending}>
                        Neste
                    </Button>
                </HStack>
            </VStack>
        </form>
    );
};

export default KontaktinfoForm;
