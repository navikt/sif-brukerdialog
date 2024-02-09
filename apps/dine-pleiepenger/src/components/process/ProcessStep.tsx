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
    /**
     * If a step is completed or not
     */
    completed?: boolean;

    variant?: 'CURRENT' | 'WARNING' | string;

    useCircle?: boolean;

    icon?: React.ReactNode;
}

export const ProcessStep: React.FunctionComponent<ProcessStepProps> = ({
    completed,
    icon,
    children,
    useCircle = true,
    variant,
    index,
}) => {
    const circleContent =
        icon || index || (variant === 'CURRENT' ? <span className="process__circle__dot" /> : undefined);
    return (
        <div className={cl('process__step', completed ? 'process__step--completed' : '')}>
            <span
                className={`process__circle${useCircle === false ? ' process__circle--noCircle' : ''}`}
                aria-hidden="true">
                {circleContent}
            </span>
            <BodyShort as="div" className="process__content">
                {children}
            </BodyShort>
        </div>
    );
};

ProcessStep.displayName = 'ProcessStep';

export default ProcessStep;
