import { Alert, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';

import { useStegTilgang } from '@rammeverk/guards';
import { useSøknadState, useStegNavigasjon } from '@rammeverk/state';

import { DemoSøknadsdata, stegConfig, stegRekkefølge } from '../config/stegConfig';

export const Oppsummering = () => {
    const { erTilgjengelig } = useStegTilgang({
        stegId: 'oppsummering',
        stegConfig,
        stegRekkefølge,
    });

    const navigate = useNavigate();
    const søknadsdata = useSøknadState((s) => s.søknadsdata) as Partial<DemoSøknadsdata>;
    const setSøknadSendt = useSøknadState((s) => s.setSøknadSendt);

    const { gåTilForrige } = useStegNavigasjon({ stegConfig, stegRekkefølge });

    if (!erTilgjengelig) {
        return <Alert variant="warning">Du kan ikke gå til dette steget ennå.</Alert>;
    }

    const handleSendInn = () => {
        // Her ville du normalt kalt API
        console.log('Sender inn søknad:', søknadsdata);
        setSøknadSendt();
        navigate('/kvittering');
    };

    return (
        <VStack gap="space-4">
            <Heading size="large">Oppsummering</Heading>
            <Alert variant="info">
                <VStack gap="space-2">
                    <p>
                        <strong>Navn:</strong> {søknadsdata.steg1?.navn}
                    </p>
                    <p>
                        <strong>E-post:</strong> {søknadsdata.steg2?.epost}
                    </p>
                </VStack>
            </Alert>
            <HStack gap="space-4">
                <Button type="button" variant="secondary" onClick={gåTilForrige}>
                    Forrige
                </Button>
                <Button type="button" onClick={handleSendInn}>
                    Send inn søknad
                </Button>
            </HStack>
        </VStack>
    );
};
