import { Button, Heading, VStack } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';

import { useSøknadFlyt } from '@rammeverk/state';

import { StegId, stegConfig } from '../config/stegConfig';
import { useSøknadState } from '../hooks';

export const VelkommenPage = () => {
    const navigate = useNavigate();
    const setCurrentSteg = useSøknadFlyt((s) => s.setAktivtSteg);
    const søknadsdata = useSøknadState((s) => s.søknadsdata);

    const harPåbegyntSøknad = søknadsdata && Object.keys(søknadsdata.stegData).length > 0;

    const handleStart = () => {
        const førsteSteg = stegConfig[StegId.PERSONALIA];
        setCurrentSteg(førsteSteg.id);
        navigate(`/soknad/${førsteSteg.route}`);
    };

    return (
        <VStack gap="space-16">
            <Heading size="xlarge">Velkommen til demo-søknaden</Heading>
            <p>Dette er en demo av soknad-rammeverk.</p>
            <Button onClick={handleStart}>{harPåbegyntSøknad ? 'Fortsett søknad' : 'Start søknad'}</Button>
        </VStack>
    );
};
