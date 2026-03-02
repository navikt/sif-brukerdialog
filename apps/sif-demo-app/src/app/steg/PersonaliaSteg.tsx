import { Alert, Button, Heading, Radio, RadioGroup, TextField, VStack } from '@navikt/ds-react';
import { useState } from 'react';

import { SøknadFooter } from '@rammeverk/components';
import { useStegTilgang } from '@rammeverk/guards';
import { useStegNavigasjon } from '@rammeverk/state';

import { StegId, stegConfig, stegRekkefølge } from '../config/stegConfig';
import { useAvbrytSøknadHandler } from '../hooks/useAvbrytSøknadHandler';
import { useSøknadStore } from '../hooks/useSøknadStore';

interface Skjemadata {
    navn: string;
    harKjæledyr?: 'ja' | 'nei';
}

export const PersonaliaSteg = () => {
    const stegId = StegId.PERSONALIA;
    const appState = useSøknadStore((s) => s.søknadState);
    const submitSteg = useSøknadStore((s) => s.submitSteg);
    const erStegFullført = useSøknadStore((s) => s.erStegFullført);
    const { avbrytHandler } = useAvbrytSøknadHandler();

    const stegStatus = { erFullført: erStegFullført };

    const { erTilgjengelig } = useStegTilgang({
        stegId,
        stegRekkefølge,
        stegStatus,
    });

    const { gåTilNeste } = useStegNavigasjon({ stegConfig, stegRekkefølge, stegStatus });

    const [navn, setNavn] = useState<Skjemadata['navn']>(appState?.søknadsdata[stegId]?.navn ?? '');
    const [harKjæledyr, setHarKjæledyr] = useState<Skjemadata['harKjæledyr']>(
        appState?.søknadsdata[stegId]?.harKjæledyr,
    );

    if (!erTilgjengelig) {
        return <Alert variant="warning">Du kan ikke gå til dette steget ennå.</Alert>;
    }

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        if (!navn || !harKjæledyr) {
            alert('Vennligst fyll ut alle feltene før du går videre.');
            return;
        }
        submitSteg({ [stegId]: { navn, harKjæledyr } });
        gåTilNeste();
    };

    return (
        <VStack gap="space-24">
            <form onSubmit={handleSubmit}>
                <VStack gap="space-16">
                    <Heading size="large">Personalia</Heading>
                    <TextField label="Navn" value={navn} onChange={(e) => setNavn(e.target.value)} />
                    <RadioGroup
                        legend="Har du kjæledyr?"
                        value={harKjæledyr}
                        onChange={(value) => {
                            setHarKjæledyr(value);
                        }}>
                        <Radio value="ja">Ja</Radio>
                        <Radio value="nei">Nei</Radio>
                    </RadioGroup>
                    <div>
                        <Button type="submit">Neste</Button>
                    </div>
                </VStack>
            </form>
            <SøknadFooter avbrytCallback={avbrytHandler} />
        </VStack>
    );
};
