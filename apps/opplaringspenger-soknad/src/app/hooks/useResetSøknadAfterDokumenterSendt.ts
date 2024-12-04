import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SøknadRoutes } from '../types/SøknadRoutes';

const useResetSøknadAfterDokumenterSendt = (reset: () => void) => {
    const location = useLocation();
    const [previousPath, setPreviousPath] = useState<string | null>(null);

    useEffect(() => {
        if (previousPath?.includes(SøknadRoutes.SØKNAD_SENDT)) {
            reset();
        } else {
            setPreviousPath(location.pathname);
        }
    }, [location]);
};

export default useResetSøknadAfterDokumenterSendt;
