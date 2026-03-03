import { Button, Heading, HStack, TextField, VStack } from '@navikt/ds-react';
import { useForm } from 'react-hook-form';

import { SøknadFooter } from '@rammeverk/components';
import { useStegNavigasjon } from '@rammeverk/state';

import { useStegValidering } from '../components/StegValidering';
import { StegId, stegConfig, stegRekkefølge } from '../config/stegConfig';
import { useAvbrytSøknad } from '../hooks/useAvbrytSøknad';
import { useStegStatus } from '../hooks/useStegStatus';
import { useSøknadStore } from '../hooks/useSøknadStore';

interface Skjemadata {
    navn: string;
}

export const KjæledyrSteg = () => {
    const stegId = StegId.KJÆLEDYR;

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
            navn: appState?.søknadsdata[stegId]?.navn ?? '',
        },
    });

    const { StegValideringInfo, clearFormValues } = useStegValidering({ stegId, getValues: () => getValues() });

    const onSubmit = (data: Skjemadata) => {
        if (!data.navn) {
            alert('Vennligst fyll ut alle feltene før du går videre.');
            return;
        }
        submitSteg(
            { [stegId]: { navn: data.navn } },
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
            <StegValideringInfo />
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap="space-16">
                    <Heading size="large">Navn på kjæledyr</Heading>
                    <TextField label="Navn" {...register('navn')} />

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
