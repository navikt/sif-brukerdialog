import { Button } from '@navikt/ds-react';
import { useState } from 'react';
import { useSøknadMellomlagring } from '../../hooks/useSøknadMellomlagring';
import { relocateToWelcomePage } from '../../utils/navigationUtils';

interface Props {
    label: string;
}

const ResetMellomagringButton = ({ label }: Props) => {
    const [pending, setPending] = useState(false);
    const { slettMellomlagring } = useSøknadMellomlagring();

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
                    relocateToWelcomePage();
                });
            }}>
            {label}
        </Button>
    );
};

export default ResetMellomagringButton;
