import { Alert, Button, Heading, HStack, TextField, VStack } from '@navikt/ds-react';
import { useState } from 'react';

import { SøknadFooter } from '@rammeverk/components';
import { useStegTilgang } from '@rammeverk/guards';
import { useStegNavigasjon } from '@rammeverk/state';

import { StegId, stegConfig, stegRekkefølge } from '../config/stegConfig';
import { useAppStore } from '../hooks/useAppStore';

interface Steg2Skjemadata {
    epost: string;
}

export const Steg2 = () => {
    const appState = useAppStore((s) => s.appState);
    const submitSteg = useAppStore((s) => s.submitSteg);
    const erStegFullført = useAppStore((s) => s.erStegFullført);

    const stegStatus = { erFullført: erStegFullført };

    const { erTilgjengelig } = useStegTilgang({
        stegId: StegId.KONTAKT,
        stegRekkefølge,
        stegStatus,
    });

    const { gåTilNeste, gåTilForrige } = useStegNavigasjon({ stegConfig, stegRekkefølge, stegStatus });

    const [epost, setEpost] = useState<Steg2Skjemadata['epost']>(appState?.søknadsdata[StegId.KONTAKT]?.epost ?? '');

    if (!erTilgjengelig) {
        return <Alert variant="warning">Du kan ikke gå til dette steget ennå.</Alert>;
    }

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        submitSteg({ [StegId.KONTAKT]: { epost } });
        gåTilNeste();
    };

    return (
        <VStack gap="space-24">
            <form onSubmit={handleSubmit}>
                <VStack gap="space-16">
                    <Heading size="large">Steg 2: Kontaktinfo</Heading>
                    <TextField label="E-post" type="email" value={epost} onChange={(e) => setEpost(e.target.value)} />
                    <HStack gap="space-16" justify="start">
                        <Button type="button" variant="secondary" onClick={gåTilForrige}>
                            Forrige
                        </Button>
                        <Button type="submit">Neste</Button>
                    </HStack>
                </VStack>
            </form>
            <SøknadFooter avbrytCallback={useAppStore.getState().resetSøknad} />
        </VStack>
    );
};
