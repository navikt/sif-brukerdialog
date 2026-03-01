import { Alert, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';

import { SøknadFooter } from '@rammeverk/components';
import { useStegTilgang } from '@rammeverk/guards';
import { useSøknadFlyt, useStegNavigasjon } from '@rammeverk/state';

import { StegId, stegConfig, stegRekkefølge } from '../config/stegConfig';
import { useSøknadState } from '../hooks/useSøknadState';

export const Oppsummering = () => {
    const søknadsdata = useSøknadState((s) => s.søknadsdata);
    const erStegFullført = useSøknadState((s) => s.erStegFullført);
    const resetSøknadsdata = useSøknadState((s) => s.reset);

    const stegStatus = { erFullført: erStegFullført };

    const { erTilgjengelig } = useStegTilgang({
        stegId: StegId.OPPSUMMERING,
        stegRekkefølge,
        stegStatus,
    });

    const navigate = useNavigate();
    const setSøknadSendt = useSøknadFlyt((s) => s.setSøknadSendt);

    const { gåTilForrige } = useStegNavigasjon({ stegConfig, stegRekkefølge, stegStatus });

    if (!erTilgjengelig) {
        return <Alert variant="warning">Du kan ikke gå til dette steget ennå.</Alert>;
    }

    const handleSubmit = (evt: React.SubmitEvent<HTMLFormElement>) => {
        evt.preventDefault();
        console.log('Sender inn søknad:', søknadsdata);
        setSøknadSendt();
        resetSøknadsdata();
        navigate('/kvittering');
    };

    return (
        <VStack gap="space-24">
            <VStack gap="space-16">
                <Heading size="large">Oppsummering</Heading>
                <Alert variant="info">
                    <VStack gap="space-2">
                        <p>
                            <strong>Navn:</strong> {søknadsdata?.stegData[StegId.PERSONALIA]?.navn}
                        </p>
                        <p>
                            <strong>E-post:</strong> {søknadsdata?.stegData[StegId.KONTAKT]?.epost}
                        </p>
                    </VStack>
                </Alert>
                <form onSubmit={handleSubmit}>
                    <HStack gap="space-16" justify={'start'}>
                        <Button type="button" variant="secondary" onClick={gåTilForrige}>
                            Forrige
                        </Button>
                        <Button type="submit">Send inn søknad</Button>
                    </HStack>
                </form>
            </VStack>
            <SøknadFooter avbrytCallback={resetSøknadsdata} />
        </VStack>
    );
};
