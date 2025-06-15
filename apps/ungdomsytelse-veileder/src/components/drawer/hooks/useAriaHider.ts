import { useEffect } from 'react';

export const useAriaHider = (isActive: boolean, container: HTMLElement | null) => {
    useEffect(() => {
        if (!isActive || !container) return;
        const siblings = Array.from(container.parentElement?.children ?? []).filter((el) => el !== container);
        siblings.forEach((el) => el.setAttribute('aria-hidden', 'true'));

        return () => {
            siblings.forEach((el) => el.removeAttribute('aria-hidden'));
        };
    }, [isActive, container]);
};
