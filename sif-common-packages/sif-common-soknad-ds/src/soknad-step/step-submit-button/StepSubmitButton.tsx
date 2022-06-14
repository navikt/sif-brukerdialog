import React from 'react';
import Knapp from 'nav-frontend-knapper';

interface Props {
    showSpinner?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
}

const StepSubmitButton = ({ disabled = false, showSpinner = false, children }: Props) => (
    <Knapp type="hoved" htmlType="submit" spinner={showSpinner} disabled={disabled}>
        {children}
    </Knapp>
);

export default StepSubmitButton;
