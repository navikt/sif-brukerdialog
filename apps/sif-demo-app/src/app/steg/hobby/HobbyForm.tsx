import { Button, HStack, TextField, VStack } from '@navikt/ds-react';
import { DefaultValues, useForm } from 'react-hook-form';
import { usePersistStepFormValues } from '@rammeverk/hooks';
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

const HobbyForm = ({ defaultValues, onSubmit, isPending, onPrevious }: Props) => {
    const { register, handleSubmit, getValues } = useForm<HobbySkjemadata>({
        defaultValues,
    });

    usePersistStepFormValues(SøknadStepId.HOBBY, () => getValues());

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap="space-16">
                <TextField label="Navn" {...register('navn')} />

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

export default HobbyForm;
