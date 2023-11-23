import React, { forwardRef } from 'react';
import cl from 'clsx';
import Step, { ProcessStepProps } from './ProcessStep';

export interface ProcessProps extends React.HTMLAttributes<HTMLOListElement> {
    /**
     * <Process.Step /> elements
     */
    children: React.ReactNode;
}

interface ProcessComponent
    extends React.ForwardRefExoticComponent<ProcessProps & React.RefAttributes<HTMLOListElement>> {
    /**
     * @see 🏷️ {@link ProcessStepProps}
     * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
     */
    Step: typeof Step;
}

export const Process: ProcessComponent = forwardRef<HTMLOListElement, ProcessProps>(
    ({ children, className, ...rest }, ref) => {
        return (
            <ol {...rest} ref={ref} className={cl('process', className)}>
                <>
                    {React.Children.map(children, (step, index) => {
                        const stepIndex = index + 1;
                        return (
                            <li className={'process__item'} key={stepIndex + (children?.toString?.() ?? '')}>
                                <span className="process__line process__line--1" />
                                {React.isValidElement<ProcessStepProps>(step)
                                    ? React.cloneElement(step, {
                                          ...step.props,
                                          index: stepIndex,
                                      })
                                    : step}
                                <span className="process__line process__line--2" />
                            </li>
                        );
                    })}
                </>
            </ol>
        );
    },
) as ProcessComponent;

Process.Step = Step;
Process.displayName = 'Process';

export default Process;
