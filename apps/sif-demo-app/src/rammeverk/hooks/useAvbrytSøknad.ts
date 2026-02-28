import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSøknadState } from '../state/useSøknadState';

interface UseAvbrytSøknadOptions {
    velkommenPath?: string;
}

export const useAvbrytSøknad = ({ velkommenPath = '/' }: UseAvbrytSøknadOptions = {}) => {
    const reset = useSøknadState((s) => s.reset);
    const navigate = useNavigate();

    const avbrytSøknad = useCallback(() => {
        reset();
        navigate(velkommenPath);
    }, [reset, navigate, velkommenPath]);

    return { avbrytSøknad };
};
