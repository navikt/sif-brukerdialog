import { Alert, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';

import { SøknadFooter } from '@rammeverk/components';
import { useStegTilgang } from '@rammeverk/guards';
import { useSøknadState, useStegNavigasjon } from '@rammeverk/state';

import { DemoSøknadsdata, StegId, stegConfig, stegRekkefølge } from '../config/stegConfig';

export const Oppsummering = () => {
    const { erTilgjengelig } = useStegTilgang({
        stegId: StegId.OPPSUMMERING,
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
        console.log('Sender inn søknad:', søknadsdata);
        setSøknadSendt();
        navigate('/kvittering');
    };

    return (
        <VStack gap="space-24">
            <VStack gap="space-16">
                <Heading size="large">Oppsummering</Heading>
                <Alert variant="info">
                    <VStack gap="space-2">
                        <p>
                            <strong>Navn:</strong> {søknadsdata[StegId.PERSONALIA]?.navn}
                        </p>
                        <p>
                            <strong>E-post:</strong> {søknadsdata[StegId.KONTAKT]?.epost}
                        </p>
                    </VStack>
                </Alert>
                <HStack gap="space-16" justify={'start'}>
                    <Button type="button" variant="secondary" onClick={gåTilForrige}>
                        Forrige
                    </Button>
                    <Button type="button" onClick={handleSendInn}>
                        Send inn søknad
                    </Button>
                </HStack>
            </VStack>
            <SøknadFooter />
        </VStack>
    );
};
