import { Alert, Button, Heading, HStack, TextField, VStack } from '@navikt/ds-react';
import { useState } from 'react';

import { useStegTilgang } from '@rammeverk/guards';
import { useSteg, useStegNavigasjon } from '@rammeverk/state';

import { DemoSøknadsdata, Steg2Skjemadata, stegConfig, stegRekkefølge } from '../config/stegConfig';

export const Steg2 = () => {
    const { erTilgjengelig } = useStegTilgang({
        stegId: 'steg2',
        stegConfig,
        stegRekkefølge,
    });

    const { initialData, onSkjemadataChange, onStegSubmit } = useSteg<DemoSøknadsdata, Steg2Skjemadata>({
        stegId: 'steg2',
        stegConfig,
    });

    const { gåTilNeste, gåTilForrige } = useStegNavigasjon({ stegConfig, stegRekkefølge });

    const [epost, setEpost] = useState(initialData.epost);

    if (!erTilgjengelig) {
        return <Alert variant="warning">Du kan ikke gå til dette steget ennå.</Alert>;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onStegSubmit({ epost });
        gåTilNeste();
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack gap="space-4">
                <Heading size="large">Steg 2: Kontaktinfo</Heading>
                <TextField
                    label="E-post"
                    type="email"
                    value={epost}
                    onChange={(e) => {
                        setEpost(e.target.value);
                        onSkjemadataChange({ epost: e.target.value });
                    }}
                />
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
