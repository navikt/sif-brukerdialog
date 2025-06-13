import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './Drawer.css';
import { Button, Heading } from '@navikt/ds-react';

import { ArrowRightIcon } from '@navikt/aksel-icons';

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
    const drawerRef = useRef<HTMLDivElement>(null);
    const previouslyFocusedElement = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }

            if (e.key === 'Tab' && drawerRef.current) {
                const focusableEls = drawerRef.current.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
                );
                const firstEl = focusableEls[0];
                const lastEl = focusableEls[focusableEls.length - 1];
                if (!firstEl || !lastEl) return;

                if (e.shiftKey) {
                    if (document.activeElement === firstEl) {
                        e.preventDefault();
                        lastEl.focus();
                    }
                } else {
                    if (document.activeElement === lastEl) {
                        e.preventDefault();
                        firstEl.focus();
                    }
                }
            }
        };

        if (isOpen) {
            previouslyFocusedElement.current = document.activeElement as HTMLElement;
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleKeyDown);
            setTimeout(() => {
                drawerRef.current?.querySelector<HTMLElement>('button, [tabindex]')?.focus();
            }, 0);
        } else {
            document.body.style.overflow = '';
            previouslyFocusedElement.current?.focus();
        }

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    const container =
        typeof window !== 'undefined'
            ? (portalContainer ?? document.getElementById('portal-root') ?? document.body)
            : null;

    if (!container) return null;

    return createPortal(
        <>
            <div className={`drawer-overlay ${isOpen ? 'visible' : 'hidden'}`} onClick={onClose} aria-hidden="true" />

            <div
                ref={drawerRef}
                role="dialog"
                aria-modal="true"
                className={`drawer-panel ${position} ${isOpen ? 'open' : 'closed'}`}>
                <div className="drawer-header mt-5">
                    <Heading level="2" size="medium" className="drawer-heading">
                        {title}
                    </Heading>
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
