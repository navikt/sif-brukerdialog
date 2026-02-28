import { Button, Heading, VStack } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';

import { getStegRoute } from '@rammeverk/routing';

import { StegId, stegConfig } from '../config/stegConfig';
import { useSøknadsdata } from '../hooks';

export const VelkommenPage = () => {
    const navigate = useNavigate();
    const setCurrentSteg = useSøknadsdata((s) => s.setCurrentSteg);
    const søknadsdata = useSøknadsdata((s) => s.søknadsdata);

    const harPåbegyntSøknad = Object.keys(søknadsdata).length > 0;

    const handleStart = () => {
        const førsteSteg = StegId.PERSONALIA;
        setCurrentSteg(førsteSteg);
        navigate(`/soknad/${getStegRoute(stegConfig, førsteSteg)}`);
    };

    return (
        <VStack gap="space-16">
            <Heading size="xlarge">Velkommen til demo-søknaden</Heading>
            <p>Dette er en demo av soknad-rammeverk.</p>
            <Button onClick={handleStart}>{harPåbegyntSøknad ? 'Fortsett søknad' : 'Start søknad'}</Button>
        </VStack>
    );
};
