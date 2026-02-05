import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon } from '@navikt/aksel-icons';
import { Button, ButtonProps, OverridableComponent } from '@navikt/ds-react';
import React from 'react';

type LinkButtonProps = Omit<ButtonProps, 'variant' | 'className' | 'type' | 'icon' | 'iconPosition' | 'size'> & {
    direction: 'left' | 'right' | 'external';
};

const LinkButton = React.forwardRef<HTMLButtonElement, LinkButtonProps>(function LinkButton(
    { direction, children, ...rest },
    ref,
) {
    const getIcon = () => {
        switch (direction) {
            case 'left':
                return <ArrowLeftIcon role="presentation" aria-hidden={true} />;
            case 'right':
                return <ArrowRightIcon role="presentation" aria-hidden={true} />;
            case 'external':
                return (
                    <ExternalLinkIcon
                        role="presentation"
                        aria-hidden={true}
                        fontSize="1.25rem"
                        style={{ marginLeft: '.25rem' }}
                    />
                );
        }
    };
    return (
        <Button
            ref={ref}
            variant="secondary"
            className="noTextDecoration"
            type="button"
            icon={getIcon()}
            iconPosition={direction === 'external' ? 'right' : direction}
            size="small"
            {...rest}>
            {children}
        </Button>
    );
}) as OverridableComponent<LinkButtonProps, HTMLButtonElement>;

export default LinkButton;
