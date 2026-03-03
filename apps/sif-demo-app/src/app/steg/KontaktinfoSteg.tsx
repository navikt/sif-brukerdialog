import { Button, Heading, HStack, TextField, VStack } from '@navikt/ds-react';
import { useState } from 'react';

import { SøknadFooter } from '@rammeverk/components';
import { useStegNavigasjon } from '@rammeverk/state';

import { StegId, stegConfig, stegRekkefølge } from '../config/stegConfig';
import { useAvbrytSøknad } from '../hooks/useAvbrytSøknad';
import { useStegStatus } from '../hooks/useStegStatus';
import { useSøknadStore } from '../hooks/useSøknadStore';

interface Skjemadata {
    epost: string;
}

export const KontaktinfoSteg = () => {
    const stegId = StegId.KONTAKT;

    const appState = useSøknadStore((s) => s.søknadState);
    const submitSteg = useSøknadStore((s) => s.submitSteg);
    const avbrytSøknad = useAvbrytSøknad();

    const stegStatus = useStegStatus();
    const { gåTilNeste, gåTilForrige, kanGåTilForrige } = useStegNavigasjon({ stegConfig, stegRekkefølge, stegStatus });

    const [epost, setEpost] = useState<Skjemadata['epost']>(appState?.søknadsdata[stegId]?.epost ?? '');

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        submitSteg({ [stegId]: { epost } }, { onSuccess: () => gåTilNeste(stegId) });
    };

    return (
        <VStack gap="space-24">
            <form onSubmit={handleSubmit}>
                <VStack gap="space-16">
                    <Heading size="large">Kontaktinfo</Heading>
                    <TextField label="E-post" type="email" value={epost} onChange={(e) => setEpost(e.target.value)} />
                    <HStack gap="space-16" justify="start">
                        {kanGåTilForrige(stegId) && (
                            <Button type="button" variant="secondary" onClick={() => gåTilForrige(stegId)}>
                                Forrige
                            </Button>
                        )}
                        <Button type="submit">Neste</Button>
                    </HStack>
                </VStack>
            </form>
            <SøknadFooter avbrytCallback={avbrytSøknad} />
        </VStack>
    );
};
