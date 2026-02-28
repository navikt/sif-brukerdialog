import { Alert, Button, Heading, TextField, VStack } from '@navikt/ds-react';
import { useState } from 'react';

import { useStegTilgang } from '@rammeverk/guards';
import { useSteg, useStegNavigasjon } from '@rammeverk/state';

import { DemoSøknadsdata, Steg1Skjemadata, stegConfig, stegRekkefølge } from '../config/stegConfig';

export const Steg1 = () => {
    const { erTilgjengelig } = useStegTilgang({
        stegId: 'steg1',
        stegConfig,
        stegRekkefølge,
    });

    const { initialData, onSkjemadataChange, onStegSubmit } = useSteg<DemoSøknadsdata, Steg1Skjemadata>({
        stegId: 'steg1',
        stegConfig,
    });

    const { gåTilNeste } = useStegNavigasjon({ stegConfig, stegRekkefølge });

    const [navn, setNavn] = useState(initialData.navn);

    if (!erTilgjengelig) {
        return <Alert variant="warning">Du kan ikke gå til dette steget ennå.</Alert>;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onStegSubmit({ navn });
        gåTilNeste();
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack gap="space-4">
                <Heading size="large">Steg 1: Personalia</Heading>
                <TextField
                    label="Navn"
                    value={navn}
                    onChange={(e) => {
                        setNavn(e.target.value);
                        onSkjemadataChange({ navn: e.target.value });
                    }}
                />
                <Button type="submit">Neste</Button>
            </VStack>
        </form>
    );
};
