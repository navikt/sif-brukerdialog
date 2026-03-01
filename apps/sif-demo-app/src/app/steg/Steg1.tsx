import { Alert, Button, Heading, TextField, VStack } from '@navikt/ds-react';
import { useState } from 'react';

import { SøknadFooter } from '@rammeverk/components';
import { useStegTilgang } from '@rammeverk/guards';
import { useStegNavigasjon } from '@rammeverk/state';

import { StegId, stegConfig, stegRekkefølge } from '../config/stegConfig';
import { useSøknadState } from '../hooks/useSøknadState';

interface Steg1Skjemadata {
    navn: string;
}

export const Steg1 = () => {
    const søknadsdata = useSøknadState((s) => s.søknadsdata);
    const submitSteg = useSøknadState((s) => s.submitSteg);
    const erStegFullført = useSøknadState((s) => s.erStegFullført);

    const stegStatus = { erFullført: erStegFullført };

    const { erTilgjengelig } = useStegTilgang({
        stegId: StegId.PERSONALIA,
        stegRekkefølge,
        stegStatus,
    });

    const { gåTilNeste } = useStegNavigasjon({ stegConfig, stegRekkefølge, stegStatus });

    const [navn, setNavn] = useState<Steg1Skjemadata['navn']>(søknadsdata?.stegData[StegId.PERSONALIA]?.navn ?? '');

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
            <SøknadFooter avbrytCallback={useSøknadState.getState().reset} />
        </VStack>
    );
};
