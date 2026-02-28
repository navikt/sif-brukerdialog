import { Button, Heading, VStack } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';

import { useSøknadState } from '@rammeverk/state';

import { stegConfig, stegRekkefølge } from '../config/stegConfig';

export const VelkommenPage = () => {
    const navigate = useNavigate();
    const setCurrentSteg = useSøknadState((s) => s.setCurrentSteg);
    const søknadsdata = useSøknadState((s) => s.søknadsdata);

    const harPåbegyntSøknad = Object.keys(søknadsdata).length > 0;

    const handleStart = () => {
        const førsteSteg = stegRekkefølge[0];
        setCurrentSteg(førsteSteg);
        const route = stegConfig[førsteSteg]?.route ?? førsteSteg;
        navigate(`/soknad/${route}`);
    };

    return (
        <VStack gap="space-4">
            <Heading size="xlarge">Velkommen til demo-søknaden</Heading>
            <p>Dette er en demo av soknad-rammeverk.</p>
            <Button onClick={handleStart}>{harPåbegyntSøknad ? 'Fortsett søknad' : 'Start søknad'}</Button>
        </VStack>
    );
};
