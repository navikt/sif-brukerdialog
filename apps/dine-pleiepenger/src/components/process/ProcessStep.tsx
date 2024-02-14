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
}

export interface ProcessStepData {
    title: string;
    content: React.ReactNode;
    timestamp?: Date;
    completed?: boolean;
    current?: boolean;
}

export const ProcessStep: React.FunctionComponent<ProcessStepProps> = ({
    completed,
    current,
    icon,
    children,
    index,
}) => {
    const getCircleContent = () => {
        if (icon) {
            return icon;
        }
        if (index) {
            return index;
        }
        if (completed) {
            return <CompleteIcon />;
        }
        if (current) {
            return <span className="process__circle__dot" />;
        }
    };
    return (
        <div
            className={cl(
                'process__step',
                completed ? 'process__step--completed' : '',
                current ? 'process__item--current' : '',
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
