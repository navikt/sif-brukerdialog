import { Button, Heading } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';

import { AppPage } from '../../components/app-page/AppPage';
import { søknadStepConfig, søknadStepOrder } from '../../config/søknadStepConfig';
import { useSøknadStore } from '../../hooks/useSøknadStore';

export const VelkommenPage = () => {
    const navigate = useNavigate();
    const startSøknad = useSøknadStore((s) => s.startSøknad);

    const handleStart = () => {
        const førsteSteg = søknadStepConfig[søknadStepOrder[0]];
        startSøknad(førsteSteg.id);
        navigate(`/soknad/${førsteSteg.route}`);
    };

    return (
        <AppPage>
            <Heading size="xlarge">Velkommen til demo-søknaden</Heading>
            <p>Dette er en demo av soknad-rammeverk.</p>
            <Button onClick={handleStart}>Start søknad</Button>
        </AppPage>
    );
};
