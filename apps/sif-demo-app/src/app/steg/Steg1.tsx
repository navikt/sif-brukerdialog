import { Alert, Button, Heading, TextField, VStack } from '@navikt/ds-react';
import { useState } from 'react';

import { SøknadFooter } from '@rammeverk/components';
import { useStegTilgang } from '@rammeverk/guards';
import { useStegNavigasjon } from '@rammeverk/state';

import { StegId, stegConfig, stegRekkefølge } from '../config/stegConfig';
import { useAppStore } from '../hooks/useAppStore';

interface Steg1Skjemadata {
    navn: string;
}

export const Steg1 = () => {
    const appState = useAppStore((s) => s.appState);
    const submitSteg = useAppStore((s) => s.submitSteg);
    const erStegFullført = useAppStore((s) => s.erStegFullført);

    const stegStatus = { erFullført: erStegFullført };

    const { erTilgjengelig } = useStegTilgang({
        stegId: StegId.PERSONALIA,
        stegRekkefølge,
        stegStatus,
    });

    const { gåTilNeste } = useStegNavigasjon({ stegConfig, stegRekkefølge, stegStatus });

    const [navn, setNavn] = useState<Steg1Skjemadata['navn']>(appState?.søknadsdata[StegId.PERSONALIA]?.navn ?? '');

    if (!erTilgjengelig) {
        return <Alert variant="warning">Du kan ikke gå til dette steget ennå.</Alert>;
    }

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        submitSteg({ [StegId.PERSONALIA]: { navn } });
        gåTilNeste();
    };

    return (
        <VStack gap="space-24">
            <form onSubmit={handleSubmit}>
                <VStack gap="space-16">
                    <Heading size="large">Steg 1: Personalia</Heading>
                    <TextField label="Navn" value={navn} onChange={(e) => setNavn(e.target.value)} />
                    <div>
                        <Button type="submit">Neste</Button>
                    </div>
                </VStack>
            </form>
            <SøknadFooter avbrytCallback={useAppStore.getState().resetSøknad} />
        </VStack>
    );
};
