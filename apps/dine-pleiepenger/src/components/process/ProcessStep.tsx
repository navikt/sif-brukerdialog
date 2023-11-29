import { BodyShort } from '@navikt/ds-react';
import cl from 'clsx';
import React from 'react';

export interface ProcessStepProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /**
     * Text content by indicator
     */
    children: React.ReactNode;
    /**
     * Handled by Stepper, overwriting may break component logic
     * @private
     */
    index?: number;
    /**
     * Makes step non-interactive if false. Step will be set to a <div>, overriding `as`-prop
     * @default true
     */
    interactive?: boolean;
}

export const ProcessStep: React.FunctionComponent<ProcessStepProps> = ({ className, children, index }) => {
    return (
        <div className={cl('process__step', className)}>
            <span className="process__circle" aria-hidden="true">
                {index}
            </span>
            <BodyShort as="div" className="process__content">
                {children}
            </BodyShort>
        </div>
    );
};

ProcessStep.displayName = 'ProcessStep';

export default ProcessStep;
