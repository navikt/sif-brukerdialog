import { Button, Heading } from '@navikt/ds-react';
import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRightIcon } from '@navikt/aksel-icons';
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
    const drawerRef = useRef<HTMLDivElement>(null);
    const previouslyFocusedElement = useRef<HTMLElement | null>(null);
    const titleId = useId();

    const [isVisible, setIsVisible] = useState(false);
    const [hasEntered, setHasEntered] = useState(false);

    const container =
        typeof window !== 'undefined'
            ? (portalContainer ?? document.getElementById('portal-root') ?? document.body)
            : null;

    // Forsinket mount/unmount for animasjon
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setTimeout(() => setHasEntered(true), 0); // VIKTIG: start animasjon etter første render
        } else {
            setHasEntered(false);
            const timeout = setTimeout(() => setIsVisible(false), 300); // matcher CSS
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    // Accessibility: skjul annen DOM for skjermleser
    useEffect(() => {
        if (!isOpen || !container) return;
        const siblings = Array.from(document.body.children).filter((el) => el !== container);
        siblings.forEach((el) => el.setAttribute('aria-hidden', 'true'));
        return () => {
            siblings.forEach((el) => el.removeAttribute('aria-hidden'));
        };
    }, [isOpen, container]);

    // Fokusstyring og ESC/tab
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (!drawerRef.current) return;

            if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
            }

            if (e.key === 'Tab') {
                const focusableEls = drawerRef.current.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
                );
                const firstEl = focusableEls[0];
                const lastEl = focusableEls[focusableEls.length - 1];
                if (!firstEl || !lastEl) return;

                if (e.shiftKey && document.activeElement === firstEl) {
                    e.preventDefault();
                    lastEl.focus();
                } else if (!e.shiftKey && document.activeElement === lastEl) {
                    e.preventDefault();
                    firstEl.focus();
                }
            }
        };

        previouslyFocusedElement.current = document.activeElement as HTMLElement;
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeyDown);

        setTimeout(() => {
            drawerRef.current?.querySelector<HTMLElement>('button, [tabindex]')?.focus();
        }, 0);

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleKeyDown);
            previouslyFocusedElement.current?.focus();
        };
    }, [isOpen, onClose]);

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
