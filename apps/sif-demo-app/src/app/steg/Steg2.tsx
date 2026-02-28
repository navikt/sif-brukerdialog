import { Alert, Button, Heading, HStack, TextField, VStack } from '@navikt/ds-react';
import { useState } from 'react';

import { useStegTilgang } from '@rammeverk/guards';
import { useSteg, useStegNavigasjon } from '@rammeverk/state';

import { DemoSøknadsdata, StegId, stegConfig, stegRekkefølge } from '../config/stegConfig';

interface Steg2Skjemadata {
    epost: string;
}

export const Steg2 = () => {
    const { erTilgjengelig } = useStegTilgang({
        stegId: StegId.KONTAKT,
        stegConfig,
        stegRekkefølge,
    });

    const { søknadsdata, submitSøknadsdata } = useSteg<DemoSøknadsdata>();
    const { gåTilNeste, gåTilForrige } = useStegNavigasjon({ stegConfig, stegRekkefølge });

    const [epost, setEpost] = useState<Steg2Skjemadata['epost']>(søknadsdata[StegId.KONTAKT]?.epost ?? '');

    if (!erTilgjengelig) {
        return <Alert variant="warning">Du kan ikke gå til dette steget ennå.</Alert>;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitSøknadsdata({ [StegId.KONTAKT]: { epost } });
        gåTilNeste();
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack gap="space-4">
                <Heading size="large">Steg 2: Kontaktinfo</Heading>
                <TextField label="E-post" type="email" value={epost} onChange={(e) => setEpost(e.target.value)} />
                <HStack gap="space-4">
                    <Button type="button" variant="secondary" onClick={gåTilForrige}>
                        Forrige
                    </Button>
                    <Button type="submit">Neste</Button>
                </HStack>
            </VStack>
        </form>
    );
};
