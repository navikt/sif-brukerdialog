import React from 'react';
import { Button } from '@navikt/ds-react';

interface Props {
    showSpinner?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
}

const StepSubmitButton = ({ disabled = false, showSpinner = false, children }: Props) => (
    <Button variant="primary" type="submit" loading={showSpinner} disabled={disabled}>
        {children}
    </Button>
);

export default StepSubmitButton;
