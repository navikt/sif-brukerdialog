import { ArrowLeftIcon, ArrowRightIcon } from '@navikt/aksel-icons';
import { Button, ButtonProps, OverridableComponent } from '@navikt/ds-react';
import React from 'react';

type LinkButtonProps = Omit<ButtonProps, 'variant' | 'className' | 'type' | 'icon' | 'iconPosition' | 'size'> & {
    direction: 'left' | 'right';
};

const LinkButton = React.forwardRef<HTMLButtonElement, LinkButtonProps>(function LinkButton(
    { direction, children, ...rest },
    ref,
) {
    return (
        <Button
            ref={ref}
            variant="secondary"
            className="noTextDecoration"
            type="button"
            icon={
                direction === 'left' ? (
                    <ArrowLeftIcon role="presentation" aria-hidden="true" />
                ) : (
                    <ArrowRightIcon role="presentation" aria-hidden="true" />
                )
            }
            iconPosition={direction}
            size="small"
            {...rest}>
            {children}
        </Button>
    );
}) as OverridableComponent<LinkButtonProps, HTMLButtonElement>;

export default LinkButton;
