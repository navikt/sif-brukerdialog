import { Button, Heading, VStack } from '@navikt/ds-react';

import { stegConfig, stegRekkefølge } from '../config/stegConfig';
import { useSøknadStore } from '../hooks/useSøknadStore';
import { useNavigate } from 'react-router-dom';

export const VelkommenPage = () => {
    const navigate = useNavigate();
    const startSøknad = useSøknadStore((s) => s.startSøknad);

    const handleStart = () => {
        const førsteSteg = stegConfig[stegRekkefølge[0]];
        startSøknad(førsteSteg.id);
        navigate(`/soknad/${førsteSteg.route}`);
    };

    return (
        <VStack gap="space-16">
            <Heading size="xlarge">Velkommen til demo-søknaden</Heading>
            <p>Dette er en demo av soknad-rammeverk.</p>
            <Button onClick={handleStart}>Start søknad</Button>
        </VStack>
    );
};
