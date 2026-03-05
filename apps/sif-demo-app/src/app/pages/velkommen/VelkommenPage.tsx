import { Button, Heading } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';

import { useStepFormValues } from '../../../rammeverk';
import { DefaultPage } from '../../components/default-page/DefaultPage';
import { søknadStepConfig, søknadStepOrder } from '../../config/søknadStepConfig';
import { useSøknadStore } from '../../hooks/useSøknadStore';

export const VelkommenPage = () => {
    const navigate = useNavigate();
    const startSøknad = useSøknadStore((s) => s.startSøknad);
    const { clearAllStepFormValues } = useStepFormValues();

    const handleStart = () => {
        const førsteSteg = søknadStepConfig[søknadStepOrder[0]];
        clearAllStepFormValues();
        startSøknad(førsteSteg.id);
        navigate(`/soknad/${førsteSteg.route}`);
    };

    return (
        <DefaultPage documentTitle="Velkommen">
            <Heading size="xlarge">Velkommen til demo-søknaden</Heading>
            <p>Dette er en demo av soknad-rammeverk.</p>
            <Button onClick={handleStart}>Start søknad</Button>
        </DefaultPage>
    );
};
