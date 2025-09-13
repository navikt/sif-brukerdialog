import { Button } from '@navikt/ds-react';
import { useState } from 'react';
import { mellomlagringService } from '../../api/mellomlagringService';
import { relocateToWelcomePage } from '../../utils/navigationUtils';

interface Props {
    label: string;
}

const ResetMellomagringButton = ({ label }: Props) => {
    const [pending, setPending] = useState(false);

    return (
        <Button
            loading={pending}
            type="button"
            variant="secondary"
            size="small"
            onClick={() => {
                setPending(true);
                mellomlagringService.purge().then(() => {
                    setPending(false);
                    relocateToWelcomePage();
                });
            }}>
            {label}
        </Button>
    );
};

export default ResetMellomagringButton;
