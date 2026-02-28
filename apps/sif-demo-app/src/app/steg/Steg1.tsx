import { Alert, Button, Heading, TextField, VStack } from '@navikt/ds-react';
import { useState } from 'react';

import { SøknadFooter } from '@rammeverk/components';
import { useStegTilgang } from '@rammeverk/guards';
import { useSteg, useStegNavigasjon } from '@rammeverk/state';

import { DemoSøknadsdata, StegId, stegConfig, stegRekkefølge } from '../config/stegConfig';

interface Steg1Skjemadata {
    navn: string;
}

export const Steg1 = () => {
    const { erTilgjengelig } = useStegTilgang({
        stegId: StegId.PERSONALIA,
        stegConfig,
        stegRekkefølge,
    });

    const { søknadsdata, submitSøknadsdata } = useSteg<DemoSøknadsdata>();
    const { gåTilNeste } = useStegNavigasjon({ stegConfig, stegRekkefølge });

    const [navn, setNavn] = useState<Steg1Skjemadata['navn']>(søknadsdata[StegId.PERSONALIA]?.navn ?? '');

    if (!erTilgjengelig) {
        return <Alert variant="warning">Du kan ikke gå til dette steget ennå.</Alert>;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitSøknadsdata({ [StegId.PERSONALIA]: { navn } });
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
            <SøknadFooter />
        </VStack>
    );
};
