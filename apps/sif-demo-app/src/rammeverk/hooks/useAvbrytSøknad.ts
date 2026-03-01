import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSøknadFlyt } from '../state/useSøknadState';

interface UseAvbrytSøknadOptions {
    velkommenPath?: string;
    avbrytCallback?: () => void;
}

export const useAvbrytSøknad = ({ velkommenPath = '/', avbrytCallback }: UseAvbrytSøknadOptions = {}) => {
    const resetFlyt = useSøknadFlyt((s) => s.reset);
    const navigate = useNavigate();

    const avbrytSøknad = useCallback(() => {
        resetFlyt();
        avbrytCallback?.();
        navigate(velkommenPath);
    }, [resetFlyt, avbrytCallback, navigate, velkommenPath]);

    return { avbrytSøknad };
};
