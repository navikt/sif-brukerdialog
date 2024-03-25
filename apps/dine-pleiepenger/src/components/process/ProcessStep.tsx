import { BodyShort } from '@navikt/ds-react';
import cl from 'clsx';
import React from 'react';
import CompleteIcon from './checks/Complete';

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
    current?: boolean;
    icon?: React.ReactNode;
    isContinuation?: boolean;
    isLastStep?: boolean;
    headingId?: string;
}

export interface ProcessStepData {
    title: string;
    content: React.ReactNode;
    timestamp?: Date;
    completed?: boolean;
    current?: boolean;
    isContinuation?: boolean;
    isLastStep?: boolean;
}

export const ProcessStep: React.FunctionComponent<ProcessStepProps> = ({
    completed,
    current,
    icon,
    children,
    isLastStep,
    index,
}) => {
    const getCircleContent = () => {
        if (icon) {
            return icon;
        }
        if (index) {
            return index;
        }
        if (current && !isLastStep) {
            return <span className="process__circle__dot" />;
        }
        if (completed) {
            return <CompleteIcon />;
        }
    };
    return (
        <div
            className={cl(
                'process__step',
                completed && !current ? 'process__step--completed' : '',
                completed && current && isLastStep ? 'process__step--completed process__item--current' : '',
                current && !isLastStep ? 'process__item--current' : '',
            )}>
            <span className={`process__circle`} aria-hidden="true">
                {getCircleContent()}
            </span>
            <BodyShort as="div" className="process__content">
                {children}
            </BodyShort>
        </div>
    );
};

ProcessStep.displayName = 'ProcessStep';

export default ProcessStep;
