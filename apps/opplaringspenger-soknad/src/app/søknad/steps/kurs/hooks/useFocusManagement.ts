import { useRef } from 'react';

/**
 * Custom hook for managing focus on array items (periods/days)
 * Handles focusing on sections when items are added/removed
 */
export const useFocusManagement = () => {
    const elementRefs = useRef<Array<HTMLElement | null>>([]);

    const focusFirstInputElement = (index: number) => {
        const element = elementRefs.current[index];
        if (element) {
            const firstFocusable = element.querySelector<HTMLElement>('input');
            requestAnimationFrame(() => {
                (firstFocusable ?? element).focus({ preventScroll: true });
            });
        }
    };

    const setElementRef = (index: number) => (el: HTMLElement | null) => {
        elementRefs.current[index] = el;
    };

    return {
        elementRefs,
        focusFirstInputElement,
        setElementRef,
    };
};
