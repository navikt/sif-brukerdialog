import { useEffect, useState } from 'react';

export const useDelayedUnmount = (isOpen: boolean, delay: number) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasEntered, setHasEntered] = useState(false);

    useEffect(() => {
        let timer: number;
        if (isOpen) {
            setIsVisible(true);
            timer = window.setTimeout(() => setHasEntered(true), 0);
        } else {
            setHasEntered(false);
            timer = window.setTimeout(() => setIsVisible(false), delay);
        }
        return () => clearTimeout(timer);
    }, [isOpen, delay]);

    return { isVisible, hasEntered };
};
