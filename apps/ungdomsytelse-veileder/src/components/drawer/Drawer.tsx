import { Button, Heading } from '@navikt/ds-react';
import React, { useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon, ExpandIcon, ShrinkIcon } from '@navikt/aksel-icons';
import { useAriaHider } from './hooks/useAriaHider';
import { useDelayedUnmount } from './hooks/useDelayedUnmount';
import { useFocusTrap } from './hooks/useFocusTrap';
import './drawer.css';
import { useDrawer } from './DrawerContext';

type DrawerProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    width?: DrawerWidth;
    position?: 'left' | 'right';
    portalContainer?: HTMLElement | null;
};

export enum DrawerWidth {
    NARROW = 'narrow',
    WIDE = 'wide',
}

export const Drawer: React.FC<DrawerProps> = ({
    isOpen,
    onClose,
    title,
    children,
    position = 'right',
    width = DrawerWidth.WIDE,
    portalContainer,
}) => {
    const { setWidth } = useDrawer();
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
                className={`drawer-panel drawer-panel-width-${width} ${position} ${hasEntered ? 'open' : 'closed'}`}>
                <div className="drawer-header mt-5">
                    <Button
                        variant="tertiary-neutral"
                        type="button"
                        aria-label={width === DrawerWidth.NARROW ? 'Gjør bredere' : 'Gjør smalere'}
                        onClick={() => {
                            setWidth(width === DrawerWidth.NARROW ? DrawerWidth.WIDE : DrawerWidth.NARROW);
                        }}
                        icon={width === DrawerWidth.NARROW ? <ExpandIcon /> : <ShrinkIcon />}
                    />
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
                        <XMarkIcon fontSize={20} />
                    </Button>
                </div>
                <div className="drawer-body p-10">{children}</div>
            </div>
        </>,
        container,
    );
};
