import { Button, Heading, HStack, TextField, VStack } from '@navikt/ds-react';
import { useForm } from 'react-hook-form';

import { SøknadFooter } from '@rammeverk/components';
import { useStegNavigasjon } from '@rammeverk/state';

import { useFormSubmitGuard } from '../components/FormSubmitGuard';
import { StegId, stegConfig, stegRekkefølge } from '../config/stegConfig';
import { useAvbrytSøknad } from '../hooks/useAvbrytSøknad';
import { useStegStatus } from '../hooks/useStegStatus';
import { useSøknadStore } from '../hooks/useSøknadStore';

interface Skjemadata {
    epost: string;
}

export const KontaktinfoSteg = () => {
    const stegId = StegId.KONTAKT;

    const appState = useSøknadStore((s) => s.søknadState);
    const submitSteg = useSøknadStore((s) => s.submitSteg);
    const setCurrentSteg = useSøknadStore((s) => s.setCurrentSteg);
    const avbrytSøknad = useAvbrytSøknad();

    const stegStatus = useStegStatus();
    const { gåTilNeste, gåTilForrige, kanGåTilForrige } = useStegNavigasjon({
        stegConfig,
        stegRekkefølge,
        stegStatus,
        setCurrentSteg,
    });

    const { register, handleSubmit, getValues } = useForm<Skjemadata>({
        defaultValues: {
            epost: appState?.søknadsdata[stegId]?.epost ?? '',
        },
    });

    const { FormSubmitGuardInfo, clearFormValues } = useFormSubmitGuard({ stegId, getValues: () => getValues() });

    const onSubmit = (data: Skjemadata) => {
        submitSteg(
            { [stegId]: { epost: data.epost } },
            {
                onSuccess: () => {
                    clearFormValues();
                    gåTilNeste(stegId);
                },
            },
        );
    };

    return (
        <VStack gap="space-24">
            <FormSubmitGuardInfo />
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap="space-16">
                    <Heading size="large">Kontaktinfo</Heading>
                    <TextField label="E-post" type="email" {...register('epost')} />
                    <HStack gap="space-16" justify="start">
                        {kanGåTilForrige(stegId) && (
                            <Button type="button" variant="secondary" onClick={() => gåTilForrige(stegId)}>
                                Forrige
                            </Button>
                        )}
                        <Button type="submit">Neste</Button>
                    </HStack>
                </VStack>
            </form>
            <SøknadFooter onAvbryt={avbrytSøknad} />
        </VStack>
    );
};
