import { Button, Heading, HStack, TextField, VStack } from '@navikt/ds-react';
import { useState } from 'react';

import { SøknadFooter } from '@rammeverk/components';
import { useStegNavigasjon } from '@rammeverk/state';

import { StegId, stegConfig, stegRekkefølge } from '../config/stegConfig';
import { useAvbrytSøknadHandler } from '../hooks/useAvbrytSøknadHandler';
import { useStegStatus } from '../hooks/useStegStatus';
import { useSøknadStore } from '../hooks/useSøknadStore';

interface Skjemadata {
    navn: string;
}

export const KjæledyrSteg = () => {
    const stegId = StegId.KJÆLEDYR;

    const appState = useSøknadStore((s) => s.søknadState);
    const submitSteg = useSøknadStore((s) => s.submitSteg);
    const { avbrytHandler } = useAvbrytSøknadHandler();

    const stegStatus = useStegStatus();
    const { gåTilNeste, gåTilForrige } = useStegNavigasjon({ stegConfig, stegRekkefølge, stegStatus });

    const [navn, setNavn] = useState<Skjemadata['navn']>(appState?.søknadsdata[stegId]?.navn ?? '');

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        if (!navn) {
            alert('Vennligst fyll ut alle feltene før du går videre.');
            return;
        }
        submitSteg({ [stegId]: { navn } }, { onSuccess: gåTilNeste });
    };

    return (
        <VStack gap="space-24">
            <form onSubmit={handleSubmit}>
                <VStack gap="space-16">
                    <Heading size="large">Navn på kjæledyr</Heading>
                    <TextField label="Navn" value={navn} onChange={(e) => setNavn(e.target.value)} />

                    <HStack gap="space-16" justify="start">
                        <Button type="button" variant="secondary" onClick={gåTilForrige}>
                            Forrige
                        </Button>
                        <Button type="submit">Neste</Button>
                    </HStack>
                </VStack>
            </form>
            <SøknadFooter avbrytCallback={avbrytHandler} />
        </VStack>
    );
};
