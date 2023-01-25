import { Button } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMellomlagring } from '../../hooks/useMellomlagring';
import { SøknadRoutes } from '../../types/SøknadRoutes';

interface Props {
    label: string;
}

const ResetMellomagringButton = ({ label }: Props) => {
    const [pending, setPending] = useState(false);
    const navigateTo = useNavigate();
    const { slettMellomlagring } = useMellomlagring();

    return (
        <Button
            loading={pending}
            type="button"
            variant="secondary"
            size="small"
            onClick={() => {
                setPending(true);
                slettMellomlagring().then(() => {
                    setPending(false);
                    navigateTo(SøknadRoutes.VELKOMMEN);
                });
            }}>
            {label}
        </Button>
    );
};

export default ResetMellomagringButton;
