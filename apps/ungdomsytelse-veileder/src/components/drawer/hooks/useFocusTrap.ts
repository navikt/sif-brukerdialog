import { useEffect } from 'react';

export const useFocusTrap = (
    isActive: boolean,
    containerRef: React.RefObject<HTMLDivElement | null>,
    onClose: () => void,
    previouslyFocusedRef: React.RefObject<HTMLElement | null>,
) => {
    useEffect(() => {
        if (!isActive) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            const el = containerRef?.current;
            if (!el) return;

            if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
            }

            if (e.key === 'Tab') {
                const focusableEls = el.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
                );
                const first = focusableEls[0];
                const last = focusableEls[focusableEls.length - 1];
                if (!first || !last) return;

                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        previouslyFocusedRef.current = document.activeElement as HTMLElement;
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeyDown);

        setTimeout(() => {
            const first = containerRef?.current?.querySelector<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
            );
            first?.focus();
        }, 0);

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleKeyDown);
            previouslyFocusedRef.current?.focus();
        };
    }, [isActive, containerRef, onClose, previouslyFocusedRef]);
};
