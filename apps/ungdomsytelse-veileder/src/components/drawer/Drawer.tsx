import { Button, Heading } from '@navikt/ds-react';
import React, { useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { useAriaHider } from './hooks/useAriaHider';
import { useDelayedUnmount } from './hooks/useDelayedUnmount';
import { useFocusTrap } from './hooks/useFocusTrap';
import './drawer.css';

type DrawerProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    position?: 'left' | 'right';
    portalContainer?: HTMLElement | null;
};

export const Drawer: React.FC<DrawerProps> = ({
    isOpen,
    onClose,
    title,
    children,
    position = 'right',
    portalContainer,
}) => {
    const drawerRef = useRef<HTMLDivElement | null>(null);
    const previouslyFocusedElement = useRef<HTMLElement | null>(null);
    const titleId = useId();

    const container =
        typeof window !== 'undefined' ? (portalContainer ?? document.getElementById('root') ?? document.body) : null;

    const { isVisible, hasEntered } = useDelayedUnmount(isOpen, 300);
    useAriaHider(isOpen, container);
    useFocusTrap(isOpen, drawerRef, onClose, previouslyFocusedElement);

    if (!isVisible || !container) return null;

    return createPortal(
        <>
            <div
                className={`drawer-overlay ${hasEntered ? 'visible' : 'hidden'}`}
                onClick={onClose}
                aria-hidden="true"
            />
            <div
                ref={drawerRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
                className={`drawer-panel ${position} ${hasEntered ? 'open' : 'closed'}`}>
                <div className="drawer-header mt-5">
                    {title && (
                        <Heading level="2" size="medium" className="drawer-heading" id={titleId}>
                            {title}
                        </Heading>
                    )}
                    <Button
                        size="small"
                        variant="secondary-neutral"
                        className="drawer-close-button"
                        onClick={onClose}
                        aria-label="Lukk drawer">
                        <ArrowRightIcon fontSize={20} />
                    </Button>
                </div>
                <div className="drawer-body p-10">{children}</div>
            </div>
        </>,
        container,
    );
};
